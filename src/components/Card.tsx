import { useLocation } from "wouter";

import { Hero } from "../types/types";

const Card = ({ char_name, images_urls, comic_universe } : Pick<Hero, 'char_name' | 'images_urls' | 'comic_universe'>) => {

    const [, navigate] = useLocation()

    const comic_class = comic_universe === 'Marvel' ?
        'bg-red-100 text-red-700 border-red-200' : 
        'bg-blue-100 text-blue-700 border-blue-200'
    
    return (
        <div className="group bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-t from-black/5 via-transparent to-transparent" onClick={() => navigate(`/char/${char_name}`)}>
            <div className="flex mb-4">
                <span className={`${comic_class} w-20 text-center border-1 rounded-xl`}>{comic_universe}</span>
            </div>
            <img src={images_urls[0]} alt={char_name} className="w-full h-48 object-cover rounded-lg transition-all duration-300 group-hover:scale-105" />
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-slate-800">{char_name}</h2>
            </div>
        </div>
    );
}
 
export default Card;