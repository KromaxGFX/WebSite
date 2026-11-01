import { getCollection } from 'astro:content';

/**
 * Obtiene todos los proyectos ordenados por el campo `orden`.
 *
 * La colección `proyectos` se define en `src/content.config.ts` y cada
 * entrada es un archivo `.md` en `src/content/proyectos/`.
 */
export async function obtenerProyectos() {
  const proyectos = await getCollection('proyectos');
  return proyectos.sort((a, b) => (a.data.orden ?? 99) - (b.data.orden ?? 99));
}

/**
 * Obtiene un proyecto por su `clave`.
 */
export async function obtenerProyecto(clave: string) {
  const proyectos = await obtenerProyectos();
  return proyectos.find((p) => p.data.clave === clave);
}