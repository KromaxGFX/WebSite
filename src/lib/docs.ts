import { getCollection } from 'astro:content';

/**
 * Obtiene todas las páginas de documentación ordenadas por `orden` dentro
 * de su `seccion`.
 */
export async function obtenerDocs() {
  const docs = await getCollection('docs');
  return docs.sort((a, b) => {
    const seccionA = a.data.seccion ?? 'zzz';
    const seccionB = b.data.seccion ?? 'zzz';
    if (seccionA !== seccionB) return seccionA.localeCompare(seccionB);
    return (a.data.orden ?? 99) - (b.data.orden ?? 99);
  });
}

/**
 * Agrupa la documentación por sección para la navegación lateral.
 */
export async function obtenerDocsPorSeccion() {
  const docs = await obtenerDocs();
  const mapa = new Map<string, typeof docs>();

  for (const doc of docs) {
    const seccion = doc.data.seccion ?? 'General';
    if (!mapa.has(seccion)) mapa.set(seccion, []);
    mapa.get(seccion)!.push(doc);
  }

  return mapa;
}

/**
 * Obtiene la navegación estructurada para el layout de documentación.
 */
export async function obtenerNavDocs() {
  const porSeccion = await obtenerDocsPorSeccion();
  const nav: Array<{ seccion: string; paginas: Array<{ titulo: string; href: string }> }> = [];

  for (const [seccion, paginas] of porSeccion) {
    nav.push({
      seccion,
      paginas: paginas.map((p) => ({
        titulo: p.data.titulo,
        href: `/docs/${p.id}/`,
      })),
    });
  }

  return nav;
}