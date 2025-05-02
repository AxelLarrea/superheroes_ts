import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

import getSuperhero from "../utils/getSuperhero";

const Character = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['superhero', id],
        queryFn: () => getSuperhero(id as string)
    })
    
    const comic_color_primary = data?.comic_universe === 'DC' ? 
        'bg-primary-dc/20 text-primary-dc border-primary-dc' :
        'bg-primary-marvel/20 text-primary-marvel border-primary-marvel';

    const comic_color_border = data?.comic_universe === 'DC' ?
        'border-b-primary-dc' :
        'border-b-primary-marvel';

    return (
        <div className="w-[800px] flex flex-col items-center h-screen m-auto">
            <button className="self-start bg-gradient-to-r from-orange-500 to-red-500 text-white cursor-pointer rounded-md p-2 mt-4">
                <a href="/">{'<-- Back'}</a>
            </button>

            <div className ="w-full flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md mt-4">
                <div className="flex flex-col justify-center gap-8">
                    <div className="w-60 h-60 rounded-full self-center">
                        <img src={ data?.images_urls[0] } alt="Character Logo" className="object-cover h-full rounded-full" />
                    </div>

                    <div className="flex flex-col justify-between">
                        <h2 className="text-4xl text-center text-slate-800 font-bold mb-2">{ data?.char_name }</h2>
                        
                        <div className="flex justify-center gap-2 text-lg font-medium text-slate-800 mb-2">
                            <span className={`${comic_color_primary} rounded-2xl border-1 px-3`}>{ data?.comic_universe }</span>
                            <span className={`${comic_color_primary} rounded-2xl border-1 text-center px-2`}>{ data?.appearance_year }</span>
                        </div>

                        <div className={`${comic_color_border} w-34 border-b-2 flex items-center justify-center gap-2 mt-4 m-auto`}>
                            <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g id="Layer_2" data-name="Layer 2"> 
                                        <g id="invisible_box" data-name="invisible box"> 
                                            <rect width="48" height="48" fill="none"></rect> 
                                        </g> 
                                        <g id="icons_Q2" data-name="icons Q2"> 
                                            <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"></path> 
                                            <path d="M24,20a2,2,0,0,0-2,2V34a2,2,0,0,0,4,0V22A2,2,0,0,0,24,20Z"></path>
                                            <circle cx="24" cy="14" r="2"></circle> 
                                        </g> 
                                    </g> 
                                </g>
                            </svg>
                            <p className="text-xl">Información</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-4 border-t border-t-gray-300 pt-8">
                    <div className="bg-slate-200/50 rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-lg text-slate-600 mb-1 flex items-center gap-2">Nombre Real</p>
                        <p className="font-semibold text-xl text-slate-800">{data?.real_name}</p>
                    </div>

                    <div className="bg-slate-200/50 rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-lg text-slate-600 mb-1 flex items-center gap-2">Equipamiento</p>
                        <p className="font-semibold text-xl text-slate-800">{data?.equipment}</p>
                    </div>
                    
                    <div className="flex items-center justify-between bg-slate-200/50 rounded-lg border border-gray-200 cursor-pointer p-3" onClick={() => setIsExpanded(!isExpanded)}>
                        <p className="font-medium text-lg text-slate-600 mb-1 flex items-center gap-2">Biografía</p>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isExpanded ? 'rotate-180' : ''} transition-transform duration-600 ease-in-out`}>
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F"></path> 
                            </g>
                        </svg>
                    </div>

                    <div className={`${ isExpanded ? 'h-auto opacity-100 border p-4 ' : 'max-h-0' } opacity-0 -translate-y-6 overflow-hidden border-gray-200 border-t-0 rounded-b-xl transition-all duration-500 ease-in-out`}>
                        <p className="font-normal text-lg leading-relaxed text-black">{data?.bio}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default Character;