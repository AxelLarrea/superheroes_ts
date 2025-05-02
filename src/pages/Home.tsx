import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

import { Hero } from "../types/types";
import { useCharStore } from "../utils/store";
import getSuperheroes from "../utils/getSuperheroes";

import Card from "../components/Card";

const Home = () => {

    const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
    const { searchCharacter } = useCharStore()
    const [location, navigate] = useLocation();
    
    const { data: heroes } = useQuery({
        queryKey: ['superheroes', selectedFilter],
        queryFn: () => getSuperheroes(selectedFilter)
    }) 

    const searchHero = heroes?.filter((hero: Hero) => hero.char_name.toLowerCase().includes(searchCharacter))
        
    return (
        <>
            <div className="max-w-[1200px] font-medium text-white text-base flex justify-between items-center h-24 m-auto">
                <div className="group flex items-center">
                    <button className="w-36 flex items-center justify-between cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 rounded-md group-hover:rounded-s-md group-hover:rounded-e-none px-4 py-2" >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFF">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <path d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                            </g>
                        </svg>
                        {selectedFilter}
                        <span className="bg-white text-sm text-black rounded-full px-2">{searchHero?.length}</span>
                    </button>

                    <ul className="hidden bg-primary-header rounded-md group-hover:flex group-hover:rounded-s-none group-hover:rounded-e-md shadow-md">
                        <li className="hover:bg-primary-btn-hover cursor-pointer px-4 py-2" value="Todos" onClick={() => setSelectedFilter('Todos')}>
                            <span className="text-center">Todos</span>
                        </li>

                        <li className="hover:bg-primary-btn-hover cursor-pointer px-4 py-2" value="DC" onClick={() => setSelectedFilter('DC')}>
                            <span className="text-center">DC</span>
                        </li>

                        <li className="hover:bg-primary-btn-hover cursor-pointer px-4 py-2 rounded-e-md" value="Marvel" onClick={() => setSelectedFilter('Marvel')}>
                            <span className="text-center">Marvel</span>
                        </li>
                    </ul>
                </div>


                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-md shadow-md px-4 py-2" onClick={() => navigate('/add-one')}>
                    <button className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/add-one'}>
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