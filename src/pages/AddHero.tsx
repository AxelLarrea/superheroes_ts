import { useState } from "react";
import { Hero } from "../types/types";
import { Slide, ToastContainer } from "react-toastify";

import supabase from "../db/supabase-client";
import uploadImage from "../utils/uploadImage";
import { getErrorMessage } from "../utils/errorUtil";
import useToast from "../hooks/useToast";

import HeroForm from "../components/HeroForm";
import { checkDuplicates, checkFilesType } from "../utils/checkFilesUtils";

export interface ImageFile {
    file: File
    previewURL: string
}

const AddHero = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { notify, updateSuccess, updateError } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        try {
            event.preventDefault()
            notify()
            // throw new Error("Error inesperado"); // <--- para probar el error
            
            const { elements } = event.currentTarget;

            // Validar inputs
            const data = {
                char_name: (elements.namedItem('charName') as HTMLInputElement).value,
                real_name: (elements.namedItem('realName') as HTMLInputElement).value,
                comic_universe: (elements.namedItem('comic') as HTMLSelectElement).value,
                appearance_year: (elements.namedItem('year') as HTMLInputElement).value,
                equipment: (elements.namedItem('equipment') as HTMLInputElement).value,
                bio: (elements.namedItem('bio') as HTMLTextAreaElement).value
            };

            const isDc = data.comic_universe === 'DC';
            const logo = isDc ? 
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1024px-DC_Comics_logo.svg.png' :
                'https://upload.wikimedia.org/wikipedia/commons/e/e0/Marvel_Logo.svg';

            const formData: Omit<Hero, 'id' | 'images_urls'> = {
                ...data,
                logo
            }

            // Validate existing hero
            const { data: existingHero, error: existingHeroError } = await supabase
                .from('superheroe')
                .select('*')
                .eq('char_name', data.char_name)
                
            if (existingHero && existingHero?.length > 0 ) throw new Error("El personaje ya existe")
            
            if (existingHeroError) throw new Error("Error al validar si el personaje existe")

            // Insert superheroe
            const { error: insertError } = await supabase
                .from('superheroe')
                .insert(formData)

            if (insertError) throw new Error("Error al insertar el personaje")
            
            
            // Query superheroe id
            const { data: heroQuery, error: queryError } = await supabase
                .from('superheroe')
                .select('id')
                .eq('char_name', data.char_name)
                .single()

            if (queryError) throw new Error("Error al obtener el id del personaje")
            
            // Upload imágenes
            const imagesFiles = images.map(({ file }: ImageFile) => file)

            try {
                await uploadImage({
                    charId: heroQuery?.id, 
                    files: imagesFiles
                })

                handleReset()
                updateSuccess()
            } catch (uploadError) {
                return console.log(uploadError)
            }

        } catch (error) {
            const errorMessage = getErrorMessage(error);
            updateError(errorMessage)
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (images.length === 3) return

        const files = event.target.files
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        const newFiles = Array.from(files!)
        const validFiles = checkFilesType(newFiles);
        const uniqueFiles = checkDuplicates(validFiles, images);

        if (uniqueFiles.length === 0) return

        const dataTransfer = new DataTransfer();
        uniqueFiles.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        
        if (files) {
            const newImages: ImageFile[] = uniqueFiles.map((file: File) => ({
                file,
                previewURL: URL.createObjectURL(file),
            }));
            setImages(prev => [...prev, ...newImages]);
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (images.length === 3) return

        const imagesFiles = event.dataTransfer.files;
        const droppedImages = Array.from(imagesFiles);

        const validFiles = checkFilesType(droppedImages);
        const uniqueFiles = checkDuplicates(validFiles, images);

        if (uniqueFiles.length === 0) return

        const newImages: ImageFile[] = uniqueFiles.map((file: File) => ({
            file,
            previewURL: URL.createObjectURL(file)
        }));

        if (newImages.length > 0) {
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
                const newFiles = [...uniqueFiles!, ...fileInput.files!]
                const dataTransfer = new DataTransfer();
                Array.from(newFiles).forEach(file => dataTransfer.items.add(file));
                fileInput.files = dataTransfer.files;
            }
        }

        setImages(prev => [...prev, ...newImages])
    }

    const handleDeleteImage = (index: number, name: string) => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        const dataTransfer = new DataTransfer();
        
        Array.from(fileInput.files!).forEach(file => {
            if (file.name !== name) {
                dataTransfer.items.add(file);
            }
        });

        fileInput.files = dataTransfer.files;

        setImages(prev => prev.filter((_, i) => i !== index));
    }

    // Resetear formulario luego del submit
    const handleReset = () => {
        const form = document.querySelector('form') as HTMLFormElement;
        form.reset()
        setImages([]);
    }

    return (
        <>
            <div className="max-w-[1200px] flex flex-col items-center min-[325px]:mx-8 xl:mx-auto pt-4">
                <button className="self-start text-btn text-lg font-semibold cursor-pointer rounded-md p-2 pl-0">
                    <a href="/">{'<- Volver'}</a>
                </button>
            </div>
            <div className="max-w-[480px] border border-gray-300 rounded-lg p-8 min-[325px]:mx-8 my-8 xs:mx-auto">
                <h1 className="text-[22px] 2xs:text-3xl font-bold text-slate-800 font-sans text-center">Agregar personaje</h1>
                
                <HeroForm
                    handleSubmit={handleSubmit}
                    handleImageChange={handleImageChange}
                    handleDrop={handleDrop}
                    handleDeleteImage={handleDeleteImage}
                    images={images}
                    isLoading={isLoading}
                />

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                />  
            </div>
        </>
    );
}
 
export default AddHero;
