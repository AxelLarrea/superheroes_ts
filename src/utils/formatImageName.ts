function formatImageName(name: string) {
    // Formatear nombre para evitar errores con Supabase
    const formated = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
        .replace(/ñ/g, "n") // Reemplazar ñ por n
        .replace(/[^a-zA-Z0-9.-]/g, "-") // Reemplazar caracteres no alfanuméricos por guiones
        .replace(/-+/g, "-") // Reemplazar múltiples guiones por uno solo
        .replace(/^-|-$/g, "") // Elimina guiones al inicio y fin
        .replace(/\.(jpg|jpeg|png|gif)$/i, ".webp") // Replace image extensions with .webp

    return formated.toLowerCase();
}

export default formatImageName;