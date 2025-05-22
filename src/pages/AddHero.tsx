import { useState } from "react";
import useToast from "../hooks/useToast";
import { Hero } from "../types/types";
import { Slide, ToastContainer } from "react-toastify";

import { checkDuplicates, checkFilesType } from "../utils/checkFilesUtils";
import { getErrorMessage } from "../utils/errorUtil";

import HeroForm from "../components/HeroForm";
import BtnGoBack from "../components/BtnGoBack";

export interface ImageFile {
    file: File
    previewURL: string
}

// const LOCAL_INSERT_URL = 'http://localhost:3000/api/insertHero'
// const LOCAL_UPLOAD_URL = 'http://localhost:3000/api/uploadImage'
const PRODUCTION_INSERT_URL = '/api/insertHero'
const PRODUCTION_UPLOAD_URL = '/api/uploadImage'

const AddHero = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { notify, updateSuccess, updateError } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        try {
            event.preventDefault()
            notify()
            // throw new Error("Error inesperado"); // <--- para probar el Toast error
            
            const { elements } = event.currentTarget;

            // Validar inputs
            const data = {
                char_name: (elements.namedItem('charName') as HTMLInputElement).value,
                real_name: (elements.namedItem('realName') as HTMLInputElement).value,
                comic_universe: (elements.namedItem('comic') as HTMLSelectElement).value,
                appearance_year: (elements.namedItem('year') as HTMLInputElement).value,
                equipment: (elements.namedItem('equipment') as HTMLInputElement).value,
                bio: (elements.namedItem('bio') as HTMLTextAreaElement).value,
                type:  (elements.namedItem('type') as HTMLSelectElement).value as 'Heroe' | 'Villano' | 'Antiheroe'
            };

            const isDc = data.comic_universe === 'DC';
            const logo = isDc ? 
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1024px-DC_Comics_logo.svg.png' :
                'https://upload.wikimedia.org/wikipedia/commons/e/e0/Marvel_Logo.svg';

            const formData: Omit<Hero, 'id' | 'images_urls'> = {
                ...data,
                logo
            }

            try {
                // Agregar personaje
                const response = await fetch(PRODUCTION_INSERT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })

                if (!response.ok) throw new Error('Error al agregar el personaje')
                
                const res = await response.json()
                const heroQuery = res.data

                // Upload imágenes
                const formImageData = new FormData()
                images.forEach(image => formImageData.append('files', image.file))
                formImageData.append('charId', heroQuery?.id)

                const uploadResponse = await fetch(PRODUCTION_UPLOAD_URL, {
                    method: 'POST',
                    body: formImageData
                })

                if (!uploadResponse.ok) throw new Error('Error al subir las imágenes')

                handleReset()
                updateSuccess()
            } catch (uploadError) {
                return uploadError
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
            <BtnGoBack/>
            <div className="max-w-[500px] bg-white/75 border border-gray-300 rounded-lg shadow-sm p-8 my-8 min-[325px]:mx-8 xs:mx-auto xs:py-12 xs:px-16">
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
