import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './site.config';

const product = z
  .object({
  /** Stable id used to reference the product inside the article body. */
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  /** Amazon ASIN. The affiliate tag is added automatically from site.config.ts. */
  asin: z.string().regex(/^[A-Z0-9]{10}$/, 'ASIN must be 10 uppercase letters/digits').optional(),
  /**
   * For vehicle-specific products (custom floor liners, custom seat covers) where every vehicle has its own ASIN:
   * an Amazon search query. The button then links to a tagged Amazon search so readers can pick their exact vehicle.
   * Provide either `asin` or `amazonSearch`.
   */
  amazonSearch: z.string().optional(),
  /** Short award label, e.g. "Best overall". */
  award: z.string().optional(),
  bestFor: z.string(),
  /** Key specs as label/value pairs (manufacturer-stated unless noted). */
  specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  /**
   * Owner's hands-on rating out of 10. Leave empty until YOU have tested the product.
   * Product + Review structured data is only emitted when the article has handsOnTested: true
   * AND the product has a rating.
   */
  rating: z.number().min(0).max(10).optional(),
  /**
   * DriveTested research score out of 10 (shown on the page). Based on published independent test results,
   * manufacturer specs, warranty terms and owner-review patterns. NOT a hands-on rating; never emitted as Review markup.
   */
  score: z.number().min(0).max(10).optional(),
  image: z.string().optional(),
  })
  .refine((p) => Boolean(p.asin || p.amazonSearch), { message: 'Each product needs an asin or an amazonSearch query' });

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Optional shorter <title> for search results (falls back to title). */
    seoTitle: z.string().optional(),
    description: z.string().max(170),
    category: z.enum(CATEGORY_SLUGS),
    /** URL segment after the category: /{category}/{slug}/ */
    slug: z.string().regex(/^[a-z0-9-]+$/),
    type: z.enum(['roundup', 'review', 'guide']).default('guide'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    /** Set true ONLY after the owner has personally tested the products in this article. */
    handsOnTested: z.boolean().default(false),
    verdict: z
      .object({
        summary: z.string(),
        picks: z.array(z.object({ label: z.string(), productId: z.string() })).default([]),
      })
      .optional(),
    /** Columns of the comparison table (spec labels to show). */
    compare: z.array(z.string()).optional(),
    products: z.array(product).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
    /** Private notes for the owner. Never rendered on the site. */
    ownerTodo: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
