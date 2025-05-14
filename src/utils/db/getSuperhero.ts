import supabase from "../../db/supabase-client";

const getSuperhero = async (id: string) => {
    const { data, error } = await supabase
        .from('superheroe')
        .select('*, superheroe_images(image_url)')
        .eq('char_name', id)
        .single()

    if (error) {
        return console.log('Error fetching superhero:', error);
    }

    const { superheroe_images, ...hero } = data

    const images_urls = superheroe_images.map((image: { image_url: string }) => image.image_url)
    
    const heroWithImages = {
        ...hero,
        images_urls: images_urls
    }

    return heroWithImages
}

export default getSuperhero