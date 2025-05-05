import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

import { Hero } from "../types/types";
import { useCharStore } from "../utils/store";
import getSuperheroes from "../utils/getSuperheroes";

import Card from "../components/Card";
import BtnFilter from "../components/BtnFilter";

const Home = () => {

    const { searchCharacter, selectedFilter } = useCharStore()
    const [location, navigate] = useLocation();

    const { data: heroes } = useQuery({
        queryKey: ['superheroes', selectedFilter],
        queryFn: () => getSuperheroes(selectedFilter)
    })

    const searchHero = heroes?.filter((hero: Hero) => hero.char_name.toLowerCase().includes(searchCharacter))
    const cantidadChar = searchHero?.length

    return (
        <>
            <div className="max-w-[1200px] font-medium text-base flex justify-between items-center h-24 m-auto">
                
                <BtnFilter cantidadChar={cantidadChar} />

                <div className="bg-btn hover:bg-btn-hover rounded-md shadow-md cursor-pointer px-4 py-2" onClick={() => navigate('/add-one')}>
                    <button className="text-white flex items-center gap-2 pointer-events-none" onClick={() => window.location.href = '/add-one'}>
                        Agregar un personaje 
                        <svg className="w-5 h-5" fill="#FFF" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#FFF">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM23,16a1,1,0,0,1-1,1H19v3a1,1,0,0,1-2,0V17H14a1,1,0,0,1,0-2h3V12a1,1,0,0,1,2,0v3h3A1,1,0,0,1,23,16Z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="max-w-[1200px] grid grid-cols-4 gap-4 m-auto py-4">
                {
                    searchHero?.map((hero: Hero) => (
                        <Card 
                            key={hero.id}
                            char_name={hero.char_name}
                            images_urls={hero.images_urls}
                            comic_universe={hero.comic_universe}
                        />
                    ))
                }
            </div>
        </>
    );
}
 
export default Home;