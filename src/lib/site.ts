import { BASE } from './base.mjs';

/**
 * Metadatos globales del sitio.
 *
 * Un solo lugar donde vive el nombre, la descripcion y los enlaces
 * sociales, para que la cabecera, el pie y los metadatos SEO no se
 * desincronicen.
 */
export const SITE = {
  nombre: 'KromaxGFX',
  titulo: 'KromaxGFX',
  descripcion:
    'Organización enfocada en desarrollar Kromax: una API gráfica multiplataforma para todos los dispositivos y sistemas operativos que puedan mostrar gráficos a un usuario.',
  descripcionCorta:
    'API gráfica multiplataforma para cualquier dispositivo que pueda renderizar.',
  idioma: 'es',
  locale: 'es_ES',
  url: 'https://kromaxgfx.github.io',
  base: BASE,
  organizacion: 'KromaxGFX',
  repositorio: 'https://github.com/KromaxGFX',
  copyright: new Date().getFullYear(),
} as const;

/** Enlace a un repositorio de la organizacion. */
export function repoUrl(nombre: string): string {
  return `${SITE.repositorio}/${nombre}`;
}

/** Enlace a un archivo concreto dentro de un repositorio. */
export function repoFileUrl(nombre: string, ruta: string, rama = 'main'): string {
  return `${SITE.repositorio}/${nombre}/blob/${rama}/${ruta.replace(/^\/+/, '')}`;
}

/**
 * Prefijo bajo el que se publica el sitio.
 *
 * GitHub Pages sirve el repositorio `KromaxGFX/WebSite` en
 * `https://kromaxgfx.github.io/WebSite/`, de modo que **ningun enlace
 * interno puede empezar por `/`**: Astro solo antepone la base a los recursos
 * que genera, no a los enlaces escritos a mano.
 *
 * El valor vive en `src/lib/base.mjs`, que es la unica fuente de verdad y la
 * comparten la configuracion de Astro y este modulo.
 */
export { BASE };

/**
 * Construye la ruta publica de una pagina interna del sitio.
 *
 * Las rutas se escriben siempre con la barra inicial y sin la base
 * (`/proyectos/`); esta funcion antepone la base y garantiza la barra final,
 * que es la que exige `trailingSlash: 'always'`.
 *
 * @param rutaInterna Ruta interna, por ejemplo `/docs/arquitectura/`.
 * @returns La ruta publica, por ejemplo `/WebSite/docs/arquitectura/`.
 */
export function ruta(rutaInterna: string): string {
  const limpia = rutaInterna.replace(/^\/+/, '').replace(/\/+$/, '');
  return limpia === '' ? `${BASE}/` : `${BASE}/${limpia}/`;
}

/**
 * Construye la ruta publica de un archivo estatico de `public/`.
 *
 * A diferencia de `ruta`, no anade barra final: `favicon.svg` y `rss.xml`
 * se sirven como archivos, no como directorios.
 *
 * @param rutaArchivo Ruta del archivo, por ejemplo `/favicon.svg`.
 * @returns La ruta publica, por ejemplo `/WebSite/favicon.svg`.
 */
export function recurso(rutaArchivo: string): string {
  return `${BASE}/${rutaArchivo.replace(/^\/+/, '')}`;
}