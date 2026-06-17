# Admin CMS Folder

This folder contains the protected CMS.

## Layout

- `layout.tsx`: protected admin shell and navigation.
- `page.tsx`: admin dashboard.
- `actions.ts`: server actions for saving, deleting, uploading, and status changes.
- `_components/`: shared admin UI pieces.

## Modules

- `company/`: company profile and contact details.
- `services/`: public service cards.
- `materials/`: material chips/streams.
- `projects/`: project showcase content and project images.
- `testimonials/`: public testimonials.
- `documents/`: guided document workflow for company-level document holders and existing project documents, including search, layered sorting, visible document links in review, detail review, edit, replace, and delete controls.
- `statistics/`: homepage trust strip numbers.
- `inquiries/`: public contact form submissions.

Keep module-specific page layout in each module folder. Keep shared inputs, buttons, and notices in `_components/`.
