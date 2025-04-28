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
                <a href="/" className="text-4xl font-bold">Superheroes</a>
                <input
                    className="h-8 text-base text-black bg-white  outline-0 rounded-full pl-4"
                    type="text"
                    placeholder="Buscar personaje"
                    name="search"
                    onChange={filterCharacters}
                />
            </div>
        </header>
    );
}
 
export default Header;