# Rising Sun Global Change Log

This file records important project changes so future chats, developers, and your future self can understand what changed and why.

## 2026-06-14

### Website Foundation

- Reworked the app shell in `app/layout.tsx`.
- Removed the Google font dependency so production builds work without internet access.
- Added stronger SEO metadata for Rising Sun Global, including keywords, Open Graph data, Twitter card data, and robots settings.
- Connected the full homepage flow in `app/page.tsx`.

### Visual Design

- Built a brand color system in `app/globals.css` using the company logo and visiting card direction.
- Replaced the generic starter look with a premium industrial corporate visual direction.
- Rebuilt the navbar, hero, footer, about, services, industries, projects, testimonials, and contact sections.
- Used the actual RSG visiting-card assets from `public/`.

### Homepage Content

- Added business-focused sections: hero, about, services, industries, projects, testimonials, contact director, and footer.
- Kept public copy professional and avoided fake case studies, fake testimonials, or forced proof.
- Made WhatsApp, phone, email, and LinkedIn contact routes available.
- Kept admin access out of public navigation, matching the private route philosophy.

### SEO

- Added `app/robots.ts`.
- Added `app/sitemap.ts`.
- Added JSON-LD organization structured data to the homepage.

### CMS Foundation

- Expanded `prisma/schema.prisma` into a CMS-ready database foundation.
- Added models for company profile, countries, services, industries, projects, images, documents, testimonials, statistics, and inquiries.
- Added public/private visibility controls for future CMS content.
- Kept fields optional where practical so the future admin panel does not force fake data.

### Verification

- `npm run lint` passed.
- `npm run build` passed.
- `npx prisma validate` passed.
- Local homepage served successfully on `http://127.0.0.1:3000`.

### Second Polish Pass

- Increased the RSG logo size in the navbar and footer.
- Added a visible hero logo lockup so the brand is stronger in the first viewport.
- Added a trust strip below the hero using the company's core visiting-card positioning.
- Repaired a footer text-encoding issue.
- Re-ran `npm run lint`, `npm run build`, and `npx prisma validate` successfully after the polish pass.

### Reference-Led Layout Revision

- Reviewed the public structure of `https://www.iscrapgroup.com.au/` as a usefulness reference, without copying its design.
- Removed the hero logo lockup because it made the hero feel cluttered.
- Kept logo sizing improvements only in the navbar and footer.
- Added a top contact/info bar with location, email, and phone.
- Simplified the hero around the business offer and direct actions.
- Reworked the first section into three practical service cards: buying scrap, recovering metal, and export supply.
- Added a materials section so visitors can quickly understand what scrap streams RSG can discuss.
- Removed premature projects/testimonials from the homepage flow for now because there is no real public content yet.
- Added a practical `Why RSG` section focused on direct communication, Australia/India presence, discretion, and enquiry readiness.

### Hero Background Revision

- Removed the visiting-card image from the hero background.
- Replaced it with a clean navy industrial grid treatment.
- Added a right-side business summary panel so the hero is more useful and less image-dependent.

### Minimal Hero and Repetition Cleanup

- Removed contact actions, phone details, and the right-side contact-style panel from the hero.
- Kept the hero focused on one brand statement and two navigation actions only.
- Compressed the first white summary strip into short facts instead of paragraph cards.
- Reduced the services section from six cards to four clearer service areas.
- Removed public design-process wording from the services section.

### Admin CMS Build

- Added secret admin login route at `/admin-login`.
- Added cookie-based admin session handling.
- Added protected `/admin` dashboard and admin layout.
- Added working CMS modules for company profile, services, materials, projects, testimonials, documents, statistics, and inquiries.
- Added public enquiry form that stores submissions in the CMS inquiries table.
- Used the installed local PostgreSQL `psql` tool as the working data layer because the Prisma PostgreSQL adapter package could not be installed in this environment.
