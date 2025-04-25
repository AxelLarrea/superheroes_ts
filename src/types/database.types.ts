export interface Database {
    public: {
      Tables: {
        superheroe: {
          Row: {
            id: number
            created_at: string
            real_name: string
            char_name: string
            comic_universe: string
            bio: string
            logo: string
            appearance_year: string
            equipment: string
          };
        };
        superheroe_image: {
          Row: {
            id: number
            superhero_id: number
            image_url: string
          };
        };
      };
    };
  }