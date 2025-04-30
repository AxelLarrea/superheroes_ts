import { useLocation } from "wouter";

import { Hero } from "../types/types";



const Card = ({ char_name, images_urls } : Pick<Hero, 'char_name' | 'images_urls'>) => {

    const [location, navigate] = useLocation()  
    
    return (
        <div className="bg-white rounded-lg shadow-lg p-4" onClick={() => navigate(`/char/${char_name}`)}>
            <img src={images_urls[0]} alt={char_name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">{char_name}</h2>
            </div>
        </div>
    );
}
 
export default Card;