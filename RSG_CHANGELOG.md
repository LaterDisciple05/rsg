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

### Professional Animation Pass

- Added a slim scroll progress bar to encourage page completion.
- Added reusable scroll reveal and stagger animation components.
- Applied section reveals to hero, about, services, materials, projects, testimonials, why RSG, and contact.
- Added staggered card entry animations for service cards, material chips, trust facts, contact methods, and fallback trust/project cards.
- Refined the brand intro into a shorter, cleaner, no-blob transition.
- Kept motion subtle and respectful of reduced-motion settings.

## 2026-06-16

### Animation Tuning

- Changed testimonials auto-slide behavior to move right, then smoothly reverse left after the final visible testimonial set.
- Changed projects auto-slide behavior to use the same smoother back-and-forth rhythm.
- Reduced both project and testimonial auto-slide delays to make the page feel more active.
- Changed the navigation underline so it appears only on hover/focus, with no default parked underline.
- Replaced the shared moving navigation underline with per-link hover underlines so About, Services, and every other link behave consistently.
- Changed scroll reveal animations to play once and stay settled, preventing section-edge flicker while scrolling.
- Re-ran `npm run lint` and `npm run build` successfully.
- Confirmed the local website responds successfully at `http://127.0.0.1:3000/`.

### Codebase Maintenance Pass

- Replaced the generic starter README with a Rising Sun Global project guide.
- Added `docs/CODEBASE_GUIDE.md` with the public website, admin CMS, database, assets, uploads, and future-folder map.
- Split shared admin UI helpers from one `_components.tsx` file into the private `app/admin/_components/` folder.
- Added README notes to important folders so future edits are easier to place correctly.
- Added placeholder folder notes for reserved directories that are not used by the running site yet.
- Removed unused default starter SVG assets from `public/`.

### Admin Document Project Uploads

- Added an optional project relationship to CMS documents.
- Added multi-file upload support in the admin Documents section.
- Added a project selector so uploaded documents can be attached to a specific project.
- Added a project document library view that groups uploaded documents by project.
- Kept company-level documents supported for files that do not belong to a project.
- Updated the E2E verification script to cover project document multi-upload.
- Regenerated Prisma and synced the local PostgreSQL schema.
- Refreshed the Prisma development cache key so schema changes are picked up cleanly during local development.

### Project-First Document Management

- Reworked the admin Documents page into a project document center.
- Added a project index so admin can jump directly to a project and see its document count.
- Added a dedicated upload form inside every project document area.
- Made every project's uploaded documents visible under that project with open, edit, replace, and delete controls.
- Kept company-level documents in a separate secondary section.
- Re-ran lint, production build, and the full CMS E2E verification script successfully.

### Guided Document Workflow

- Rebuilt the Documents admin section into a guided workflow.
- First step now asks admin to choose Company-Level Documents or Existing Project Documents.
- Each document area now has Add New and Review Existing options.
- Added company-level document holders so company documents can be grouped, opened, reviewed, edited, and managed cleanly.
- Project document add flow now fetches existing projects of all visibility states and lets admin upload documents into the selected project.
- Review screens now include search plus layered alphabet/date sorting.
- Detail screens show creation date, document lists, edit controls, replace-file controls, and delete controls.
- Updated Prisma with `CompanyDocumentHolder` and a `Document.holder` relation.
- Updated CMS verification to cover company holder creation and project document multi-upload under the new workflow.

### Document Review Visibility

- Added uploaded document links directly inside Review Existing cards for company holders and projects.
- Added an Open details / edit route from each Review Existing card.
- Changed project document uploads to return to the selected project detail screen after saving.
- Extended CMS verification to confirm Review Existing shows and links uploaded documents.

### Hero Scrapyard Background

- Replaced the top hero background with a scrap-metal yard image so the first screen matches the recycling and scrap procurement business more directly.
