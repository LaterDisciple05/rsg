# Codebase Guide

This guide explains how the project is organized and where future changes should go.

## Main Idea

The project has three major areas:

1. Public website
2. Private admin CMS
3. Database and upload layer

The public website reads CMS data from PostgreSQL. The admin panel writes CMS data to PostgreSQL. Uploaded files are saved under `uploads/` and served through the app route at `app/uploads/[...slug]/route.ts`.

## Public Website

Entry point:

- `app/page.tsx`

Public layout and sections:

- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`
- `components/sections/hero.tsx`
- `components/sections/trust-strip.tsx`
- `components/sections/about.tsx`
- `components/sections/services.tsx`
- `components/sections/materials.tsx`
- `components/sections/projects.tsx`
- `components/sections/project-slider.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/testimonial-slider.tsx`
- `components/sections/why-choose.tsx`
- `components/sections/contact-cta.tsx`

Shared public components:

- `components/shared/brand-intro.tsx`
- `components/shared/scroll-progress.tsx`
- `components/motion/reveal.tsx`
- `components/ui/container.tsx`

Use this rule of thumb:

- If it is visible on the public homepage, it belongs in `components/sections/`, `components/layout/`, `components/shared/`, or `components/ui/`.
- If it changes which CMS data appears on the public homepage, edit `app/page.tsx`.

## Admin CMS

Admin entry points:

- `app/admin-login/page.tsx`
- `app/admin/page.tsx`
- `app/admin/layout.tsx`

Admin modules:

- `app/admin/company/page.tsx`
- `app/admin/services/page.tsx`
- `app/admin/materials/page.tsx`
- `app/admin/projects/page.tsx`
- `app/admin/testimonials/page.tsx`
- `app/admin/documents/page.tsx`
- `app/admin/statistics/page.tsx`
- `app/admin/inquiries/page.tsx`

Admin shared UI:

- `app/admin/_components/feedback.tsx`
- `app/admin/_components/form-controls.tsx`
- `app/admin/_components/page-intro.tsx`
- `app/admin/_components/index.ts`

Admin behavior:

- `app/admin/actions.ts`
- `app/admin-login/actions.ts`
- `lib/auth.ts`

Use this rule of thumb:

- If an admin page needs a form field, button, or notice, add it to `app/admin/_components/`.
- If an admin page saves, deletes, uploads, or changes status, the behavior belongs in `app/admin/actions.ts`.
- If it is about login/session protection, use `lib/auth.ts`.
- Documents are managed from `app/admin/documents/page.tsx`.
- Company-level documents use `CompanyDocumentHolder` and `Document.holder`.
- Existing project documents use `Project.documents` and `Document.project`.
- The Documents admin route is a guided workflow: choose document area, choose add/review, then open holder/project detail.
- Review Existing screens show the uploaded document links directly, plus a route to detail/edit.

## Database

Database schema:

- `prisma/schema.prisma`

Prisma client wrapper:

- `lib/prisma.ts`

Generated Prisma client:

- `app/generated/prisma/`

Do not edit generated Prisma files manually. Update `prisma/schema.prisma`, then regenerate through the Prisma workflow.

## Assets And Uploads

Bundled static assets:

- `public/rsg_logo2.png`
- `public/rsg_front.jpeg`
- `public/rsg_back.jpeg`

CMS uploads:

- `uploads/projects/`
- `uploads/documents/`
- `uploads/company/`
- `uploads/testimonials/`
- `uploads/temp/`

Use this rule of thumb:

- Logo, visiting-card images, and permanent brand assets go in `public/`.
- Files uploaded from the CMS go in `uploads/`.

## Placeholder Folders

The following folders are reserved for future growth:

- `config/`
- `constants/`
- `features/`
- `hooks/`
- `services/`
- `styles/`
- `types/`

They are intentionally empty right now except for `.gitkeep`. Do not add code to them unless the project genuinely needs that category.

## Change Safety Checklist

Before calling a structure cleanup done:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Check that route imports still resolve.
4. Confirm no visible layout, text, or animation behavior changed unless that was requested.
