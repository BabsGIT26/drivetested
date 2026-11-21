/**
 * Build-time Open Graph image (1200x630 PNG) for each guide: brand background, road-lane motif and the
 * category's original illustration. No text is drawn, so it renders identically without system fonts.
 * Uses sharp (installed with Astro as an optional dependency).
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { getCategory } from '../../../site.config';
import { illustrationSvg } from '../../../lib/illustrations';

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((a) => ({ params: { category: a.data.category, slug: a.data.slug } }));
};

export const GET: APIRoute = async ({ params }) => {
  const color = getCategory(params.category!)?.color ?? '#2563eb';
  const art = illustrationSvg(params.category!, { accent: color, label: '' })
    .replace('<svg ', '<svg x="500" y="80" width="620" height="387.5" ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1f3a"/><stop offset="1" stop-color="#12305a"/></linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6"><stop offset="0" stop-color="${color}" stop-opacity=".55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>
    <clipPath id="card"><rect x="500" y="80" width="620" height="387.5" rx="28"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect y="540" width="1200" height="90" fill="#000" opacity=".22"/>
  <path d="M0 585 H1200" stroke="#fbbf24" stroke-width="8" stroke-dasharray="70 50"/>
  <g transform="translate(150 230) scale(1.4)">
    <circle cx="60" cy="60" r="52" fill="none" stroke="#f59e0b" stroke-width="12"/>
    <path d="M36 63 l16 16 l34 -38" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <rect x="492" y="72" width="636" height="403.5" rx="34" fill="#ffffff" opacity=".9"/>
  <rect x="150" y="420" width="170" height="12" rx="6" fill="${color}"/>
  <g clip-path="url(#card)">${art}</g>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
