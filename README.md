# DriveTested.com

Static affiliate review site for car accessories, built with [Astro](https://astro.build) and hosted on Vercel.
Clean, minimal design built for conversion. No client-side JavaScript framework; pages are plain HTML and CSS.

## Quick facts

| What | Where |
| --- | --- |
| Amazon Associates tag (set once, used for every Amazon link) | `src/site.config.ts` → `AMAZON_TAG` (currently `drivetested-20`) |
| Site URL, name, contact email, author | `src/site.config.ts` → `SITE` |
| Categories / navigation | `src/site.config.ts` → `CATEGORIES` |
| Articles (Markdown / MDX) | `src/content/articles/` |
| Article schema (frontmatter fields) | `src/content.config.ts` |
| Colors and fonts | `src/styles/global.css` |
| Owner to-do list | run `npm run todo` |

## Run locally (optional)

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built site
```

## Deploy: GitHub → Vercel → Namecheap

### 1. Create the GitHub repository
1. Go to <https://github.com/new>.
2. Repository name: `drivetested`. Public or Private both work with Vercel.
3. **Don't** add a README, .gitignore or license (this project already has them). Click **Create repository**.

### 2. Upload the files
1. Unzip `drivetested.zip` on your computer.
2. On the new repo page, click **uploading an existing file**.
3. Open the unzipped `drivetested` folder, select **everything inside it** (including `src`, `public`, `scripts`,
   `package.json`, `package-lock.json`, `astro.config.mjs`, `vercel.json`, `tsconfig.json`, `.gitignore`) and drag it onto the page.
   - Upload the *contents*, so `package.json` sits at the top of the repo, not inside a `drivetested/` subfolder.
   - Files starting with a dot (`.gitignore`) are hidden on macOS. Press `Cmd + Shift + .` in Finder to show them.
     It's fine if `.gitignore` is missed; the site still builds.
4. Click **Commit changes**.

### 3. Import into Vercel
1. Go to <https://vercel.com/new> and choose **Import** next to the `drivetested` repo
   (if it isn't listed, click **Adjust GitHub App Permissions** and grant access to it).
2. **Framework Preset: Astro** (auto-detected). Leave the defaults:
   Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`.
3. Click **Deploy**. You'll get a `drivetested-xxxx.vercel.app` URL to check the site.

From now on, every commit to the `main` branch on GitHub redeploys automatically.

### 4. Add the domain in Vercel
1. In the Vercel project: **Settings → Domains → Add**.
2. Add `www.drivetested.com` **and** `drivetested.com`.
3. Make **`www.drivetested.com` the primary domain** and set `drivetested.com` to **redirect** to it (Vercel suggests this
   when you add the apex). The site's canonical URLs, sitemap and Open Graph tags use `https://www.drivetested.com`
   (set in `src/site.config.ts` → `SITE.url`). If you'd rather use the bare domain as primary, change `SITE.url` to match.

### 5. Point Namecheap DNS at Vercel
Namecheap → **Domain List** → **Manage** next to drivetested.com → **Advanced DNS**. Keep Namecheap's nameservers
("Namecheap BasicDNS") and edit the host records:

1. **Delete** any existing records for `@` and `www` that would conflict: the default "URL Redirect Record", the
   parking-page `CNAME` for `www`, and any other `A`/`AAAA` records on `@`. (Leave `MX`/`TXT` email records alone.)
2. Add:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | `@` | The A value Vercel shows in **Settings → Domains** for `drivetested.com`. Usually `76.76.21.21`; newer projects may show `216.198.79.1`. | Automatic |
| CNAME Record | `www` | The CNAME target Vercel shows in **Settings → Domains** for `www.drivetested.com`. It's project-specific, like `d1d4fc829fe7bc7c.vercel-dns-017.com`. Older projects may show `cname.vercel-dns.com`. | Automatic |

**Use the exact values your Vercel dashboard shows.** Vercel assigns the A record IP and CNAME target per project,
and a value copied from another project or an older guide can show "DNS Change Recommended" or "Invalid Configuration".
Vercel doesn't support AAAA (IPv6) records for external DNS, so don't add one.

Sources (Vercel docs):
- [Troubleshooting domains: records for an apex domain and www](https://vercel.com/docs/domains/troubleshooting)
- [Adding & configuring a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Set up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)

DNS usually updates within minutes but can take up to 48 hours. Vercel issues the HTTPS certificate automatically
once the records verify.

### 6. After launch
- Submit `https://www.drivetested.com/sitemap-index.xml` in [Google Search Console](https://search.google.com/search-console)
  (verify ownership with the DNS TXT record method in Namecheap).
- In Amazon Associates Central, add `https://www.drivetested.com` to your account's website list
  (**Account Settings → Edit Your Website and Mobile App List**) and confirm `drivetested-20` exists under **Manage Tracking IDs**.

## Writing new articles

Create `src/content/articles/my-article.mdx` (or `.md`). The URL is `/{category}/{slug}/`.

```yaml
---
title: Best Portable Tire Inflator
description: One or two sentences, max 170 characters, used for search results and social cards.
category: tire-inflators        # one of the slugs in CATEGORIES
slug: best-portable             # → /tire-inflators/best-portable/
type: roundup                   # roundup | review | guide
pubDate: 2026-12-01
updatedDate: 2026-12-05         # optional
draft: false                    # true = hidden from production build
handsOnTested: false            # set true ONLY after you've personally tested the products
verdict:                        # optional box at the top with "Check price" buttons
  summary: ...
  picks:
    - { label: Best overall, productId: some-id }
compare: ["Max pressure", "Battery"]   # optional comparison-table columns (must match spec labels)
products:
  - id: some-id
    name: Brand Model
    brand: Brand
    asin: B0XXXXXXXX            # 10-character Amazon ASIN; tag is added automatically
    award: Best overall
    bestFor: Who it's for
    specs: [{ label: "Max pressure", value: "150 PSI" }]   # quote values that contain commas
    pros: [...]
    cons: [...]
    rating: 8.5                 # optional, 0–10; only used when handsOnTested is true
faq: [{ q: ..., a: ... }]
sources: [{ title: ..., url: https://... }]
ownerTodo: ["private notes, never shown on the site"]
---
import Pick from '../../components/mdx/Pick.astro';
import Callout from '../../components/mdx/Callout.astro';

Intro text…

<Pick id="some-id" products={frontmatter.products} rank={1}>
Your write-up for this product.
</Pick>

{/* Comments like this are stripped from the public page. Use them for TODO notes. */}
```

For a one-off Amazon link inside text, use `<AmazonButton asin="B0XXXXXXXX" />`
(`import AmazonButton from '../../components/AmazonButton.astro'`). Every affiliate link gets
`rel="sponsored nofollow noopener"` and opens in a new tab.

## Honesty and compliance rules built in
- **No prices on pages.** Amazon prices change constantly; the red **Check price on Amazon** button is the only price touchpoint.
- **Disclosure** appears under each article title, before the first affiliate link, plus in the footer and on `/affiliate-disclosure/`,
  with Amazon's required statement: *"As an Amazon Associate I earn from qualifying purchases."*
- **Structured data:** Article, BreadcrumbList and ItemList are always emitted. Product/Review markup is emitted **only** when
  an article has `handsOnTested: true` and a product has a `rating`, so the site never claims reviews it hasn't done.
- **Images:** don't hotlink or download Amazon product photos. Use your own photos, or Amazon's approved tools (SiteStripe / Product Advertising API).
- Run `npm run todo` before launch to see everything still marked for you to confirm.

## SEO features
Per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards (`public/og-default.png`), JSON-LD,
automatic sitemap (`/sitemap-index.xml`, empty categories excluded), `robots.txt`, clean trailing-slash URLs,
self-hosted fonts (Inter and Newsreader via Fontsource) with preloading, and long-cache headers for assets (`vercel.json`).
