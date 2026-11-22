/**
 * Free stock photos used in hero banners (Unsplash License / Pexels License: free for commercial use, no attribution
 * required; we credit photographers anyway, on each banner and on /photo-credits/).
 *
 * The photos are self-hosted: each master is stored as base64 text in src/photos/<name>.webp.b64 and emitted at build
 * time as /photos/<name>-1600.webp (original) and /photos/<name>-800.webp (resized with sharp)
 * by src/pages/photos/[file].ts.
 *
 * Product cards never use photos: they keep the original illustrations (no Amazon or manufacturer images).
 */

export interface StockPhoto {
  name: string;
  alt: string;
  photographer: string;
  platform: 'Unsplash' | 'Pexels';
  source: string;
  note?: string;
}

export const PHOTOS: Record<string, StockPhoto> = {
  home: {
    name: 'home',
    alt: 'A silver sports coupe driving on an open country road on a sunny day',
    photographer: 'Jonathan Daniels',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/photo-of-gray-coupe-on-road-at-daytime-8-O31ObaVSk',
  },
  'dash-cams-cockpit': {
    name: 'dash-cams-cockpit',
    alt: "A view of a car's dashboard and steering wheel from the driver's seat",
    photographer: 'Luke Miller',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/a-view-of-a-cars-dashboard-from-the-drivers-seat-3xNzTBD-wk0',
  },
  'dash-cams-dashboard': {
    name: 'dash-cams-dashboard',
    alt: 'Close-up of a car dashboard and steering wheel',
    photographer: 'James Frewin',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/a-close-up-of-a-car-dashboard-with-a-steering-wheel-aqnDyFlIAWg',
  },
  'car-interior': {
    name: 'car-interior',
    alt: 'Modern car interior with steering wheel, seats and center console',
    photographer: 'Zack Otto',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/modern-car-interior-with-steering-wheel-and-dashboard-cvOlnS-A02U',
  },
  'tire-inflators': {
    name: 'tire-inflators',
    alt: 'Close-up of a clean sports car wheel and tire',
    photographer: 'Tiago Ferreira',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/a-close-up-of-a-tire-on-a-sports-car-rYYfq0B1zWQ',
  },
  detailing: {
    name: 'detailing',
    alt: 'A person washing a car wheel with a sponge and foam',
    photographer: 'Kaboompics.com',
    platform: 'Pexels',
    source: 'https://www.pexels.com/photo/person-holding-sponge-washing-car-tire-4870664/',
  },
  'jump-starters': {
    name: 'jump-starters',
    alt: 'An open car hood showing a clean modern engine bay and battery',
    photographer: 'Bharat Vishawakarma',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/car-engine-compartment-with-open-hood-4U3UOoAORes',
  },
  organization: {
    name: 'organization',
    alt: 'An open SUV cargo area packed neatly with suitcases',
    photographer: 'Swansway Motor Group',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/a-car-with-a-suitcase-in-the-trunk-IO5qcS7k3mY',
  },
  'vehicle-guides': {
    name: 'vehicle-guides',
    alt: 'An SUV driving along a winding mountain road',
    photographer: 'Nathan Anderson',
    platform: 'Unsplash',
    source: 'https://unsplash.com/photos/black-suv-on-curved-concrete-road-near-mountain-at-daytime-HZuyhXV8J14',
    note: 'License plate blurred by DriveTested.',
  },
};

/** Banner photo per category. */
const CATEGORY_PHOTO: Record<string, string> = {
  'dash-cams': 'dash-cams-dashboard',
  'floor-mats': 'car-interior',
  'seat-covers': 'car-interior',
  'tire-inflators': 'tire-inflators',
  detailing: 'detailing',
  'jump-starters': 'jump-starters',
  organization: 'organization',
  'vehicle-guides': 'vehicle-guides',
};

/** Per-guide overrides (category/slug). */
const ARTICLE_PHOTO: Record<string, string> = {
  'dash-cams/best-front-and-rear': 'dash-cams-cockpit',
};

export function photoForCategory(category: string): StockPhoto {
  return PHOTOS[CATEGORY_PHOTO[category] ?? 'home'];
}
export function photoForArticle(category: string, slug: string): StockPhoto {
  return PHOTOS[ARTICLE_PHOTO[`${category}/${slug}`] ?? CATEGORY_PHOTO[category] ?? 'home'];
}

export const PHOTO_WIDTHS = [800, 1600] as const;
export const PHOTO_SIZE = { width: 1600, height: 900 };
export const photoSrc = (name: string, w: number) => `/photos/${name}-${w}.webp`;
export const photoSrcset = (name: string) => PHOTO_WIDTHS.map((w) => `${photoSrc(name, w)} ${w}w`).join(', ');
export const PHOTO_SIZES = '100vw';
