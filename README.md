# Uniq Positivo

Landing page y sistema MVP de turnos para Uniq Positivo, desarrollado con React, Vite y Tailwind CSS.

## Que incluye esta entrega

- Sitio responsive con paginas/secciones de belleza, arte, shop, contacto y administracion.
- Assets publicos del proyecto en `public/`.
- Configuracion de Vite, Tailwind, PostCSS y Vercel.
- Scripts SQL de Supabase en `supabase/` para crear tablas, politicas y datos iniciales.
- Archivo `.env.example` con las variables necesarias.

## Requisitos

- Node.js 20 o superior.
- npm.
- Una cuenta de Supabase si se quiere usar el sistema de turnos conectado a base de datos.
- Una cuenta de Vercel o hosting compatible con sitios Vite/SPA para publicar.

## Instalacion local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Luego abrir la URL local que muestra Vite.

## Variables de entorno

Completar `.env.local` en desarrollo o las variables del hosting en produccion:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ADMIN_USER=
VITE_ADMIN_PASSWORD=
```

Notas:

- No compartir el archivo `.env.local`.
- Si no se configuran credenciales privadas de admin, el panel usa el modo demo `admin / uniq-admin`.
- El panel interno esta en `/admin`.

## Supabase

En el SQL Editor de Supabase ejecutar:

1. `supabase/schema.sql`
2. `supabase/seed.sql`

Scripts auxiliares:

- `supabase/services.sql`: actualiza solo servicios.
- `supabase/settings.sql`: crea o actualiza configuracion de negocio.
- `supabase/reservations_contact_fields.sql`: migracion puntual para bases anteriores que no tengan email/DNI.

El MVP permite leer y actualizar reservas desde el frontend usando la anon key. Antes de manejar datos sensibles en produccion, conviene reemplazar ese esquema por Supabase Auth o Edge Functions.

## Build y preview

```bash
npm run build
npm run preview
```

El build queda en `dist/`.

## Deploy en Vercel

1. Crear un proyecto nuevo en Vercel.
2. Importar este codigo.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Cargar las variables de entorno del bloque anterior.

El archivo `vercel.json` ya incluye la rewrite necesaria para que rutas como `/galeria`, `/shop` y `/admin` funcionen al abrirse directamente.

## Rutas principales

- `/`: landing principal.
- `/galeria`: experiencia de galeria.
- `/shop`: catalogo visual del local.
- `/admin`: panel interno de turnos.

## Imagenes y contenido

- Las imagenes del shop se esperan en `public/shop/`. Ver `public/shop/README.md`.
- Las imagenes de obras se esperan en `public/artworks/`. Ver `public/artworks/README.md`.
- Si se agregan nuevas imagenes, mantener nombres simples, sin espacios, y extensiones `.jpg`, `.jpeg`, `.png` o `.webp` segun corresponda.

## Entrega en ZIP

El ZIP de entrega debe incluir el codigo fuente, `public/`, `supabase/`, configuraciones y este README.

No debe incluir:

- `node_modules/`
- `dist/`
- `.git/`
- `.env` o `.env.local`
- archivos temporales del sistema
