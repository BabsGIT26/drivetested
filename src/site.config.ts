/**
 * DriveTested.com — central site settings.
 *
 * ─────────────────────────────────────────────────────────────
 *  Set your Amazon Associates tracking ID ONCE, right here.
 *  Every Amazon button and link on the site is built from it.
 * ─────────────────────────────────────────────────────────────
 */
export const AMAZON_TAG = 'drivetested-20'; // Your Amazon Associates tracking ID. Confirm it exists in Associates Central > Manage Tracking IDs.

export const SITE = {
  name: 'DriveTested',
  /** Canonical origin. Must match the PRIMARY domain you set in Vercel (www recommended by Vercel). */
  url: 'https://www.drivetested.com',
  tagline: 'Tested car gear, clearly explained',
  description:
    'Independent, plain-English buying guides and reviews for car accessories: jump starters, tire inflators, dash cams, floor mats and more.',
  locale: 'en_US',
  /** TODO OWNER: set up this mailbox (e.g. Namecheap Private Email or email forwarding) or change it. */
  contactEmail: 'hello@drivetested.com',
  /** TODO OWNER: the name readers see as author / editor. */
  author: 'The DriveTested Team',
  ogImage: '/og-default.png',
  twitter: '', // optional, e.g. '@drivetested'
};

/** Amazon marketplace host. Change only if you join a different Amazon store (e.g. amazon.co.uk). */
export const AMAZON_HOST = 'https://www.amazon.com';

/** Build a tagged Amazon product link from an ASIN. */
export function amazonUrl(asin: string): string {
  const url = new URL(`/dp/${encodeURIComponent(asin)}/`, AMAZON_HOST);
  url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}

/** Build a tagged Amazon search link (used for vehicle-specific products that have one ASIN per vehicle). */
export function amazonSearchUrl(query: string): string {
  const url = new URL('/s', AMAZON_HOST);
  url.searchParams.set('k', query);
  url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}

/** Tagged Amazon link for a product: its ASIN page, or a search when the product is vehicle-specific. */
export function productAmazonUrl(p: { asin?: string; amazonSearch?: string }): string {
  if (p.asin) return amazonUrl(p.asin);
  if (p.amazonSearch) return amazonSearchUrl(p.amazonSearch);
  return AMAZON_HOST;
}

/** Add the Associates tag to any Amazon URL (keeps other params; replaces an existing tag). */
export function tagAmazonUrl(href: string): string {
  try {
    const url = new URL(href);
    if (!/(^|\.)amazon\.[a-z.]+$/i.test(url.hostname) && url.hostname !== 'amzn.to') return href;
    if (url.hostname === 'amzn.to') return href; // short links carry their own tag
    url.searchParams.set('tag', AMAZON_TAG);
    return url.toString();
  } catch {
    return href;
  }
}

export const CATEGORIES = [
  {
    slug: 'jump-starters',
    name: 'Jump Starters',
    description: 'Portable lithium and lead-acid jump starters, including models with built-in air compressors.',
  },
  {
    slug: 'tire-inflators',
    name: 'Tire Inflators',
    description: 'Cordless and 12V tire inflators and portable air compressors for cars, trucks and bikes.',
  },
  {
    slug: 'dash-cams',
    name: 'Dash Cams',
    description: 'Front, front-and-rear and cabin dash cams: video quality, parking mode and what actually matters.',
  },
  {
    slug: 'floor-mats',
    name: 'Floor Mats',
    description: 'All-weather and custom-fit floor liners, and how to find mats that really fit your vehicle.',
  },
  {
    slug: 'seat-covers',
    name: 'Seat Covers',
    description: 'Seat covers and protectors for kids, pets, work and daily driving.',
  },
  {
    slug: 'detailing',
    name: 'Detailing',
    description: 'Washing, drying, interior cleaning and paint-care gear for at-home detailing.',
  },
  {
    slug: 'organization',
    name: 'Organization',
    description: 'Trunk organizers, seat-back storage and roadside kits that keep a car tidy and ready.',
  },
  {
    slug: 'vehicle-guides',
    name: 'Vehicle Guides',
    description: 'Accessory guides for specific vehicles and plain-English car-care explainers.',
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
