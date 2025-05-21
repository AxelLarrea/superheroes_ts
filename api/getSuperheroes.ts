import supabase from "./supabaseClient";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

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

        if (filter !== 'Todos') {
            const filteredSuperheroes = superheroesWithImages.filter((hero) => hero.comic_universe === filter);
            return new Response(JSON.stringify({data: filteredSuperheroes}), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            })
        }

        return new Response(JSON.stringify({data: superheroesWithImages}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
            }
        })

    } catch (error) {
        console.error('Error fetching superheroes:', error);
        return new Response(JSON.stringify({ error: 'Error fetching superheroes', message: (error as Error).message }), {
			status: 500,
			headers: { 
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		});
    }
}
