import { VercelRequest, VercelResponse } from '@vercel/node';
import supabase from "./supabaseClient.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const BASE_URL = 'https://superheroes-ts-dev.vercel.app'
        const { searchParams } = new URL(`${BASE_URL}${req.url}`);
        const filter = searchParams.get('filter');
        
        const { data, error } = await supabase
            .from('superheroe')
            .select('id, char_name, comic_universe, type, superheroe_images(image_url)') // Join con la tabla superheroe_images
        
        if (error) throw new Error('Error fetching superheroes')
        
        const superheroesWithImages = data.map(({ superheroe_images, ...hero }) => (
            {
                ...hero,
                images_urls: superheroe_images[0]?.image_url // Extraemos las URLs de las imágenes
            }
        ))

        if (filter !== 'Todos') {
            const filteredSuperheroes = superheroesWithImages.filter((hero) => hero.comic_universe === filter);
            
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ data: filteredSuperheroes });
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: superheroesWithImages });

    } catch (error) {
        console.error('Error fetching superheroes:', error);
        return res.status(500).json({ 
            error: 'Error fetching superheroes', 
            message: (error as Error).message 
        });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}