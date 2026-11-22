/** Emits self-hosted hero photos at build time: /photos/<name>-1600.webp (master) and /photos/<name>-800.webp. */
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { PHOTO_WIDTHS } from '../../lib/photos';

const masters = import.meta.glob('../../photos/*.webp.b64', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const byName = Object.fromEntries(
  Object.entries(masters).map(([path, b64]) => [path.split('/').pop()!.replace('.webp.b64', ''), b64]),
);

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(byName).flatMap((name) => PHOTO_WIDTHS.map((w) => ({ params: { file: `${name}-${w}.webp` }, props: { name, w } })));

export const GET: APIRoute = async ({ props }) => {
  const { name, w } = props as { name: string; w: number };
  const master = Buffer.from(byName[name].trim(), 'base64');
  const out = w >= 1600 ? master : await sharp(master).resize({ width: w }).webp({ quality: 66, effort: 6 }).toBuffer();
  return new Response(new Uint8Array(out), { headers: { 'Content-Type': 'image/webp' } });
};
