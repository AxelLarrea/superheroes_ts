import { VercelRequest, VercelResponse } from '@vercel/node';
import supabase from "./supabaseClient.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const BASE_URL = 'https://superheroes-ts-dev.vercel.app'
        const { searchParams } = new URL(`${BASE_URL}${req.url}`);
        const name = searchParams.get('name');

        const { data, error } = await supabase
            .from('superheroe')
            .select('real_name, char_name, comic_universe, bio, appearance_year, equipment, type, superheroe_images(image_url)')
            .eq('char_name', name)
            .single()
    
        if (error) throw new Error('Error fetching superhero')
    
        const { superheroe_images, ...hero } = data
    
        // const images_urls = superheroe_images.map((image: { image_url: string }) => image.image_url)
        const images_urls = superheroe_images[0].image_url
        
        const heroWithImages = {
            ...hero,
            images_urls: images_urls
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: heroWithImages });

    } catch (error) {
        console.error('Error fetching superhero:', error);
        res.setHeader('Content-Type', 'application/json');

        return res.status(500).json({ 
            error: 'Error fetching superhero', 
            message: (error as Error).message 
        });
    }
}