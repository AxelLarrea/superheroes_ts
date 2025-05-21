import supabase from "./supabaseClient";
import formatImageName from "../src/utils/formatImageName";

export async function POST(request: Request) {

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const charId = formData.get('charId') as string

    if (!files || !charId) {
        return new Response(JSON.stringify({ error: 'Missing files or charId' }), {
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
        await Promise.all(files.map(async (file: File) => {
            const formatedName = formatImageName(file.name)
            const fileName = `${charId}-${formatedName}`

            // Sube la imágen al storage bucket
            const { error } = await supabase.storage
                .from('images')
                .upload(fileName, file);
    
            if (error) throw new Error(`Error al subir ${formatedName}`);
            
            // Obtén la URL pública de la imágen
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            if (!publicUrlData) throw new Error(`Error al obtener la URL pública de ${formatedName}`);

            const URL = publicUrlData.publicUrl;
            
            // Inserta la URL en la tabla superheroe_images
            const { error: insertError } = await supabase
                .from('superheroe_images')
                .insert({ 
                    image_url: URL,
                    superheroe_id: parseInt(charId)
                })
        
            if (insertError) throw new Error('Error al insertar las url de imágenes con el id del personaje');
        }))

        return new Response(JSON.stringify({ message: 'Images uploaded successfully' }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
            }
        })

    } catch (error) {
        console.error('Error al subir las imágenes:', error);
        return new Response(JSON.stringify({ error: 'Error al subir las imágenes', message: (error as Error).message }), {
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