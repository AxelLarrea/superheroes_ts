import { useState } from "react";
import { useCharStore } from "../utils/store";

interface Cantidad {
    cantidadChar: number | undefined
    isMobile: boolean
}

const BtnFilter = ( { cantidadChar, isMobile } : Cantidad ) => {

    const { selectedFilter, setSelectedFilter } = useCharStore()
    const [isClicked, setIsClicked] = useState(false);

    const desktopClass = isClicked ? 
        'max-w-[400px] opacity-100 rounded-s-none rounded-e-md pl-[100%]' :
        'opacity-0 h-0'

    const mobileClass = isClicked ? 
        'w-full opacity-100 flex-col top-0 pt-[20%]' :
        'opacity-0 h-0'

    const btnClassDesktop = isClicked ? 'rounded-s-md rounded-e-none' : '' // Para botón desktop
    const btnClassMobile = isClicked ? 'rounded-t-md rounded-b-none' : '' // Para botón mobile
    const btnClass = isMobile ? btnClassMobile : btnClassDesktop

    const handleClick = (filter: string) => {
        setIsClicked(false);
        setSelectedFilter(filter);
    }

    return (
        <div className="group relative flex items-center">
            <button 
                className={`${btnClass} ${isMobile ? 'w-full' : 'w-40'} flex items-center justify-between z-10 cursor-pointer text-[#4A55A7] border border-[#DFE1F5] bg-btn-filter hover:bg-btn-filter-hover hover:border-[#4A55A7] transition-all duration-300 rounded-md px-2 py-2`}
                onClick={() => setIsClicked(!isClicked)}
                >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4A55A7">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z" stroke="#4A55A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
                {selectedFilter}
                { cantidadChar !== undefined && <span className="bg-[#DFE1F5] text-sm rounded-full px-2">{cantidadChar}</span>}
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isClicked ? 'rotate-0' : '-rotate-90'} transition-transform duration-600 ease-in-out`}>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#4A55A7"></path> 
                    </g>
                </svg>
            </button>

            {/* Arreglar transición cuando vuelve el menú dropdown */}
            { 
                isMobile ? 
                (
                    <div className={`${mobileClass} absolute left-0 z-0 overflow-hidden flex text-[#4A55A7] bg-btn-filter border border-[#DFE1F5] border-l-0 rounded-md transition-all duration-300 p-0`}>
                        <button className="hover:bg-[#DFE1F5] cursor-pointer px-4 py-2" value="Todos" onClick={() => handleClick('Todos')}>
                            <span className="text-center">Todos</span>
                        </button>
        
                        <button className="hover:bg-[#DFE1F5] cursor-pointer px-4 py-2" value="DC" onClick={() => handleClick('DC')}>
                            <span className="text-center">DC</span>
                        </button>
        
                        <button className="hover:bg-[#DFE1F5] cursor-pointer px-4 py-2 rounded-e-md" value="Marvel" onClick={() => handleClick('Marvel')}>
                            <span className="text-center">Marvel</span>
                        </button>
                    </div>  
                )
                :
                (
                    <div className={`${desktopClass} absolute left-0 z-0 overflow-hidden flex text-[#4A55A7] bg-btn-filter border border-[#DFE1F5] border-l-0 rounded-md transition-all duration-300`}>
                        <button className="hover:bg-[#DFE1F5] cursor-pointer px-4 py-2" value="Todos" onClick={() => handleClick('Todos')}>
                            <span className="text-center">Todos</span>
                        </button>
        
                        <button className="hover:bg-[#DFE1F5] cursor-pointer px-4 py-2" value="DC" onClick={() => handleClick('DC')}>
                            <span className="text-center">DC</span>
                        </button>
        
                        <button className="hover:bg-[#DFE1F5] cursor-pointer px-4 py-2 rounded-e-md" value="Marvel" onClick={() => handleClick('Marvel')}>
                            <span className="text-center">Marvel</span>
                        </button>
                    </div>
                )
            }
        </div>
    );
}
 
export default BtnFilter;