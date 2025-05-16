import supabase  from '../../db/supabase-client';

const uploadImage = async ({ charId, files }: {charId: string, files: File[]}) => {
    try {
        files.forEach(async (file) => {
            const fileName = `${charId}-${file.name}`

            // Sube la imágen al storage bucket
            const { error } = await supabase.storage
                .from('images')
                .upload(fileName, file);
    
            if (error) return console.log(`Error al subir ${file.name}:`, error);
            
            // Obtén la URL pública de la imágen
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            if (!publicUrlData) return console.log(`Error al obtener la URL pública de ${file.name}`);

            const URL = publicUrlData.publicUrl;
            
            // Inserta la URL en la tabla superheroe_images
            const { error: insertError } = await supabase
                .from('superheroe_images')
                .insert({ 
                    image_url: URL,
                    superheroe_id: parseInt(charId)
                })
        
            if (insertError) return console.log('Error al subir el elemento: ', insertError);
        })
    } catch (err) {
        return console.log('Error inesperado: ', err);
    }
}
 
export default uploadImage;