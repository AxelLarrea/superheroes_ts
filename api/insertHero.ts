import type { VercelRequest, VercelResponse } from '@vercel/node';
import supabase from "./supabaseClient.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const formData = req.body
        const char_name = formData.char_name
    
        if (!char_name) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'Missing char name' });
        }

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

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: heroQuery });
        
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ 
            error: 'Error al agregar el personaje', 
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