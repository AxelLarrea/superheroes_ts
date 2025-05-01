import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

import getSuperhero from "../utils/getSuperhero";

const Character = () => {

    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['superhero', id],
        queryFn: () => getSuperhero(id as string)
    })
    
    return (
        <div className="max-w-[800px] flex flex-col items-center h-screen m-auto">
            <button>
                <a href="/">{'<-- Back'}</a>
            </button>

            <div className ="flex flex-col items-center justify-center gap-12 bg-white p-8 rounded-lg shadow-md mt-12">
                <div className="w-full flex flex-col justify-center gap-8">

                    {
                        // Buscar estilos y fonts adecuados para una card.
                    }
                    <img src={ data?.images_urls[0] } alt="Character Logo" className="w-75 h-full block rounded-lg m-auto" />

                    <div className="flex flex-col justify-between">
                        <h2 className="text-2xl text-center font-semibold mb-2">{ data?.char_name }</h2>

                        <div>
                            <p className="text-lg font-medium">Nombre real: <span className="font-normal">{ data?.real_name }</span></p>
                            <p className="text-lg font-medium">Comic: <span className="font-normal">{ data?.comic_universe }</span></p>
                            <p className="text-lg font-medium">Año de aparición: <span className="font-normal">{ data?.appearance_year }</span></p>
                            <p className="text-lg font-medium">Equipamiento: <span className="font-normal">{ data?.equipment }</span></p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-t-gray-300 pt-8">
                    <h2 className="font-semibold text-xl">Biografía:</h2>
                    <p className="font-normal text-lg">{ data?.bio }</p>

                    {
                        // Agregar botón para ver más texto de la biografía, también limitar la biografía a unos 5 renglones aprox.
                        <button>
                            Ver más...
                        </button>
                    }
                </div>
                    
            </div>
        </div>
    );
}
 
export default Character;