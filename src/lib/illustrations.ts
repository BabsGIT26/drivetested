/**
 * Original, hand-built SVG illustrations (one per product category).
 * These are generic drawings, NOT pictures of the actual products, and they use no Amazon or manufacturer imagery.
 * Used on category tiles, guide banners, product cards (as a fallback when no real image is set) and OG images.
 */

export type IllustrationKind =
  | 'dash-cams' | 'tire-inflators' | 'jump-starters' | 'floor-mats'
  | 'seat-covers' | 'detailing' | 'organization' | 'vehicle-guides';

/** Accent colors rotated across picks so product cards don't look identical. */
export const PICK_ACCENTS = ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4', '#ec4899'];

/** Human-readable nouns for alt text ("Illustration of a ..."). */
export const ILLUSTRATION_NOUN: Record<IllustrationKind, string> = {
  'dash-cams': 'a front and rear dash cam',
  'tire-inflators': 'a portable tire inflator next to a tire',
  'jump-starters': 'a portable jump starter with clamps',
  'floor-mats': 'an all-weather car floor mat',
  'seat-covers': 'a car seat with a seat cover',
  detailing: 'a car detailing kit with spray bottle and bucket',
  organization: 'a trunk organizer with compartments',
  'vehicle-guides': 'a car',
};

const B = '#1e293b';
const B2 = '#334155';
const D = '#0f172a';
const M = '#94a3b8';

/** Mix a hex color with white (t = 0 keeps the color, 1 = white). */
export function tint(hex: string, t: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => Math.round(c + (255 - c) * t));
  return '#' + ch.map((c) => c.toString(16).padStart(2, '0')).join('');
}

