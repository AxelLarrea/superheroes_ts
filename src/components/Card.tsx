import { Character } from "../types";

const Card = ({ name, description, image } : Omit<Character, 'id'>) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
}
 
export default Card;