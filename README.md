# Rising Sun Global Website and CMS

This is the working codebase for the Rising Sun Global public website and private admin CMS.

The public website is built with Next.js App Router. Content is managed from the admin panel and stored in PostgreSQL through Prisma.

## Quick Start

```bash
npm run dev
```

Open the website at:

```text
http://127.0.0.1:3000/
```

Open the admin login at:

```text
http://127.0.0.1:3000/admin-login
```

## Useful Checks

```bash
npm run lint
npm run build
```

Run these after structure changes, UI changes, admin changes, or database-related changes.

## Important Files

- `app/page.tsx`: public homepage data loading and section order.
- `app/layout.tsx`: site metadata, app shell, and global setup.
- `app/globals.css`: brand colors, global CSS, and Tailwind theme tokens.
- `app/actions.ts`: public enquiry form action.
- `app/admin/actions.ts`: admin CMS create, update, delete, upload, and status actions.
- `lib/prisma.ts`: Prisma database client.
- `lib/auth.ts`: admin login/session helpers.
- `prisma/schema.prisma`: database models for the CMS.
- `RSG_PROJECT_BRAIN.md`: project vision and business rules.
- `RSG_CHANGELOG.md`: running list of important changes.

## Folder Map

- `app/`: Next.js routes, pages, server actions, metadata, and route handlers.
- `app/admin/`: protected admin CMS pages.
- `app/admin/_components/`: reusable admin form controls and page helpers.
- `components/layout/`: public navbar and footer.
- `components/sections/`: public homepage sections and sliders.
- `components/shared/`: shared public site effects/components.
- `components/motion/`: reusable animation helpers.
- `components/ui/`: small reusable UI primitives.
- `lib/`: server utilities such as auth, Prisma, and class-name merging.
- `prisma/`: database schema.
- `public/`: static brand assets served directly by the website.
- `uploads/`: CMS-uploaded files served through the local upload route.
- `scripts/`: verification and maintenance scripts.
- `docs/`: codebase guide and maintenance notes.

## Where To Edit

- Change homepage order or data queries in `app/page.tsx`.
- Change public visual sections in `components/sections/`.
- Change navbar/footer in `components/layout/`.
- Change admin pages in `app/admin/<module>/page.tsx`.
- Change admin save/delete/upload behavior in `app/admin/actions.ts`.
- Change database shape in `prisma/schema.prisma`.
- Change brand-wide CSS in `app/globals.css`.

## Notes

- The generated Prisma client lives in `app/generated/prisma/`. Do not edit generated files by hand.
- Keep admin helper UI inside `app/admin/_components/`.
- Keep real uploaded CMS files inside `uploads/`; keep bundled brand/static assets inside `public/`.
- Use `RSG_CHANGELOG.md` whenever a change is important enough that future work should know about it.
