import { ImageFile } from "../pages/AddHero";

interface Props {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDeleteImage: (index: number, name: string) => void;
    images: ImageFile[];
    isLoading: boolean;
}

const HeroForm = ({ handleSubmit, handleImageChange, handleDrop, handleDeleteImage, images, isLoading }: Props) => {
    return (
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
                    <select name="comic" id="Comic" defaultValue="Marvel" className="appearance-none border border-gray-300 p-2 rounded-md w-full outline-0 focus:outline-none focus:border-2 focus:border-blue-500 pr-8">
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

            <div className="relative w-full max-w-sm">
                <label htmlFor="Type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <div className="relative group">
                    <select name="type" id="Type" defaultValue="Heroe" className="appearance-none border border-gray-300 p-2 rounded-md w-full outline-0 focus:outline-none focus:border-2 focus:border-blue-500 pr-8">
                        <option value="Marvel">Heroe</option>
                        <option value="DC">Villano</option>
                        <option value="Antiheroe">Antiheroe</option>
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
                <label htmlFor="Images" className="block text-sm font-medium text-gray-700 mb-1">Selecciona o arrastra una imágen</label>
                <input
                    type="file"
                    name="images"
                    id="Images"
                    multiple
                    required
                    className="w-full h-full text-gray-600 text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary-header/80 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-header"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onChange={handleImageChange}
                />
            </div>

            {images.length > 0 && (
                <div className="max-w-sm w-full h-24 flex gap-4 flex-wrap justify-center border border-gray-300 rounded-md p-2">
                    {images.map((image, index) => (
                        <div key={index} className="group relative flex flex-col items-center justify-center gap-2">
                            <img src={image.previewURL} alt="Preview" className="w-20 h-20 object-cover rounded-md group-hover:opacity-90" />
                            <button className="hidden absolute top-1 right-1 h-5 w-5 group-hover:flex items-center justify-center font-medium border border-gray-300 bg-white rounded-md pb-1" onClick={() => handleDeleteImage(index, image.file.name)}>x</button>
                        </div>
                        ))
                    }
                </div>
                )
            }

            <button 
                type="submit" 
                disabled={isLoading}
                className={`${isLoading ? 'opacity-70 cursor-not-allowed' : ''} relative w-full max-w-sm bg-btn hover:bg-primary-header/80 text-white cursor-pointer rounded-md p-2`}
            >
                {isLoading ? (
                    <>
                        <span className="opacity-0">Agregar personaje</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </>
                ) : (
                    "Agregar personaje"
                )}
            </button>
        </form>
    );
}
 
export default HeroForm;