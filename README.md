# Jouw Walden-project

Dit project is gegenereerd door [Walden AI](https://walden-ai.nl). Het is een volledig Next.js 15-project — van jou om te lezen, bewerken, forken en overal te deployen. Na generatie zit niets achter een slot van Walden.

## Wat zit erin

```
app/         Next.js App Router pagina's en API-routes
components/  React-componenten
database/    Supabase-migraties (als je een database hebt gekoppeld)
public/      Statische bestanden
__tests__/   Jest-tests
```

Standaard Next.js — geen propriëtaire buildstap, geen verborgen runtime, geen Walden-afhankelijkheid. Als je `next dev` kunt draaien, kun je dit draaien.

## Aan de slag

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Overige scripts: `npm run build`, `npm test`, `npm run lint`, `npm run type-check`, `npm run pre-deploy`.

## Beveiligingsstandaarden

Deze zijn standaard ingebouwd zodat je ze niet zelf hoeft in te richten:

- **`react/no-danger` lint-regel** — `dangerouslySetInnerHTML` is standaard verboden. AI-gegenereerde apps renderen meestal externe data; ruwe HTML-injectie is bijna nooit intentioneel. Als je een echte reden hebt, schakel het per bestand uit in `eslint.config.mjs`.
- **HttpOnly cookies voor auth-tokens** — elke OAuth-token die Walden configureert (Supabase, GitHub, etc.) wordt opgeslagen als `HttpOnly`, `SameSite=Lax`, `Secure` in productie. JavaScript op de pagina kan het niet uitlezen, dus een XSS-bug kan de token niet lekken.
- **Supabase RLS-first patronen** — wanneer Dana (Walden's data engineer) gebruikerstabellen aanmaakt, schakelt ze Row-Level Security in met policies op `auth.uid()` standaard. Publieke anon-toegang is opt-in, niet de default.
- **Migraties zijn append-only** — elke schemawijziging die Dana toepast staat in `database/migrations/<timestamp>_<naam>.sql`. Het Supabase-project is de live staat; de migratiebestanden zijn je versiebeheerde geschiedenis.

## Hoe Walden dit heeft gebouwd

Walden is een multi-agent systeem. Een orchestrator routeert je verzoeken naar specialisten:

- **Dex** schrijft applicatiecode (componenten, routes, logica).
- **Dana** beheert de database (Supabase-migraties, RLS, types).
- **Derik** debugt fouten.
- **Didi** handelt design en styling af.
- **Sam** optimaliseert voor zoekmachines (SEO, meta-tags, structured data).

Elke specialist heeft een beperkt werkgebied — Dana kan bijvoorbeeld alleen schrijven naar `database/migrations/`. Daarom heeft het project een schone scheiding tussen code en schema, en daarom staan migraties nooit inline in applicatiebestanden.

## Bestandsconventies

- **`database/migrations/*.sql`** — schemageschiedenis. Bewerk nooit toegepaste migraties; voeg een nieuwe toe.
- **`types/database.ts`** — TypeScript-types gegenereerd vanuit je live Supabase-schema. Regenereer na elke migratie via Supabase's `generate_typescript_types`.
- **`.env.local`** — secrets en Supabase-URL. Wordt niet gecommit.

## Next.js-versiestrategie

Dit project gebruikt twee Next.js-versies — **met opzet**:

- **`package.json`** bevat `next: 15.5.15` — de CVE-gepatchte versie voor productie-deployments (Vercel).
- **`package-lock.json`** bevat `next: 15.4.10` — de WebContainer-compatibele versie voor de in-browser preview.

**Waarom?** Next.js 15.5+ werkt niet in StackBlitz WebContainer (bekende upstream-bugs). Versie 15.4.10 is de nieuwste die in de browser draait. Bij deployment op Vercel negeert npm de lockfile-versie en installeert 15.5.15 uit package.json — volledig gepatcht, geen beveiligingsrisico's.

Bij het heruploaden naar Walden AI wordt de versie automatisch teruggezet naar 15.4.10 voor WebContainer-compatibiliteit.

## Dit project bewerken

Open het in elke editor. Push naar GitHub. Deploy naar Vercel, Netlify, Cloudflare, je eigen server — overal waar Next.js draait.

Wil je Walden blijven gebruiken om het uit te breiden? Open het project gewoon opnieuw in Walden. Zo niet, dan ben je nergens aan gebonden.

## Meer informatie

- **FAQ** — veelgestelde vragen over gegenereerde projecten, facturering en limieten.
- **Next.js docs** — [https://nextjs.org/docs](https://nextjs.org/docs) voor alles wat niet Walden-specifiek is.
