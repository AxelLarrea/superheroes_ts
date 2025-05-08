Superheroes SPA

Es una aplicación donde se puede:
- Ver información de un personaje.
- Ver los personajes independientemente del universo.
- Ver personajes filtrando por universo, ya sea Marvel o DC.
- Buscar personajes mediante la barra de búsqueda.
- Agregar personajes nuevos.

Anotaciones:

Para la carga inicial de datos se utiliza el script en utils/upload_base_data.ts.
Dado que es un proyecto en TS, se debe usar el comando node --experimental-strip-types upload_base_data.ts.
Cambiar las variables supabaseUrl y supabaseKey con su correspondiente string en el archivo db/supabase-client.ts sin usar el .env.
