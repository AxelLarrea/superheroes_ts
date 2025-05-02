import { useLocation } from "wouter";

import { Hero } from "../types/types";

const Card = ({ char_name, images_urls, comic_universe } : Pick<Hero, 'char_name' | 'images_urls' | 'comic_universe'>) => {

    const [location, navigate] = useLocation()

    const comic_class = comic_universe === 'Marvel' ?
        'bg-red-100 text-red-700 border-red-200' : 
        'bg-blue-100 text-blue-700 border-blue-200'
    
    return (
        <div className="group bg-white rounded-lg shadow-lg p-4 hover:bg-gradient-to-t from-black/30 via-transparent to-transparent" onClick={() => navigate(`/char/${char_name}`)}>
            <div className="flex justify-center mb-4">
                <span className={`${comic_class} w-20 text-center border-1 rounded-xl`}>{comic_universe}</span>
            </div>
            <img src={images_urls[0]} alt={char_name} className="w-full h-48 object-cover rounded-lg" />
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-slate-800">{char_name}</h2>
            </div>

            <div className="flex justify-center ">
                <button className="cursor-pointer bg-white font-medium text-center text-md text-slate-800 rounded-2xl shadow-md opacity-0 group-hover:opacity-100 transition-all py-1 px-3" onClick={() => navigate(`/char/${char_name}`)}>
                    Ver detalles
                </button>
            </div>
        </div>
    );
}
 
export default Card;