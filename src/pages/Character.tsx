import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import getSuperhero from "../utils/getSuperhero";

const Character = () => {

    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['superhero', id],
        queryFn: () => getSuperhero(id as string),
    })
    
    return (
        <Suspense fallback={'Loading...'}>
            <div className="max-w-[800px] flex flex-col items-center h-screen m-auto">
                {
                    // Agregar botón para volver al inicio.
                }

                <div className ="flex flex-col items-center justify-center gap-12 bg-white p-8 rounded-lg shadow-md mt-12">
                    <div className="flex justify-center gap-8">

                        {
                            // Buscar estilos y fonts adecuadas para una card.
                        }
                        <img src={ data?.images_urls[0] } alt="Character Logo" className="w-75 h-75 rounded-lg" />

                        <div className="flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold mb-2">{ data?.char_name }</h2>

                            <div>
                                <p className="text-lg font-medium">Real Name: <span className="font-normal">{ data?.real_name }</span></p>
                                <p className="text-lg font-medium">Comic Universe: <span className="font-normal">{ data?.comic_universe }</span></p>
                                <p className="text-lg font-medium">Appearance Year: <span className="font-normal">{ data?.appearance_year }</span></p>
                                <p className="text-lg font-medium">Equipment: <span className="font-normal">{ data?.equipment }</span></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl">Biography:</h2>
                        <p className="font-normal text-lg">{ data?.bio }</p>

                        {
                            // Agregar botón para ver más texto de la biografía, también limitar la biografía a unos 5 renglones aprox.
                        }
                    </div>
                        
                </div>
            </div>
        </Suspense>
    );
}
 
export default Character;