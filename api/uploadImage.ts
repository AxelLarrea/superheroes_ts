import supabase from "./supabaseClient.ts";

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
            const fileName = `${charId}-${file.name}`

            // Sube la imágen al storage bucket
            const { error } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            console.log('a');
            console.log('Error: ', error);
    
            if (error) throw new Error(`Error al subir ${file.name}`);
            
            // Obtén la URL pública de la imágen
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            console.log(publicUrlData);
            console.log('b');

            if (!publicUrlData) throw new Error(`Error al obtener la URL pública de ${file.name}`);

            const URL = publicUrlData.publicUrl;

            console.log(URL);
            console.log('c');
            
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