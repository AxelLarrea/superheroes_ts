import supabase from "./supabaseClient";

export async function POST(request: Request) {

    const formData = await request.json()
    const char_name = formData.char_name

    if (!char_name) {
        return new Response(JSON.stringify({ error: 'Missing char name' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
            }
        })
    }

    try {
        // Validate existing hero
        const { data: existingHero, error: existingHeroError } = await supabase
            .from('superheroe')
            .select('*')
            .eq('char_name', char_name)
            
        if (existingHero && existingHero?.length > 0 ) throw new Error("El personaje ya existe")
        
        if (existingHeroError) throw new Error("Error al validar si el personaje existe")

        // Insert superheroe
        const { error: insertError } = await supabase
            .from('superheroe')
            .insert(formData)

        if (insertError) throw new Error("Error al insertar el personaje")

        // Query superheroe id
        const { data: heroQuery, error: queryError } = await supabase
            .from('superheroe')
            .select('id')
            .eq('char_name', char_name)
            .single()

        if (queryError) throw new Error("Error al obtener el id del personaje")

        return new Response(JSON.stringify({ data: heroQuery }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
            }
        })

    } catch (error) {
        console.error('Error al agregar el personaje:', error);
        return new Response(JSON.stringify({ error: 'Error al agregar el personaje', message: (error as Error).message }), {
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