#!/usr/bin/env node
/**
 * Genera imágenes sociales (og-image.png, apple-touch-icon.png) con Sharp.
 *
 * Requiere: npm install sharp
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

const ANCHO_OG = 1200;
const ALTO_OG = 630;
const ANCHO_APPLE = 180;
const ALTO_APPLE = 180;

const COLOR_FONDO = '#0b0d12';      // ink-900
const COLOR_ACENTO = '#eab463';     // accent-400
const COLOR_TEXTO = '#f2f4f8';      // ink-050
const COLOR_TEXTO_MUTED = '#8a93a6'; // ink-300

async function main() {
  await fs.mkdir(PUBLIC, { recursive: true });

  // og-image.png
  const ogSvg = `
    <svg width="${ANCHO_OG}" height="${ALTO_OG}" viewBox="0 0 ${ANCHO_OG} ${ALTO_OG}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${COLOR_FONDO}"/>
      <rect x="0" y="0" width="${ANCHO_OG}" height="8" fill="${COLOR_ACENTO}"/>
      <rect x="0" y="${ALTO_OG - 8}" width="${ANCHO_OG}" height="8" fill="${COLOR_ACENTO}"/>
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="72" font-weight="600" fill="${COLOR_TEXTO}"
            letter-spacing="-0.02em">Kromax<span style="font-weight:400;fill:${COLOR_TEXTO_MUTED}">GFX</span></text>
      <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="28" fill="${COLOR_TEXTO_MUTED}">
        API gráfica multiplataforma
      </text>
      <text x="50%" y="78%" dominant-baseline="middle" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="20" fill="${COLOR_ACENTO}">
        kromaxgfx.github.io/WebSite/
      </text>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, 'og-image.png'));

  // apple-touch-icon.png
  const appleSvg = `
    <svg width="${ANCHO_APPLE}" height="${ALTO_APPLE}" viewBox="0 0 ${ANCHO_APPLE} ${ALTO_APPLE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="36" fill="${COLOR_FONDO}"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="90" font-weight="600" fill="${COLOR_ACENTO}"
            letter-spacing="-0.02em">K</text>
    </svg>
  `;

  await sharp(Buffer.from(appleSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));

  console.log('✅ Imágenes generadas en public/:');
  console.log(`   - og-image.png (${ANCHO_OG}x${ALTO_OG})`);
  console.log(`   - apple-touch-icon.png (${ANCHO_APPLE}x${ALTO_APPLE})`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});