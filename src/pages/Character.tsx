import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

import getSuperhero from "../utils/getSuperhero";

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
        <div className="max-w-[1200px] flex flex-col items-center m-auto pt-4 pb-8">
            <button className="self-start bg-btn hover:bg-btn-hover text-white cursor-pointer rounded-md p-2 px-4">
                <a href="/">{'<- Volver'}</a>
            </button>

            <div className="w-full flex flex-col justify-center bg-white  rounded-lg shadow-md p-8 mt-4">
                <div className="w-full flex items-center justify-center gap-8 border-b border-b-gray-300 pb-8">
                    <div className="w-85 h-85 rounded-full">
                        <img src={ data?.images_urls[0] } alt="Character Logo" className="object-cover h-full rounded-full" />
                    </div>
                    
                    <div>
                        <div>
                            <h1 className="text-6xl text-slate-800 font-semibold ">{ data?.char_name }</h1>
                            <h2 className="text-3xl text-black/75 font-semibold mt-4">{ data?.real_name }</h2>
                        </div>
                                               
                        <div className="flex gap-2 text-lg font-medium text-slate-800 mt-4">
                            <span className={`${comic_color_primary} rounded-full  px-4 py-2`}>{ data?.comic_universe }</span>
                            <span className={`rounded-full border-1 border-gray-300 text-center px-4 py-2`}>Desde { data?.appearance_year }</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                    <h2 className="text-4xl text-slate-800 font-semibold">Información general</h2>
                    
                    <div className="flex gap-8">
                        <div className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4">
                            <h3 className="text-xl text-slate-800 font-bold">Nombre real</h3>
                            <p className="text-xl text-slate-800 font-medium mt-2">{data?.real_name}</p>
                            
                        </div>
                        
                        <div className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4">
                            <h3 className="text-xl text-slate-800 font-bold">Primera aparición</h3>
                            <p className="text-xl text-slate-800 font-medium mt-2">{data?.appearance_year} - Comic primera aparición</p>
                           
                        </div>
                    </div>

                    <div className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4 mt-4">
                        <h3 className="text-xl text-slate-800 font-bold">Equipamiento</h3>
                        <p className="text-xl text-slate-800 font-medium mt-2">{data?.equipment}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl text-slate-800 font-semibold mt-8">Biografía</h2>
                    <p className="text-lg text-slate-800/90 font-medium mt-4">{data?.bio}</p>
                </div>

            </div>
        </div>
    );
}
 
export default Character;