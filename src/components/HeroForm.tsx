
import supabase from "../db/supabase-client";

const HeroForm = () => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log('currentTarget:', event.currentTarget.elements)
        console.log('Formdata:', formData.entries())

        // const { data: heroData, error } = await supabase
        //     .from('heroes')
        //     .insert([data]);

        console.log('data: ', data)

        // if (error) {
        //     console.error('Error inserting data:', error);
        // } else {
        //     console.log('Data inserted successfully!');
        // }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Agregar personaje</h1>
            <form className="flex flex-col items-center justify-center gap-4 mt-8" onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre del personaje" className="border border-gray-300 p-2 rounded-md w-full max-w-md" />
                <input type="text" placeholder="Nombre real" className="border border-gray-300 p-2 rounded-md w-full max-w-md" />
                <input type="text" placeholder="Comic" className="border border-gray-300 p-2 rounded-md w-full max-w-md" />
                <input type="text" placeholder="Año de aparición" className="border border-gray-300 p-2 rounded-md w-full max-w-md" />
                <input type="text" placeholder="Equipamiento" className="border border-gray-300 p-2 rounded-md w-full max-w-md" />
                <textarea placeholder="Biografía" className="border border-gray-300 p-2 rounded-md w-full max-w-md h-32 resize-none"></textarea>
                <button type="submit" className="bg-primary-btn text-white p-2 rounded-md">Agregar personaje</button>
            </form>
        </div>
    );
}
 
export default HeroForm;