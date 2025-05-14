import BtnFilter from "./BtnFilter";

interface Props {
    isMenuOpen: boolean;
    isHome: boolean;
    toggleMenu: () => void;
    filterCharacters: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideMenu = ({ isMenuOpen, toggleMenu, isHome, filterCharacters }: Props) => {
    return (
        <>
            {/* Slide-in menu overlay */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            ></div>

            {/* Slide-in menu from right */}
            <div className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-full w-4/5 max-w-xs bg-primary-header z-50 transition-transform duration-300 ease-in-out sm:hidden`}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white">Menú</h2>
                        <button 
                            onClick={toggleMenu}
                            className="text-white"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Search bar in slide menu */}
                    {isHome && (
                        <div className="relative mb-6">
                            <label htmlFor="mobileSearch" className="block text-white text-sm mb-2">Buscar personaje</label>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2.5 top-3 h-4 w-4 text-slate-400">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                                <input
                                    id="mobileSearch"
                                    className="h-10 w-full text-sm text-white bg-white/10 border border-white/20 outline-0 rounded-md focus:border-yellow-500 focus:border-2 px-4 pl-8"
                                    type="search"
                                    placeholder="Buscar personaje"
                                    name="search"
                                    onChange={filterCharacters}
                                />
                            </div>
                        </div>
                    )}

                    {/* Filter in slide menu */}
                    {isHome && (
                        <div className="mb-6">
                            <p className="block text-white text-sm mb-2">Filtrar por universo</p>
                            <div className="bg-white/10 p-3 rounded-lg">
                                <BtnFilter cantidadChar={undefined} isMobile={true} />
                            </div>
                        </div>
                    )}

                    {/* Navigation links */}
                    <nav className="flex flex-col space-y-4 mt-4">
                        <a href="/" className=" text-white  border-b border-amber-200 py-2">Inicio</a>
                        <a href="/add-one" className="text-white  border-b border-amber-200 py-2">Agregar personaje</a>
                    </nav>

                    <span className="mt-auto pt-4 border-t border-white/20"></span>   
                </div>
            </div>
        </>
    );
}
 
export default SideMenu;