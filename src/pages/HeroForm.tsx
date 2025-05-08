import { useState } from "react";

import { Hero } from "../types/types";
import supabase from "../db/supabase-client";
import uploadImage from "../utils/uploadImage";

interface ImageFile {
    file: File
    previewURL: string
}

const HeroForm = () => {

    const [images, setImages] = useState<ImageFile[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
        
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
                .insert(formData);

            if (insertError) return console.log('Error inserting data:', insertError)
            
            // Query superheroe id
            const { data: heroQuery, error: queryError } = await supabase
                .from('superheroe')
                .select('id')
                .eq('char_name', data.char_name)
                .single()

            if (queryError) return console.log('Error fetching superhero:', queryError)
            
            // Upload imagenes
            const imagesFiles = images.map(({ file }: ImageFile) => file)

            uploadImage({
                charId: heroQuery?.id, 
                files: imagesFiles
            })

        } catch (error) {
            return console.log('Error:', error);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

        fileInput.files = files;
        
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
    // Probar esta función
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
                <form className="flex flex-col items-center justify-center gap-4 mt-8" onSubmit={handleSubmit}>
                    <div className="w-full max-w-sm">
                        <label htmlFor="charName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del personaje</label>
                        <input type="text" name="charName" id="charName" required className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-2 focus:border-blue-500" />
                    </div>

                    <div className="w-full max-w-sm">
                        <label htmlFor="realName" className="block text-sm font-medium text-gray-700 mb-1">Nombre real</label>
                        <input type="text" name="realName" id="realName" required className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-2 focus:border-blue-500" />
                    </div>

                    <div className="relative w-full max-w-sm">
                        <label htmlFor="Comic" className="block text-sm font-medium text-gray-700 mb-1">Universo</label>
                        <div className="relative group">
                            <select name="comic" id="Comic" defaultValue="Comic" required className="appearance-none border border-gray-300 p-2 rounded-md w-full outline-0 focus:outline-none focus:border-2 focus:border-blue-500 pr-8">
                                <option value="Comic" disabled>Comic</option>
                                <option value="Marvel">Marvel</option>
                                <option value="DC">DC</option>
                            </select>
                            <div className="group-focus-within:rotate-180 transition-transform duration-300 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-sm">
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Año de aparición</label>
                        <input type="number" name="year" id="year" required className="remove-arrow border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-2 focus:border-blue-500" />
                    </div>

                    <div className="w-full max-w-sm">
                        <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">Equipamiento</label>
                        <input type="text" name="equipment" id="equipment" required className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-2 focus:border-blue-500" />
                    </div>

                    <div className="w-full max-w-sm">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
                        <textarea name="bio" id="bio" className="border border-gray-300 p-2 rounded-md w-full h-32 resize-none focus:outline-none focus:border-2 focus:border-blue-500"></textarea>
                    </div>

                    <div className="w-full max-w-sm">
                        <label htmlFor="Images" className="block text-sm font-medium text-gray-700 mb-1">Selecciona o arrastra imágenes</label>
                        <input
                            type="file"
                            name="images"
                            id="Images"
                            multiple
                            required
                            className="w-full h-full text-gray-500 text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary-header/80 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-header"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onChange={handleImageChange}
                        />
                    </div>

                    {   images.length > 0 && (
                        
                        <div className="max-w-sm flex gap-4 flex-wrap justify-center border border-gray-300 p-2 rounded-md w-full h-24">
                            {   images.map((image, index) => (
                                <div key={index} className="group relative flex flex-col items-center justify-center gap-2">
                                    <img src={image.previewURL} alt="Preview" className="w-20 h-20 object-cover rounded-md group-hover:opacity-90" />
                                    <button className="hidden absolute top-1 right-1 h-5 w-5 group-hover:flex items-center justify-center font-medium border border-gray-300 bg-white rounded-md pb-1" onClick={() => handleDeleteImage(index, image.file.name)}>x</button>
                                </div>
                                ))
                            }
                        </div>
                        )
                    }
                    <button type="submit" className="bg-btn hover:bg-primary-header/80 text-white cursor-pointer rounded-md p-2">Agregar personaje</button>
                </form>
            </div>
        </>
    );
}
 
export default HeroForm;
