import { useState } from "react";

import supabase from "../db/supabase-client";
import { Hero } from "../types/types";

interface ImageFile {
    file: File
    previewURL: string
}

const HeroForm = () => {

    const [images, setImages] = useState<ImageFile[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const { elements } = event.currentTarget;

        // Validate inputs
        const data = {
            char_name: (elements.namedItem('charName') as HTMLInputElement).value,
            real_name: (elements.namedItem('realName') as HTMLInputElement).value,
            comic_universe: (elements.namedItem('comic') as HTMLSelectElement).value,
            appearance_year: (elements.namedItem('year') as HTMLInputElement).value,
            equipment: (elements.namedItem('equipment') as HTMLInputElement).value,
            bio: (elements.namedItem('bio') as HTMLTextAreaElement).value
        };

        const isDc = data.comic_universe === 'DC';
        const logo = isDc ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1024px-DC_Comics_logo.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Marvel_Logo.svg';

        const formData: Omit<Hero, 'id' | 'images_urls'> = {
            ...data,
            logo
        }

        console.log('Form data:', formData)

        const imagesData = (elements.namedItem('images') as HTMLInputElement).files;
        console.log('Images data:', imagesData);

        // const { data: heroData, error } = await supabase
        //     .from('heroes')
        //     .insert([data]);

        // console.log('data: ', data)

        // if (error) {
        //     console.error('Error inserting data:', error);
        // } else {
        //     console.log('Data inserted successfully!');
        // }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
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
                fileInput.files = imagesFiles;
            }
        }

        setImages(prev => [...prev, ...newImages])
    }

    const handleDeleteImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="">
            <h1 className="text-2xl font-semibold text-center">Agregar personaje</h1>
            <form className="flex flex-col items-center justify-center gap-4 mt-8" onSubmit={handleSubmit}>
                <input type="text" name="charName" placeholder="Nombre del personaje" required className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <input type="text" name="realName" placeholder="Nombre real" required className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <select name="comic" id="Comic" defaultValue="Comic" required className="border border-gray-300 p-2 rounded-md w-full max-w-md outline-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="Comic" disabled>Comic</option>
                    <option value="Marvel">Marvel</option>
                    <option value="DC">DC</option>
                </select>
                <input type="text" name="year" placeholder="Año de aparición" required className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <input type="text" name="equipment" placeholder="Equipamiento" required className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <textarea name="bio" placeholder="Biografía" className="border border-gray-300 p-2 rounded-md w-full max-w-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                <input 
                    type="file" 
                    name="images" 
                    id="Images" 
                    multiple
                    required
                    className="text-gray-500 text-sm border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary-header file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-header/80"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onChange={handleImageChange}
                />
                <div className="flex gap-4 flex-wrap justify-center max-w-md">
                    {
                        images.map((image, index) => (
                            <div key={index} className="relative flex flex-col items-center justify-center gap-2">
                                <img src={image.previewURL} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                                <button className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center font-black bg-white rounded-full pb-1" onClick={() => handleDeleteImage(index)}>x</button>
                            </div>
                        ))
                    }
                </div>
                <button type="submit" className="bg-primary-btn text-white p-2 rounded-md">Agregar personaje</button>
            </form>
        </div>
    );
}
 
export default HeroForm;