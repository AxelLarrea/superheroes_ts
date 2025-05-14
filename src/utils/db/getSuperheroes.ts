import supabase from "../../db/supabase-client";

const getSuperheroes = async (filter: string) => {
    try {
        const { data, error } = await supabase
            .from('superheroe')
            .select('id, char_name, comic_universe, type, superheroe_images(image_url)') // Join con la tabla superheroe_images
        
        if (error) throw new Error('Error fetching superheroes')
        
        const superheroesWithImages = data.map(({ superheroe_images, ...hero }) => (
            {
                ...hero,
                images_urls: superheroe_images.map((image: { image_url: string; }) => image.image_url), // Extraemos las URLs de las imágenes
            }
        ))

        if (filter !== 'Todos') return superheroesWithImages.filter((hero) => hero.comic_universe === filter);
        
        return superheroesWithImages
    } catch (error) {
        console.log('Error fetching superheroes:', error);
    }
}

export default getSuperheroes;