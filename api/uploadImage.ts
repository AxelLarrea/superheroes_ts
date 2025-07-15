import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingForm } from 'formidable';
import supabase from "./supabaseClient.js";
import formatImageName from "../src/utils/formatImageName.js";
import sharp from 'sharp';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const form = new IncomingForm();
        const [fields, files] = await form.parse(req);
        const charId = fields.charId?.[0] || fields.charId;
        const formFiles = files.files || [];
    
        if (!files || !charId) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'Missing files or charId' });
        }

        await Promise.all(formFiles.map(async (file) => {
            const formatedName = formatImageName(file.originalFilename!)
            const fileName = `${charId}-${formatedName}`
            const resizedImage = await sharp(file.filepath).resize(250, 250).webp().toBuffer();

            // Sube la imágen al storage bucket
            const { error } = await supabase.storage
                .from('images')
                .upload(fileName, resizedImage);
            
            if (error) throw new Error('Error al subir imágen al storage');

            // Obtén la URL pública de la imágen
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            if (!publicUrlData) throw new Error(`Error al obtener la URL pública de la imágen`);

            const URL = publicUrlData.publicUrl;
            
            // Inserta la URL en la tabla superheroe_images
            const { error: insertError } = await supabase
                .from('superheroe_images')
                .insert({ 
                    image_url: URL,
                    superheroe_id: charId
                })

            if (insertError) throw new Error('Error al insertar las url de imágenes con el id del personaje');
        }))
        
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: 'Images uploaded successfully' });

    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ 
            error: 'Error al subir las imágenes', 
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