# Responsive Card System — Claude Code prompts (stegvis)

Bygger vidare på Adrians Figma-guidelines och Storybook `Card`/`CardSection`-dokumentation för `@eg/design-system`. Målet: gör Customer-modulens statiska kort dynamiskt skalbara.

## Verklig kontext (bekräftad i repot `Customer`, en Figma Make-prototyp)

- **Ingen åtkomst till `@eg/design-system`** — varken skrivrätt till Adrians repo eller möjlighet att installera paketet här. All `Card`/`CardSection`-referens från Storybook är alltså **spec att efterlikna**, inte kod att importera.
- Prototypens kort byggs idag av en **lokal shadcn/Tailwind-komponent**: `src/app/components/ui/card.tsx` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` — vanliga `div`/`h4`/`p` med Tailwind-klasser). Ingen `CardSection`-motsvarighet finns än.
- Fälten inuti korten är handbyggda i `src/app/components/customer/sharedFields.tsx` (`SectionHeader`, `FieldLabel`, `InputField`, `SelectField`, `ReadOnlyField`, `CheckboxField`, `DateField`, samt `DETAIL_CARD_CLASS = "shadow-none"`), med hårdkodade pixelvärden och färger — inte shadcns egna `ui/input.tsx`/`ui/label.tsx`.
- Huvudfilen att utgå från: `src/app/components/customer/CustomerDetail.tsx`.
- Terminologin **"Private customer"** och **"Business customer"** finns redan i mockdatan (`customerType`-fältet) — använd exakt de strängarna överallt, aldrig "B2B"/"B2C".
- Projektet kör **Tailwind v4** (`@tailwindcss/vite`), som har inbyggt stöd för container queries (`@container`, `@min-[Npx]:`-varianter). Använd det — ingen anledning att skriva egen CSS för container queries.
- MUI (`@mui/material`) finns som beroende men används inte av Customer-kortens nuvarande kod — ignorera det för det här arbetet.

**Konsekvens:** vi bygger en lokal `CardSection`-komponent (och utökar `Card`) i det här repot, som **beteendemässigt matchar** Adrians dokumenterade kontrakt (divider ovanför varje sektion utom den första, `columns`-prop för jämn delning, `flush`-prop för kant-till-kant-innehåll, `title`/`action`/`headerDivider` på headernivå) men implementeras med Tailwind v4 i den stil repot redan använder. Kommentera tydligt i koden att detta är en prototyp-implementation tänkt att lyftas in i `@eg/design-system` av Adrians team senare — inte permanent produktionskod för designsystemet.

**Så här används filen:** kör ett prompt-block i taget i Claude Code, i samma sammanhängande session. Verifiera i webbläsaren innan du går vidare till nästa. Prompt 0 är en kort kickoff du kör allra först.

---

## Bakgrund att inkludera i varje prompt (redan ifylld nedan)

- Breakpoints är **container queries**, inte media queries — korten ska reagera på sin egen tillgängliga bredd (contentytan till höger om sidopanelen), oberoende av webbläsarfönstret. Bekräftat direkt av Adrian.
- Riktiga tokens (`theme.eg.breakpoint.container.*` i Adrians system — återskapa samma pixelvärden lokalt): `split` 800px, `tile-row-collapse` 708px, `tile-row-collapse-2` 643px, `tile-matrix-collapse` 1088px.
- Responsiviteten sker på **två nivåer**, båda behövs:
  1. **Rad-nivå** — hur många kort som ligger sida vid sida i en rad.
  2. **Fält-nivå, inuti ett enskilt kort** — en sektions egna fält-kolumner måste själva kollapsa till en kolumn när kortet blir tillräckligt smalt, oavsett hur många kort som ligger i raden. Inget bekräftat exakt tröskelvärde för detta — implementera en rimlig container-brytpunkt och flagga den som något att verifiera visuellt, inte facit.
- Regler att efterlikna från Storybook: aldrig nästla `Card` i `Card`; använd `CardSection` för varje repeterbart block även ett enda; `flush` för grid/tabellinnehåll utan padding; `columns` täcker bara jämna delningar — en ojämn split (t.ex. 8/4) komponeras manuellt med flexbox/grid inuti en vanlig `CardSection`.

---

## Prompt 0 — Kickoff (kör detta först, inga kodändringar)

```
I'm going to hand you a series of prompts, one at a time, to build a responsive card layout system for the Customer module in this repo (a Figma Make–generated prototype: React + Vite + Tailwind v4).

I just added guidelines/claude-code-prompts-responsive-cards.md to this repo — it contains all of these prompts plus the background context. It's a real, permanent part of the project docs (not a scratch file), and it will be committed and pushed to GitHub along with the rest of the work, so include it in commits as normal.

