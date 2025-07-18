export interface Hero {
    id: string
    real_name: string
    char_name: string
    comic_universe: string
    bio: string
    logo: string
    appearance_year: string
    equipment: string
    type: 'Heroe' | 'Villano' | 'Antiheroe'
    images_urls: string
}