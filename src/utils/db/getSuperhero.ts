import supabase from "../../db/supabase-client";

const getSuperhero = async (id: string) => {
    try {
        const { data, error } = await supabase
            .from('superheroe')
            .select('real_name, char_name, comic_universe, bio, appearance_year, equipment, type, superheroe_images(image_url)')
            .eq('char_name', id)
            .single()
    
        if (error) throw new Error('Error fetching superhero')
    
        const { superheroe_images, ...hero } = data
    
        const images_urls = superheroe_images.map((image: { image_url: string }) => image.image_url)
        
        const heroWithImages = {
            ...hero,
            images_urls: images_urls
        }
    
        return heroWithImages
    } catch (error) {
        console.log('Error fetching superhero:', error);
    }
}

export default getSuperhero