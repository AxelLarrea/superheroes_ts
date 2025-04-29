import { useCharStore } from "../utils/store";

const Header = () => {

    const { setSearchCharacter } = useCharStore()
   
    const filterCharacters = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchCharacter(inputValue);
    }

    return (
        <header className="bg-primary-header text-white p-4">
            <div className="h-24 max-w-[1200px] flex justify-between items-center m-auto">
                <div className="flex items-center gap-2">
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.261 1.03462C12.6971 1.15253 13 1.54819 13 1.99997V8.99997H19C19.3581 8.99997 19.6888 9.19141 19.8671 9.50191C20.0455 9.8124 20.0442 10.1945 19.8638 10.5038L12.8638 22.5038C12.6361 22.8941 12.1751 23.0832 11.739 22.9653C11.3029 22.8474 11 22.4517 11 22V15H5C4.64193 15 4.3112 14.8085 4.13286 14.498C3.95452 14.1875 3.9558 13.8054 4.13622 13.4961L11.1362 1.4961C11.3639 1.10586 11.8249 0.916719 12.261 1.03462ZM6.74104 13H12C12.5523 13 13 13.4477 13 14V18.301L17.259 11H12C11.4477 11 11 10.5523 11 9.99997V5.69889L6.74104 13Z" fill="#f5e724"></path> 
                        </g>
                    </svg>
                    
                    <a href="/" className="text-4xl font-bold">Superheroes</a>
                </div>

                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2.5 top-3 h-4 w-4 text-slate-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input
                        className="h-10 text-sm text-white bg-white/10 border border-white/20 outline-0 rounded-md px-4 pl-8"
                        type="search"
                        placeholder="Buscar personaje"
                        name="search"
                        onChange={filterCharacters}
                    />
                </div>
            </div>
        </header>
    );
}
 
export default Header;