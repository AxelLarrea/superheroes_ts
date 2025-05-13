import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

import getSuperhero from "../utils/db/getSuperhero";

const Character = () => {
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['superhero', id],
        queryFn: () => getSuperhero(id as string)
    })
    
    const comic_color_primary = data?.comic_universe === 'DC' ? 
        'bg-primary-dc/20 text-primary-dc' :
        'bg-primary-marvel/20 text-primary-marvel';

    return (
        <div className="max-w-[1200px] flex flex-col items-center mx-8 xl:m-auto pt-4 pb-8">
            <button className="self-start text-btn text-lg font-semibold cursor-pointer rounded-md p-2 pl-0">
                <a href="/">{'<- Volver'}</a>
            </button>

            <div className="w-full flex flex-col justify-center bg-white rounded-lg shadow-md p-8 mt-4">
                {/* Header */}
                <div className="w-full flex flex-col items-center justify-center gap-8 border-b border-b-gray-300 pb-8 lg:flex-row ">
                    <div className="w-60 h-60 rounded-full">
                        <img src={ data?.images_urls[0] } alt="Character Logo" className="object-cover h-full w-full rounded-full" />
                    </div>
                    
                    <div>
                        <div>
                            <h1 className="text-center text-3xl text-slate-800 font-semibold  xs:text-4xl sm:text-5xl lg:text-left">{ data?.char_name }</h1>
                        </div>
                                               
                        <div className="flex gap-2 text-lg font-medium text-slate-800 mt-4">
                            <span className={`${comic_color_primary} rounded-full  px-3 py-1`}>{ data?.comic_universe }</span>
                            <span className={`rounded-full border-1 border-gray-300 text-center px-3 py-1`}>Desde { data?.appearance_year }</span>
                        </div>
                    </div>
                </div>

                {/* Information */}
                <div className="flex flex-col gap-4 mt-8">
                    <h2 className="flex items-center gap-2 text-xl 2xs:text-2xl text-slate-800 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info w-5 h-5 text-[#0a0a8a]">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                        Información general
                    </h2>
                    
                    <div className="flex flex-col gap-8 md:flex-row">
                        <div className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4">
                            <h3 className="text-lg 2xs:text-xl text-slate-700 font-medium">Nombre real</h3>
                            <p className="text-lg text-slate-600 mt-2">{data?.real_name}</p>
                            
                        </div>
                        
                        <div className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4">
                            <h3 className="text-lg 2xs:text-xl text-slate-700 font-medium">Primera aparición</h3>
                            <p className="text-lg text-slate-600 mt-2">{data?.appearance_year} - Comic primera aparición</p>
                           
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="flex items-center gap-2 text-xl 2xs:text-2xl text-slate-800 font-semibold pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-5 h-5 text-[#0a0a8a]">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                            </svg>
                            Equipamiento
                        </h2>
                        <div className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4 ">
                            <p className="text-lg text-slate-600 mt-2">{data?.equipment}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="flex items-center gap-2 text-xl 2xs:text-2xl text-slate-800 font-semibold pb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open w-5 h-5 text-[#0a0a8a]">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        Biografía
                    </h2>
                    <div className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4">
                        <p className="text-lg text-slate-700">{data?.bio}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default Character;