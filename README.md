# Mohamed Ayman — Portfolio

Bilingual personal portfolio built with the Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

## Update portfolio content

- `config/site.ts`: name, role, location, email, portrait path, CV path, and availability.
- `data/projects.ts`: project cards, bilingual titles and descriptions, ordering, technologies, demos, and repositories.
- `data/services.ts`: service cards, bilingual descriptions, tags, and icons.
- `data/skills.ts`: technology names, categories, and icon identifiers.
- `messages/en.json` and `messages/ar.json`: section headings, buttons, and other interface copy.
- `data/navigation.ts`: section order and IDs; localized labels are in the message files.
- `data/social-links.ts`: social names, URLs, and icon identifiers.
- `config/icons.tsx`: stable mappings for interface and section icons.

Add or edit projects, services, and skills in their matching `data/` file; each list is rendered from its data objects. Project and service text includes both English and Arabic copy.

The contact form validates the fields and opens the visitor's email app using `config/site.ts`. It does not send form data to a server.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin to enable the canonical URL and a populated sitemap. On Vercel, `VERCEL_URL` is used as a fallback. The project has no confirmed production domain or social preview image configured, so neither is fabricated.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
