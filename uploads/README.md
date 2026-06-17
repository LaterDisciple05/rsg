# CMS Uploads

Files uploaded through the admin CMS are stored here.

The website serves uploaded files through:

```text
app/uploads/[...slug]/route.ts
```

Current upload areas:

- `company/`
- `documents/`
- `projects/`
- `temp/`
- `testimonials/`

Do not put permanent brand assets here. Use `public/` for those.
