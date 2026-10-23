# Mohamed Ayman — Portfolio

Bilingual personal portfolio built with the Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

## Update portfolio content

- `config/site.ts`: name, role, location, email, portrait path, CV path, and availability.
- `data/projects.ts`: project IDs, ordering, featured state, technology names, live URLs, and GitHub repositories.
- `messages/en.json` and `messages/ar.json`: all localized content, including each project's title and description.
- `data/skills.ts`: technology names, categories, and icon identifiers.
- `data/navigation.ts`: section order and IDs; localized labels are in the message files.
- `data/social-links.ts`: social names, URLs, and icon identifiers.
- `config/icons.tsx`: stable mappings for interface and section icons.

Project IDs in `data/projects.ts` must have matching entries in both message files. The three current project cards retain the site's existing placeholder content; replace those labels and descriptions with verified project details before publishing. Optional demo and repository URLs are omitted from the UI until configured. No contact email, social URL, or production domain is assumed.

The contact form validates the fields and opens the visitor's email app using `config/site.ts`. It does not send form data to a server.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin to enable the canonical URL and a populated sitemap. On Vercel, `VERCEL_URL` is used as a fallback. The project has no confirmed production domain or social preview image configured, so neither is fabricated.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
