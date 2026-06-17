# Components Folder

Reusable UI for the public website lives here.

## Structure

- `layout/`: site-wide public layout pieces such as navbar and footer.
- `sections/`: homepage sections in the same order used by `app/page.tsx`.
- `shared/`: shared public site effects/components.
- `motion/`: reusable animation helpers.
- `ui/`: small generic UI primitives.

Keep public-facing design components out of `app/admin/`. Admin-only UI belongs in `app/admin/_components/`.
