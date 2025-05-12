import { ImageFile } from "../pages/AddHero";

const checkFilesType = (files: File[]) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    const validFiles = files.filter(file => allowedTypes.includes(file.type));

    return validFiles;
}

const checkDuplicates = (files: File[], images: ImageFile[]) => {
    const uniqueFiles = new Set(images.map(image => image.file.name));
    const validFiles = files.filter(file => {
        if (uniqueFiles.has(file.name)) {
            return false;
        }
        uniqueFiles.add(file.name);
        return true;
    });

    return validFiles;
}

export { 
    checkFilesType, 
    checkDuplicates 
}