function product(kind: IllustrationKind, A: string): string {
  switch (kind) {
    case 'dash-cams':
      return `
<path d="M40 24 Q160 2 280 24" stroke="${M}" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>
<rect x="148" y="18" width="24" height="26" rx="5" fill="${B2}"/>
<rect x="92" y="40" width="136" height="92" rx="20" fill="${B}"/>
<rect x="104" y="48" width="112" height="7" rx="3.5" fill="${B2}"/>
<circle cx="160" cy="89" r="32" fill="${D}"/>
<circle cx="160" cy="89" r="32" fill="none" stroke="${A}" stroke-width="5"/>
<circle cx="160" cy="89" r="17" fill="#1e3a5f"/>
<circle cx="160" cy="89" r="8" fill="#0b1220"/>
<circle cx="153" cy="81" r="4" fill="#fff" opacity=".75"/>
<circle cx="210" cy="60" r="4.5" fill="#ef4444"/>
<rect x="104" y="117" width="30" height="6" rx="3" fill="${A}" opacity=".85"/>
<path d="M226 120 C246 120 240 136 252 136" stroke="${M}" stroke-width="3" fill="none"/>
<rect x="250" y="120" width="50" height="34" rx="9" fill="${B}"/>
<circle cx="275" cy="137" r="11" fill="${D}" stroke="${A}" stroke-width="3"/>
<circle cx="275" cy="137" r="4" fill="#1e3a5f"/>`;
    case 'tire-inflators':
      return `
<circle cx="232" cy="104" r="62" fill="${D}"/>
<circle cx="232" cy="104" r="57" fill="none" stroke="${B2}" stroke-width="9" stroke-dasharray="7 6"/>
<circle cx="232" cy="104" r="34" fill="#cbd5e1"/>
<circle cx="232" cy="104" r="25" fill="none" stroke="${M}" stroke-width="3"/>
<circle cx="232" cy="104" r="10" fill="${M}"/>
<rect x="228" y="64" width="7" height="12" rx="2" fill="#475569"/>
<path d="M154 124 C192 124 182 70 230 70" stroke="${D}" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect x="62" y="52" width="92" height="114" rx="18" fill="${B}"/>
<rect x="74" y="64" width="68" height="42" rx="7" fill="#0b1220"/>
<rect x="82" y="73" width="50" height="6" rx="3" fill="${A}"/>
<rect x="82" y="83" width="34" height="6" rx="3" fill="${A}" opacity=".7"/>
<rect x="82" y="93" width="44" height="6" rx="3" fill="${A}" opacity=".45"/>
<circle cx="88" cy="126" r="7" fill="${B2}"/>
<circle cx="108" cy="126" r="7" fill="${A}"/>
<circle cx="128" cy="126" r="7" fill="${B2}"/>
<rect x="80" y="146" width="56" height="8" rx="4" fill="#fde68a"/>`;
    case 'jump-starters':
      return `
<path d="M122 62 C74 40 62 104 54 128" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M198 62 C246 40 258 104 266 128" stroke="#111827" stroke-width="6" fill="none" stroke-linecap="round"/>
<g transform="translate(38 124) rotate(-12)"><rect width="30" height="42" rx="6" fill="#dc2626"/><rect x="4" y="32" width="22" height="14" rx="3" fill="#991b1b"/></g>
<g transform="translate(252 118) rotate(12)"><rect width="30" height="42" rx="6" fill="#111827"/><rect x="4" y="32" width="22" height="14" rx="3" fill="#374151"/></g>
<rect x="104" y="44" width="112" height="124" rx="16" fill="${B}"/>
<rect x="116" y="58" width="88" height="34" rx="6" fill="#0b1220"/>
<rect x="124" y="66" width="14" height="18" rx="2" fill="${A}"/>
<rect x="143" y="66" width="14" height="18" rx="2" fill="${A}"/>
<rect x="162" y="66" width="14" height="18" rx="2" fill="${A}"/>
<rect x="181" y="66" width="14" height="18" rx="2" fill="${A}" opacity=".35"/>
<path d="M168 102 l-16 28 h13 l-7 24 l25 -33 h-13 l9 -19z" fill="#f59e0b"/>
<rect x="120" y="154" width="18" height="6" rx="2" fill="${B2}"/>
<rect x="182" y="154" width="18" height="6" rx="2" fill="${B2}"/>`;
    case 'floor-mats': {
      let grooves = '';
      for (let y = 66; y <= 146; y += 13) {
        const l = 114 - ((y - 48) * 28) / 108 + 6;
        const r = 210 + ((y - 48) * 36) / 108 - 6;
        grooves += `<path d="M${l.toFixed(1)} ${y} H${r.toFixed(1)}" stroke="${B2}" stroke-width="3" stroke-linecap="round"/>`;
      }
      return `
<path d="M70 160 L104 40 Q108 30 118 30 L214 30 Q228 30 232 44 L262 160 Q264 172 252 172 L80 172 Q68 172 70 160Z" fill="${B}"/>
<path d="M86 156 L114 48 L210 48 L246 156Z" fill="#273449"/>
${grooves}
<rect x="138" y="52" width="48" height="8" rx="4" fill="${A}"/>
<rect x="150" y="126" width="62" height="22" rx="6" fill="${D}"/>
<path d="M70 160 L104 40" stroke="${A}" stroke-width="3" opacity=".6"/>`;
    }
    case 'seat-covers':
      return `
<rect x="146" y="48" width="6" height="16" fill="${M}"/>
<rect x="168" y="48" width="6" height="16" fill="${M}"/>
<rect x="126" y="16" width="68" height="36" rx="15" fill="${B}"/>
<path d="M104 64 Q160 54 216 64 L224 150 Q160 160 96 150 Z" fill="${B}"/>
<path d="M104 64 L96 150 Q104 152 116 153 L121 67 Z" fill="${A}" opacity=".9"/>
<path d="M216 64 L224 150 Q216 152 204 153 L199 67 Z" fill="${A}" opacity=".9"/>
<path d="M140 74 V146 M160 72 V148 M180 74 V146" stroke="#475569" stroke-dasharray="4 4" stroke-width="2"/>
<path d="M84 150 Q160 140 236 150 L244 176 Q160 188 76 176Z" fill="#273449"/>
<path d="M84 150 Q160 140 236 150 L238 158 Q160 148 82 158Z" fill="${A}"/>`;
    case 'detailing':
      return `
<path d="M182 82 Q225 28 268 82" stroke="${M}" stroke-width="4" fill="none"/>
<path d="M180 86 L270 86 L260 168 Q225 176 190 168Z" fill="${B}"/>
<circle cx="198" cy="80" r="10" fill="#fff"/><circle cx="214" cy="76" r="12" fill="#fff"/><circle cx="232" cy="79" r="10" fill="#fff"/><circle cx="248" cy="81" r="9" fill="#fff"/>
<rect x="174" y="80" width="102" height="12" rx="6" fill="${B2}"/>
<rect x="188" y="112" width="76" height="16" rx="3" fill="${A}" opacity=".9"/>
<rect x="128" y="150" width="74" height="24" rx="6" fill="#fbbf24"/>
<path d="M136 158 H194 M136 166 H190" stroke="#d97706" stroke-width="2"/>
<rect x="90" y="74" width="20" height="20" fill="${B2}"/>
<path d="M76 92 L124 92 L130 170 Q100 178 70 170Z" fill="${A}"/>
<rect x="82" y="118" width="40" height="28" rx="4" fill="#fff" opacity=".85"/>
<path d="M80 54 L128 54 L128 76 L86 76 Z" fill="${B}"/>
<rect x="58" y="58" width="24" height="10" rx="3" fill="${B}"/>
<path d="M112 76 L119 98 L107 98Z" fill="${B2}"/>
<circle cx="46" cy="58" r="3" fill="${A}" opacity=".6"/><circle cx="38" cy="66" r="2.5" fill="${A}" opacity=".5"/><circle cx="42" cy="50" r="2" fill="${A}" opacity=".5"/>`;
    case 'organization':
      return `
<path d="M60 90 L100 60 L270 60 L230 90Z" fill="${D}"/>
<path d="M117 90 L157 60 M173 90 L213 60" stroke="${M}" stroke-width="3"/>
<rect x="80" y="44" width="16" height="40" rx="4" fill="${A}"/>
<path d="M186 76 L203 46 L220 76Z" fill="#f59e0b"/>
<rect x="128" y="56" width="34" height="22" rx="4" fill="#cbd5e1"/>
<path d="M60 90 L230 90 L230 170 L60 170Z" fill="${B}"/>
<path d="M230 90 L270 60 L270 140 L230 170Z" fill="#273449"/>
<rect x="124" y="110" width="42" height="10" rx="5" fill="${D}"/>
<rect x="60" y="142" width="170" height="8" fill="${A}"/>
<path d="M230 142 L270 112 L270 120 L230 150Z" fill="${A}" opacity=".7"/>`;
    default:
      return `
<path d="M50 140 L70 104 Q80 88 100 86 L210 86 Q230 86 244 102 L272 132 Q282 136 282 148 L282 156 L50 156 Z" fill="${B}"/>
<path d="M100 96 L150 96 L150 124 L86 124Z" fill="#cbd5e1"/>
<path d="M160 96 L208 96 Q222 98 232 110 L244 124 L160 124Z" fill="#cbd5e1"/>
<rect x="60" y="134" width="212" height="6" fill="${A}"/>
<circle cx="98" cy="158" r="20" fill="${D}"/><circle cx="98" cy="158" r="8" fill="${M}"/>
<circle cx="236" cy="158" r="20" fill="${D}"/><circle cx="236" cy="158" r="8" fill="${M}"/>`;
  }
}

