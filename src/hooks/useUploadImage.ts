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
                contentType: file.type, // Ejemplo: 'image/jpeg'
                upsert: false,
                });
    
            if (error) {
                return console.error(`Error al subir ${file.name}:`, error);
            } else {
                console.log(`Archivo ${file.name} subido con éxito:`, data);
            }
    
            // Obtén la URL pública
            const { data: publicUrlData } = supabase.storage
                .from('superheroes_images')
                .getPublicUrl(fileName);
    
            imageUrls.push(publicUrlData.publicUrl);
        })
    
        // Actualiza el elemento con las URLs
        const { data: updatedItem, error: updateError } = await supabase
            .from('superheroes')
            .update({ image_urls: imageUrls }) // Usa JSONB o TEXT[] según la tabla
            .eq('id', charId)
            .select()
            .single();
    
        if (updateError) {
            console.error('Error al actualizar el elemento:', updateError);
            return null;
        }
    
        console.log('Imágenes subidas y elemento actualizado:', updatedItem);
        return updatedItem;
    } catch (err) {
        console.error('Error inesperado:', err);
        return null;
    }
}
 
export default useUploadImage;