import { useLocation } from "wouter";

import { CardHero } from "../pages/Home";

const Card = ({ char_name, images_urls, comic_universe, type } : Omit<CardHero, 'id'>) => {

    const [, navigate] = useLocation()

    const comic_class = comic_universe === 'Marvel' ?
        'bg-red-200 text-red-800 border-red-300' : 
        'bg-blue-200 text-blue-800 border-blue-300'

    const type_class = type === 'Heroe' ?
        'bg-green-100 text-green-700 border-green-200' :
        type === 'Villano' ?
        'bg-red-100 text-red-700 border-red-200' :
        'bg-purple-100 text-purple-700 border-purple-200'
    
    return (
        <div className="group bg-white rounded-xl shadow-md border border-gray-200 p-8 transition-all duration-300 hover:cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-t from-black/5 via-transparent to-transparent" onClick={() => navigate(`/char/${char_name}`)}>
            <div className="flex justify-between mb-4">
                <span className={`${comic_class} min-w-20 text-center border rounded-xl px-2`}>{comic_universe}</span>
                <span className={`${type_class} min-w-20 text-center border rounded-xl px-2`}>{type}</span>
            </div>
            <img src={images_urls[0]} alt={char_name} fetchPriority="high" width={190} height={220} className="w-full h-48 object-contain rounded-lg transition-all duration-300 group-hover:scale-105" />
            <div className="p-4 pb-0 text-center">
                <h2 className="text-xl font-bold text-slate-800">{char_name}</h2>
            </div>
        </div>
    );
}

export default Card;