Important context before we start:
- There is no access to the real @eg/design-system package here — it's not installed and can't be. Any reference I make to "Card"/"CardSection" behavior from that system's Storybook docs is a spec to replicate locally, not something to import.
- The current card implementation is local: src/app/components/ui/card.tsx (Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter — plain divs with Tailwind classes). There is no CardSection concept yet.
- Card field content is hand-built in src/app/components/customer/sharedFields.tsx (SectionHeader, FieldLabel, InputField, SelectField, ReadOnlyField, CheckboxField, DateField, DETAIL_CARD_CLASS).
- The main file we'll be editing is src/app/components/customer/CustomerDetail.tsx.
- Use "Private customer" and "Business customer" as terminology everywhere (already used correctly in the mock data's customerType field) — never "B2B"/"B2C".
- Tailwind v4 is available and has native container query support (@container, @min-[Npx]: variants) — use that rather than hand-rolled CSS.

Read through ui/card.tsx, sharedFields.tsx, and CustomerDetail.tsx now so you understand the current structure. Don't change anything yet — just confirm back to me what you found and that you're ready for step 1.
```

---

## Prompt 1 — Foundation: lokal responsiv `CardSection` + `Card`-utökning

```
Build a local CardSection component (doesn't exist yet) alongside the existing Card family in src/app/components/ui/card.tsx, matching this behavioral contract (documented in a Storybook for a design system component we don't have code access to, but should replicate):

- CardSection is a repeatable content block. Every CardSection after the first draws a divider above itself; the Card's own border already separates the first section from the page, so it stays undivided.
- CardSection takes an optional `columns` prop for an even N-column split (own children laid out as a grid with consistent gap).
- CardSection takes an optional `flush` prop that zeroes its own padding, for content that manages its own edges (e.g. a data table). Not combinable with `columns`.
- An uneven split (e.g. an 8/4 or 2:1 ratio) is not covered by `columns` — that's composed manually with flexbox/grid directly inside a plain CardSection.
- Extend Card itself to support title, action (top-right slot), and headerDivider, matching how the current CardHeader/CardTitle/CardAction sub-components already compose, so both the sub-component style and a simpler title/action prop shorthand are available — use your judgement on which fits this codebase's existing conventions best, but don't break existing usage of Card/CardHeader/CardTitle/CardAction/CardContent/CardFooter elsewhere in the app.

On top of that static structure, add responsive behavior using Tailwind v4 container queries (the card/section needs its own container context, independent of viewport width):

1. Row-level "Auto" tiles: when multiple CardSections (or cards) sit side by side as an even N-column row, step down the column count as available width narrows — collapse at two thresholds (around 708px and 643px container width, for a 3→2→1 step-down), and support the full column count above roughly 1088px.
2. Row-level "Split": a row that renders as a single stacked column below 800px container width, and switches to an asymmetric multi-column layout (e.g. 8/4) at and above 800px. Compose this manually (flex/grid), not through the `columns` prop.
3. Field-level: a CardSection's own `columns` grid (e.g. two fields side by side) must independently collapse to one column when the card itself gets too narrow — pick a sensible threshold and clearly comment it as a value to visually verify, not a confirmed spec number.

Also implement the general rule: within any row, however many cards/sections are actually rendered (some may be conditionally absent), the remaining ones expand evenly to fill the row — no reserved empty space.

Add clear code comments marking this whole CardSection addition and its responsive behavior as a prototype implementation intended to be handed off to the design system team for proper implementation in @eg/design-system — not final production code for that package.

Do not touch CustomerDetail.tsx or any other page in this step. Build and demonstrate this in isolation (e.g. a small local demo/story you can view directly, or temporarily render one in a scratch route) so it can be visually verified before anything real depends on it.
```

**Verifiera innan du går vidare:** testa demo-vyn i olika bredder — bekräfta att tile-raden kollapsar vid rätt ungefärliga trösklar, split-raden växlar vid 800px, och fälten inuti ett enskilt kort staplas när kortet blir smalt oavsett radens övriga bredd.

---

## Prompt 2 — Migrera Private customer-vyn till `CardSection` (endast struktur)

```
In src/app/components/customer/CustomerDetail.tsx, migrate the Private customer detail view ("Details" tab) to use the new CardSection component from step 1 — structural only, matching today's exact static visual layout (same column counts, same spacing, same section groupings). Do not activate any responsive behavior decisions yet beyond what CardSection already does by default; the goal here is only to confirm the visual result is identical to the current layout after switching to CardSection.

Rows to migrate: header card, Contact card, Credit + Customer card row, Address + Notes row, Relationships grid. Keep using the existing field components from sharedFields.tsx (InputField, SelectField, ReadOnlyField, etc.) inside the new CardSection wrappers — don't rebuild those.
```

**Verifiera:** jämför skärmdump före/efter migrering på samma bredd — layouten ska se identisk ut.

---

## Prompt 3 — Kort som kan tas bort/läggas till: expand-to-fill

```
Using the responsive CardSection primitive from step 1, wire the Credit + Customer card row (migrated in step 2) up to the "Auto" row-level behavior: when only one of the two cards is present, it takes the full row width at any container size; when both are present, they split evenly per the responsive rule.

This should work purely from which CardSection children are rendered — don't add per-card width logic; the row primitive should handle 1..N children generically, since the same behavior is reused for the Address row in step 4.
```

**Verifiera:** växla Credit-kortet av/på (eller mocka det) och bekräfta att Customer card expanderar/krymper korrekt vid alla containerbredder.

---

## Prompt 4 — Adressraden (Business customer): 1–3 kort, add/edit, read-only

```
Migrate the Business customer detail view's Address section in CustomerDetail.tsx to CardSection, using the Auto tile row primitive from step 1, with these rules:

- Address, Delivery address, Invoice address. Address is always present and required. Delivery address and Invoice address are optional, added one at a time, up to a maximum of 3 cards total. The row uses the expand-to-fill behavior from step 3 — however many of the 3 are present, they split evenly.

- The Address card's header has a "..." (more actions) menu with two items: "Add address" and "Edit". "Add address" appends a new card with a type selector limited to whichever of Delivery address / Invoice address is not yet in use. Each added card gets its own "..." menu to change type or delete.

- The delete (trash) action is only visible while a card is in edit mode — never on a saved/view-mode card.

- Organisation data can be manually created or imported from a third party (D&B). When D&B-sourced, inherited fields render read-only (plain text, no input borders) with an explicit "Edit" action via the same "..." menu — reuse whatever read-only convention already exists elsewhere in this codebase for externally-sourced data, don't invent a new one; if none exists yet, build a minimal one and flag it as such.

- If D&B later supplies a value for a field that was manually added, the D&B value overwrites the manual one — flag whether this needs new logic or already exists in the mock data layer.

- Adding/editing an address here conceptually writes to the Organisation record, not the Customer record — reflect this with a small secondary label under the add action (similar in spirit to an "Updated by external party" note).
```

**Verifiera:** testa med 1, 2 och 3 adresser, testa D&B-importerad organisation (read-only + Edit), testa att en manuellt tillagd adress skrivs över om D&B senare skickar samma typ.

---

## Prompt 5 — Split-rad (Organisation + Notes, Business customer)

```
Implement the Business customer "Organisation + Notes" row using the split-row primitive from step 1: single stacked column below 800px container width, equal 50/50 two-column layout (Organisation and Notes the same width) at and above 800px.

If either card is hidden/removed, the remaining single card takes the full row width rather than leaving empty space.
```

**Rättelse (efter visuell verifiering):** ursprungligen specades detta som en asymmetrisk 8/4-split (Organisation bredare), men efter att se det i browser bestämde vi att 50/50 ser rätt ut för den här raden. `container.split` (800px) stödjer båda varianterna enligt Adrians dokumentation ("symmetric (6/6) or uneven (8/4) depending on the layout") — vi valde 6/6 här.

**Verifiera:** ändra containerbredden runt 800px-gränsen och bekräfta stack→split-övergången, samt att raden fungerar med bara ett av de två korten närvarande.

---

## Prompt 6 — Hela sidan: Business customer + Private customer

```
Assemble the full CustomerDetail.tsx "Details" tab for both customer types using the primitives from steps 1–5. Use "Private customer" and "Business customer" throughout — matching the existing customerType mock data values exactly.

Business customer row composition (top to bottom):
1. Header card — full width, single CardSection
2. Organisation + Notes — split row (step 5)
3. Address / Delivery address / Invoice address — Auto tile row (step 4), 1–3 cards
4. Contact person(s) (data grid) — full width, flush CardSection

Private customer row composition (top to bottom):
1. Header card — full width
2. Contact (name, email, SSN, loyalty fields) — full width
3. Credit + Customer card — Auto tile row (step 3), 2 cards, expand-to-fill
4. Address + Notes — Auto tile row, 2 cards, expand-to-fill
5. Relationships (data grid) — full width, flush CardSection

Every row must independently respond to its own container width per the primitives already built — don't hardcode column counts per page.
```

**Verifiera:** öppna en Business- och en Private-kund, ändra webbläsarfönstrets bredd, bekräfta att varje rad beter sig enligt sitt tilldelade mönster oberoende av de andra.

---

## Prompt 7 — Listvyer (grids) ska vara full bredd

```
The Customers list view, and any other page whose primary content is a data grid inside a card (e.g. Contact person(s), Relationships), should render full width/full screen — exempt from the page's normal capped content max-width. Use a flush CardSection for the grid content, and ensure the containing layout doesn't apply the standard max-width cap to these specific views.

Confirm which layout wrapper currently applies the page max-width, and adjust only for grid-primary views — don't remove the cap globally.
```

**Verifiera:** öppna Customers-listan i ett brett fönster och bekräfta att den fyller hela bredden, medan Customer detail-sidorna fortfarande cappas vid sin max-width.

---

## Efter varje steg

Håll koll på vad Claude Code faktiskt ändrat (diff) innan du går vidare — särskilt steg 0–2, eftersom alla senare steg bygger på dem. Om något inte stämmer med hur Adrians mönster är tänkt, bättre att stanna upp där än att bygga vidare på ett fel antagande.
