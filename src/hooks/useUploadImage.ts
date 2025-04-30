import supabase  from '../db/supabase-client';

const useUploadImage = async ({ charId, files }: {charId: string, files: File[]}) => {
    try {
        const imageUrls: string[] = [];
    
        // Sube cada imagen al bucket
        files.forEach(async (file) => {
            const fileName = `${charId}/${file.name}`; // Estructura: charId/nombre-unico
            const { data, error } = await supabase.storage
                .from('superheroes_images')
                .upload(fileName, file, {
                    contentType: file.type // Ejemplo: 'image/jpeg'
                });
    
            if (error) return console.log(`Error al subir ${file.name}:`, error);
            
            console.log(`Archivo ${file.name} subido con éxito:`, data);
            
            // Obtén la URL pública
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);
    
            imageUrls.push(publicUrlData.publicUrl);
        })
    
        // Agregar las URLs de las imágenes en la tabla 'superheroe_images'
        imageUrls.forEach(async (imageUrl) => {
            const { data: insertedItem, error: insertError } = await supabase
                .from('superheroe_images')
                .insert({ 
                    image_url: imageUrl,
                    superheroe_id: charId
                })
                .single();
        
            if (insertError) return console.log('Error al subir el elemento:', insertError);
        
            console.log('Imágenes subidas y elemento actualizado:', insertedItem);
        })
        
    } catch (err) {
        return console.log('Error inesperado:', err);
    }
}
 
export default useUploadImage;