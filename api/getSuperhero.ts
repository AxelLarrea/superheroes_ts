import supabase from "./supabaseClient";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    try {
        const { data, error } = await supabase
            .from('superheroe')
            .select('real_name, char_name, comic_universe, bio, appearance_year, equipment, type, superheroe_images(image_url)')
            .eq('char_name', name)
            .single()
    
        if (error) throw new Error('Error fetching superhero')
    
        const { superheroe_images, ...hero } = data
    
        const images_urls = superheroe_images.map((image: { image_url: string }) => image.image_url)
        
        const heroWithImages = {
            ...hero,
            images_urls: images_urls
        }

        return new Response(JSON.stringify({data: heroWithImages}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
            }
        })

    } catch (error) {
        console.error('Error fetching superhero:', error);
        return new Response(JSON.stringify({ error: 'Error fetching superhero', message: (error as Error).message }), {
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