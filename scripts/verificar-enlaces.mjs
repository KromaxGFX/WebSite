#!/usr/bin/env node
/**
 * Verifica enlaces internos del sitio construido en dist/.
 *
 * Reglas:
 * - Los enlaces internos que empiezan por la base (ej. /WebSite/) son válidos y se resuelven desde la raíz del sitio.
 * - Los enlaces relativos (sin barra inicial) se resuelven desde el directorio de la página actual.
 * - No duplicados de separadores ('//').
 * - El destino existe (archivo o directorio con index.html).
 * - Las páginas terminan en '/'; los recursos no.
 * - Revisa también sitemap-*.xml y rss.xml.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE } from '../src/lib/base.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE_PATH = BASE === '/' ? '' : BASE;

async function main() {
  const errores = [];
  const advertencias = [];

  // 1. Recopilar todos los archivos y directorios en dist
  const existentes = new Set();
  await recolectar(DIST, DIST, existentes);

  // 2. Verificar HTMLs
  for (const archivo of existentes) {
    if (archivo.endsWith('.html')) {
      await verificarHtml(archivo, existentes, errores, advertencias);
    }
  }

  // 3. Verificar sitemap y rss
  await verificarSitemapYRss(existentes, errores, advertencias);

  // 4. Reportar
  if (advertencias.length > 0) {
    console.warn('\n⚠ Advertencias:');
    for (const w of advertencias) console.warn(`  - ${w}`);
  }

  if (errores.length > 0) {
    console.error('\n❌ Errores:');
    for (const e of errores) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log('✅ Todos los enlaces internos son válidos.');
}

async function recolectar(base, dir, set) {
  const entradas = await fs.readdir(dir, { withFileTypes: true });
  for (const entrada of entradas) {
    const rutaAbs = path.join(dir, entrada.name);
    const rutaRel = path.relative(base, rutaAbs).replace(/\\/g, '/');
    if (entrada.isDirectory()) {
      set.add(rutaRel + '/');
      await recolectar(base, rutaAbs, set);
    } else {
      set.add(rutaRel);
    }
  }
}

async function verificarHtml(archivo, existentes, errores, advertencias) {
  const rutaAbs = path.join(DIST, archivo);
  const contenido = await fs.readFile(rutaAbs, 'utf-8');
  const baseDir = path.dirname(archivo);

  // Extraer href y src
  const regex = /(href|src)="([^"]+)"/g;
  let match;
  while ((match = regex.exec(contenido)) !== null) {
    const [, , enlace] = match;
    verificarEnlace(enlace, archivo, baseDir, existentes, errores, advertencias);
  }
}

function verificarEnlace(enlace, origen, baseDir, existentes, errores, advertencias) {
  // Ignorar externos, anclas, mailto, tel, javascript:, data:
  if (
    enlace.startsWith('http://') ||
    enlace.startsWith('https://') ||
    enlace.startsWith('mailto:') ||
    enlace.startsWith('tel:') ||
    enlace.startsWith('javascript:') ||
    enlace.startsWith('data:') ||
    enlace.startsWith('#')
  ) {
    return;
  }

  // Determinar si es un enlace con base path
  const esConBase = enlace.startsWith(BASE_PATH + '/') || enlace === BASE_PATH;
  const esAbsolutoSinBase = enlace.startsWith('/') && !esConBase;

  if (esAbsolutoSinBase) {
    errores.push(`${origen}: enlace absoluto "${enlace}" — usa rutas relativas sin barra inicial`);
    return;
  }

  // Resolver el destino según el tipo de enlace
  let destino;
  let esDirectorio;

  if (esConBase) {
    // Enlace con base path: resolver desde la raíz del sitio (dist/)
    let rutaRelativa = enlace.slice(BASE_PATH.length);
    if (rutaRelativa.startsWith('/')) {
      rutaRelativa = rutaRelativa.slice(1);
    }
    // Caso especial: la raíz del sitio (enlace === BASE_PATH) -> index.html
    if (rutaRelativa === '' || rutaRelativa === '/') {
      destino = 'index.html';
      esDirectorio = true;
    } else {
      destino = rutaRelativa;
      esDirectorio = rutaRelativa.endsWith('/') || !rutaRelativa.includes('.');
    }
  } else {
    // Enlace relativo: resolver desde el directorio de la página actual
    // No duplicados de separadores
    if (enlace.includes('//')) {
      errores.push(`${origen}: separador duplicado en "${enlace}"`);
      return;
    }

    destino = path.posix.join(baseDir, enlace).replace(/\\/g, '/');
    
    // Normalizar: eliminar '.' y '..' iniciales que salgan de dist
    const partes = destino.split('/');
    const resueltas = [];
    for (const parte of partes) {
      if (parte === '..') {
        if (resueltas.length > 0) resueltas.pop();
      } else if (parte !== '.' && parte !== '') {
        resueltas.push(parte);
      }
    }
    destino = resueltas.join('/');
    esDirectorio = enlace.endsWith('/') || !enlace.includes('.');
  }

  // Verificar existencia
  const candidatoDir = esDirectorio ? destino + (destino.endsWith('/') ? '' : '/') : destino;
  const candidatoIndex = esDirectorio ? destino + (destino.endsWith('/') ? '' : '/') + 'index.html' : null;

  const existe =
    existentes.has(candidatoDir) ||
    (candidatoIndex && existentes.has(candidatoIndex)) ||
    existentes.has(destino);

  if (!existe) {
    errores.push(`${origen}: enlace roto "${enlace}" → "${destino}" (no existe en dist/)`);
  }

  // Verificar barra final coherente
  if (esDirectorio && !enlace.endsWith('/')) {
    advertencias.push(`${origen}: enlace a directorio sin barra final: "${enlace}"`);
  }
  if (!esDirectorio && enlace.endsWith('/')) {
    advertencias.push(`${origen}: enlace a archivo con barra final: "${enlace}"`);
  }
}

async function verificarSitemapYRss(existentes, _errores, advertencias) {
  // sitemap-index.xml
  if (existentes.has('sitemap-index.xml')) {
    const contenido = await fs.readFile(path.join(DIST, 'sitemap-index.xml'), 'utf-8');
    const urls = contenido.match(/<loc>([^<]+)<\/loc>/g) || [];
    for (const url of urls) {
      const link = url.replace(/<\/?loc>/g, '');
      // Verificar que la URL está bajo la base
      if (!link.includes(BASE_PATH)) {
        advertencias.push(`sitemap-index.xml: URL fuera de base: ${link}`);
      }
    }
  }

  // rss.xml
  if (existentes.has('rss.xml')) {
    const contenido = await fs.readFile(path.join(DIST, 'rss.xml'), 'utf-8');
    const links = contenido.match(/<link>([^<]+)<\/link>/g) || [];
    for (const link of links) {
      const url = link.replace(/<\/?link>/g, '');
      if (!url.includes(BASE_PATH)) {
        advertencias.push(`rss.xml: URL fuera de base: ${url}`);
      }
    }
  }
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});