let counter = 0;

/**
 * Build an illustration as an SVG string (viewBox 320x200).
 * @param label accessible label; pass '' to mark the image decorative.
 */
export function illustrationSvg(kind: string, opts: { accent?: string; label?: string; background?: boolean; slice?: boolean } = {}): string {
  const k = (Object.keys(ILLUSTRATION_NOUN).includes(kind) ? kind : 'vehicle-guides') as IllustrationKind;
  const A = opts.accent ?? PICK_ACCENTS[0];
  const id = `ig${(counter++).toString(36)}`;
  const label = opts.label ?? `Illustration of ${ILLUSTRATION_NOUN[k]}`;
  const a11y = label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true" focusable="false"';
  const bg = opts.background === false ? '' : `
<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint(A, 0.9)}"/><stop offset="1" stop-color="${tint(A, 0.72)}"/></linearGradient></defs>
<rect width="320" height="200" fill="url(#${id})"/>
<circle cx="276" cy="26" r="72" fill="${A}" opacity=".12"/>
<circle cx="26" cy="196" r="58" fill="${A}" opacity=".1"/>
<path d="M0 184 H320" stroke="#0b1f3a" stroke-opacity=".1" stroke-width="16"/>
<path d="M8 184 H312" stroke="#ffffff" stroke-width="3" stroke-dasharray="18 14" opacity=".9"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"${opts.slice ? ' preserveAspectRatio="xMidYMid slice"' : ''} ${a11y}>${label ? `<title>${label}</title>` : ''}${bg}${product(k, A)}</svg>`;
}
