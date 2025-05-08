import { useRef, useState } from "react";
import { Hero } from "../types/types";
import { Id, Slide, toast, ToastContainer } from "react-toastify";

import supabase from "../db/supabase-client";
import uploadImage from "../utils/uploadImage";

import HeroForm from "../components/HeroForm";
import Notification from "../components/Notification";

export interface ImageFile {
    file: File
    previewURL: string
}

const AddHero = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const toastId = useRef<Id>(0);

    const notify = () => toastId.current = toast(Notification, { 
        data: {
            content: 'Agregando personaje...'
        },
        autoClose: false,
        toastId: toastId.current
    });

    const updateSuccess = () => toast.update(toastId.current, { 
        render: Notification,
        data: {
            content: "Personaje agregado correctamente",
            isSuccess: true
        },
        type: "success",
        autoClose: 4000 
    });


    const updateError = () => toast.update(toastId.current, { 
        render: Notification,
        data: {
            content: "Error al agregar el personaje",
            isSuccess: false
        },
        type: "error",
        autoClose: 4000 
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            
            setIsLoading(true)
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

            // Insert superheroe
            const { error: insertError } = await supabase
                .from('superheroe')
                .insert(formData)

            if (insertError) {
                setIsLoading(false)
                return console.log(insertError);
            }
            
            // Query superheroe id
            const { data: heroQuery, error: queryError } = await supabase
                .from('superheroe')
                .select('id')
                .eq('char_name', data.char_name)
                .single()

            if (queryError) {
                setIsLoading(false)
                return console.log(queryError);
            }
            
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
            updateError()
            return console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

        fileInput.files = files
        
        if (files) {
            const newImages: ImageFile[] = Array.from(files).map((file: File) => ({
                file,
                previewURL: URL.createObjectURL(file),
            }));
            setImages(prev => [...prev, ...newImages]);
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const imagesFiles = event.dataTransfer.files;
        const droppedImages = Array.from(imagesFiles);

        if (droppedImages.length === 0) return;

        const newImages: ImageFile[] = droppedImages.map((file: File) => ({
            file,
            previewURL: URL.createObjectURL(file)
        }));

        if (newImages.length > 0) {
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
                const newFiles = [...imagesFiles!, ...fileInput.files!]
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
