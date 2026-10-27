# Conag Agro Soluções — Design System

> _"Jeito sério de tocar fazenda grande."_
> The serious way to run a big farm.

Conag Agro Soluções is a Brazilian agribusiness company that sits at the intersection of **technology, consultancy, education and community** for medium-to-large rural producers. Conag is not "an ERP" and not "a consulting firm" — it positions itself as **the operating system of elite Brazilian agriculture**.

The brand voice is calm, confident, technical and a little institutional. It speaks to farm owners and CFOs who run multi-million-real operations and expect to be addressed as peers, not prospects.

---

## What Conag actually sells

The 2026–2030 strategy deck describes the offering as a single integrated ecosystem built on four pillars:

| Pilar | What it is |
|---|---|
| **Tecnologia** | ERP CONAG — the "fonte da verdade" of the farm (production, finance, fiscal, people). |
| **Consultoria** | CFO-as-a-Service — senior consultants who run monthly governance rituals. |
| **Educação & Comunidade** | "Conag Elite" — quarterly summits at *Morada do Agro*, monthly Boardrooms benchmarking anonymised KPIs across non-competing producers. |
| **Hub Financeiro** | Credit origination: success-fee intermediation between Conag clients and banks/funds (R$ 6 bi potencial). |

The target customer ("ICP-Prime") is a Brazilian agribusiness group with R$ 30–300M annual revenue, going through a generational transition, expansion, or a credit pain — _médios e grandes produtores_.

---

## Sources used to build this design system

Everything in this folder was derived from the two artefacts the user supplied:

1. **`uploads/manual-marca.pdf`** — Brandbook (13 pages, partial). Defines logo, typography names, original brand colours.
2. **`uploads/ecossistema.pdf`** — _Conag 2026–2030: O Ecossistema do Produtor de Elite_ (17 slides). Single best source for tone of voice, slide-layout conventions, and the strategic vocabulary the brand uses internally.
3. **`uploads/Ativo 2.png` / `Ativo 4.png`** — Master logos. Copied to `assets/logo-full.png` and `assets/logo-mark.png`.

Extracted text is preserved at `uploads/manual-marca-text.txt` and `uploads/ecossistema-text.txt` for reference.

There is **no codebase, Figma file, or live product UI** in scope. The website UI kit included here is therefore an _interpretive_ marketing surface, not a recreation of an existing site — flagged again in `ui_kits/website/README.md`.

---

## Index — what's in this folder

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← Claude Code-compatible skill entry
├── colors_and_type.css        ← single source of CSS tokens (colors, type, spacing, motion)
├── assets/
│   ├── logo-full.png          ← horizontal lockup (mark + "conag" + "Agro Soluções")
│   └── logo-mark.png          ← seed-in-circle symbol, square-safe
├── fonts/                     ← (empty — see Typography below)
├── preview/                   ← Design-System-tab cards (one concept per file)
├── slides/                    ← Sample deck templates lifted from the strategy deck
└── ui_kits/
    ├── website/               ← Marketing site components (interpretive)
    └── erp/                   ← ERP CONAG product UI — dashboard, financeiro, fechamento D+5, DRE (interpretive)
```

**The UI-kit screens are exported design-system components.** Each `<Name>.jsx` ships `export function <Name>` with a sibling `<Name>.d.ts`, so consumers reach them via `window.ConagDesignSystem_03850e.<Name>` after loading `_ds_bundle.js` (ERP: `Dashboard`, `Financeiro`, `Fechamento`, `Relatorios`, `Sidebar`, `TopBar` — read `window.ERP_DATA`; Website: `Header`, `Hero`, `Pillars`, `Metrics`, `Method`, `Community`, `CTA`, `Footer` — read `window.ConagData`). Load the matching `data.js` plus `erp.css`/`site.css` alongside the bundle. The `index.html` in each kit folder composes them as a live demo.

Card files in `preview/` are intentionally small and single-concept — the asset name is rendered _outside_ the card by the Design System tab.

---

## Content fundamentals

### Language
Portuguese (pt-BR), business register. **No English** in customer-facing copy except as established loanwords already common in agribusiness (`ROI`, `KPI`, `dashboard`, `pipeline`, `success fee`, `MRR`, `ICP`, `due diligence`, `playbook`).

### Voice & tone
- **Sério, calmo, autoritativo.** No hype. No exclamation marks. No emoji.
- Speaks to **"o produtor"**, **"o sócio"**, **"o decisor"** — never "amigo" or first-name diminutives.
- Prefers the **first-person plural ("nós", "competimos", "entregamos")** when describing Conag, and **third-person singular ("o cliente percebe", "o produtor acessa")** when describing outcomes. Avoids "você" in headlines (used sparingly in body when persuasive).
- Confident about **what Conag is NOT** — the strategy deck literally has an "O Que NÃO Somos" column. This is a brand signature: clarity by negation.
- Quietly elitist. Word choice: _elite, premium, top performers, padrão ouro, criterioso, defensável, exclusivo, blindar._ This is not hidden — it's the value prop.

### Casing
- **Section labels / eyebrows** are uppercase with wide tracking, often spaced out letter-by-letter in the deck (`C O N T E X T O   D E   M E R C A D O`). Recreate via `letter-spacing: 0.18em; text-transform: uppercase;` — do **not** literally insert spaces between letters in the source (kills accessibility).
- **Headlines** use sentence case in Portuguese (only the first word and proper nouns capitalised) — e.g. _"Crescer de 100 para 200 Grupos Premium em 5 Anos"_. Title-case proper-noun phrases like _Conag Elite_, _Morada do Agro_, _Hub Conag_, _Conag Summit_.
- Numerals stay as digits in marketing copy (`90 dias`, `R$ 36M`, `200 grupos`) — written-out numbers feel soft and Conag is never soft about scale.

### Lexicon (use these exact words)
| Use | Avoid |
|---|---|
| Ecossistema integrado | Plataforma |
| CFO as a Service / CFOaaS | Atendimento |
| Hub Financeiro | Fintech |
| Conag Elite, Top Performers | Usuários, clientes (in marketing) |
| Gestão à vista | Relatórios |
| Sprint de Dados, Régua dos 90D | Onboarding |
| Fechamento em D+5 | Fechamento rápido |
| Padrão ouro | Melhor da categoria |
| Defensável, Moat, Fosso | Diferencial |

### Highlight pattern (signature)
Inside running copy, the brand highlights **key value-laden nouns** with the green→teal gradient. The user-supplied notes call out three examples explicitly: _**financiável**_, _**criterioso**_, _**certezas**_. The pattern is: one or two words per paragraph, always abstract qualities or verbs of transformation. Don't gradient verbs of obligation ("precisa", "deve") — only nouns of value.

### Examples (lifted from the deck — feel free to reuse)
- _"Vendemos uma transformação de gestão, não software."_
- _"Do caos de dados à gestão à vista em 90 dias."_
- _"Software pode ser copiado. Uma rede de confiança de 300 líderes, não."_
- _"Visão sem execução é alucinação. Vamos transformar o Agro Brasileiro."_
- _"O Que Não Se Mede, Não Se Gerencia."_

---

## Visual foundations

### Colors

**The primary palette is intentionally tight:**

| Token | Hex | Use |
|---|---|---|
| `--conag-green` | `#3DB54A` | Primary actions, positive states, agriculture/growth metaphors |
| `--conag-teal` | `#00B0A8` | Secondary actions, technology/clarity metaphors, links |
| `--conag-gray-text` | `#8C8C8C` | Secondary text, meta, labels |
| `--conag-gradient` | `#3DB54A → #00B0A8` | **The single most distinctive brand element.** |

> The brandbook (2020-era) lists `#66b540` and `#17b0b5`. The 2026 brand refresh moved to the brighter `#3DB54A` / `#00B0A8`. Use the new values unless you are recreating archival material.

The gradient is **directional and short**: green on the left/leading edge, teal on the trailing edge. Default angle 90° for text highlights and rules; 135° for fills and surfaces. Never reverse it.

Neutrals are agricultural-warm-greys, not blueish. The dark background `#161A17` has a faint green undertone — important; pure black feels wrong against the gradient.

### Typography

Specified in the brandbook:
- **Display:** Quinoa Titling Heavy — geometric titling caps, used for hero numbers, slide titles, the "padrão ouro" punchwords.
- **Body:** Ford Antenna Light — Ford's humanist sans, used for everything else.

**Both are licensed faces we do not have files for.** Substitutions in `colors_and_type.css`:
- Quinoa Titling Heavy → **Archivo Black** (Google) — closest free geometric-heavy display.
- Ford Antenna Light → **Mulish** (Google, weights 300–800) — closest free humanist with the same low x-height feel.

➡ **Please drop the official `.woff2` files into `fonts/`** when you have them; the swap is purely a CSS variable change.

Rules of thumb:
- Display face is for **numbers, slide titles, hero words** — never long-form copy.
- Body face carries everything, including most H3/H4 (semibold/bold weight).
- Avoid italics for emphasis — use the gradient highlight instead.
- Eyebrow labels: 12px, weight 700, tracking `0.18em`, uppercase, in `--conag-teal-700` or `--fg-3`.

### Spacing & layout
- 4-pt scale (`--space-1` = 4px through `--space-24` = 96px).
- Container width 1240px with 24px gutters; narrow text columns at 880px.
- Slides are 1920×1080; never put body type smaller than 24px on a slide.
- Grids prefer **4-column** layouts (echoing the deck's "Quatro Pilares" pattern) and **3-column** for value props (Tecnologia / Capital / Comunidade).

### Backgrounds
- **Default:** white (`#FFFFFF`) with a barely-there `#F7F8F7` page wash for inset cards.
- **Dark sections** (footers, CTAs, contrast cards): `#161A17`, NOT pure black. Logo mark and text-on-dark always sit on this.
- **Gradient fills** are rare — reserved for the hero CTA panel, the singular metric callout, or a divider rule. Never wallpaper an entire screen in the gradient.
- **No textures, no patterns, no hand-drawn illustrations, no farm photography unless supplied.** The brand is corporate-agro, not lifestyle-agro.
- **Full-bleed imagery is allowed** for case-study covers and summit photos. When used, apply a 1-stop protection gradient from `rgba(22,26,23,0.7)` to transparent at the bottom so type stays readable.

### Borders, cards, shadows
- Card corner radius is `--r-sm` (6px) by default — matches the real ERP. Use `--r-lg` (14px) for hero/CTA panels and `--r-pill` for chips, badges, buttons.
- **One-pixel borders** on light grey (`--border` #E3E5E3) — Conag cards are bordered, not floating. Shadows are subtle accents, not the primary affordance.
- **Green left-edge accent on cards IS the brand pattern** (5px green stripe on `kpi`, `erp-step`, `erp-closing-hero`). This is the real ERP's signature card treatment — confirmed against product screenshots. Use it on KPI tiles, checklist rows, and dark "régua" hero panels.
- A **solid-green filled variant** of the same card is reserved for *computed/derived* KPIs (e.g. Sc/Ha figures derived from area × production). Same card shape, green background, white text — never use it for ordinary primary metrics.
- Shadow stack progresses from `--shadow-1` (resting) to `--shadow-4` (modal/raised). `--shadow-brand` is a green-tinted glow used only on the primary CTA hover state and on the hero metric card.

### Motion
- Default easing `cubic-bezier(0.2, 0.6, 0.2, 1)` — a confident standard ease, no bounce.
- Durations: `140ms` for hovers, `220ms` for state changes, `420ms` for entrances.
- **Hover state:** primary buttons darken (`--conag-green-600`) and lift via `--shadow-brand`. Links shift to `--conag-teal-700`. Cards lift one shadow step. No scale-up.
- **Press state:** scale `0.98`, shadow drops one step. No colour shift.
- **Entrances:** 12px upward translate + opacity fade, staggered 60ms.
- Never bounce. Never spring. Conag does not bounce.

### Transparency & blur
- Used sparingly. The one canonical use is a 16px-blur sticky header with `rgba(255,255,255,0.78)` background sitting on top of scrolled content.
- Glass-morphism panels: **no**, unless explicitly part of a hero composition over an image, with a protection blur.

### Layout rules / fixed elements
- The header is **sticky** at the top, 72px tall, blurred when scrolled, with a hairline border below.
- The CTA-final-section sits **before** the footer with breathing room (`--space-24` top/bottom).
- The footer is dark (`#161A17`) and full-width.
- Never put body content closer than `--space-6` to the viewport edge on desktop; `--space-4` on mobile.

---

## Iconography

The brandbook does **not** specify an icon system. The strategy deck uses a small ad-hoc set, lifted verbatim into our writing:

- **Check / cross marks (`✓` / `×`)** — the brand signature for "O Que Somos / O Que Não Somos" tables. Always paired, always in the same row.
- **Numbered pillars** — large display-face numbers (`1.`, `2.`, `3.`, `4.`) as section markers.
- **Lightweight Unicode glyphs** — `⚡`, `⭐`, `⚖`, `〉` appear in the source deck for emphasis. We tolerate these in **internal-facing** decks but recommend replacing them with proper icons in customer-facing surfaces.

**Recommended icon library for new work: [Lucide](https://lucide.dev)** — 1.5px stroke, rounded line caps, geometrically consistent. Matches the calm humanist body type. Load via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="leaf" style="color: var(--conag-green); width: 24px; height: 24px;"></i>
<script>lucide.createIcons();</script>
```

**Sizing:** 16px in dense UI, 20px in body, 24px in section headers, 32–48px in feature blocks. Stroke colour inherits from `currentColor`; backgrounds use a `--conag-green-50` or `--conag-teal-50` circle for feature blocks.

**Do:** use line icons; pair with eyebrow labels; use `leaf`, `sprout`, `bar-chart-3`, `landmark`, `users-round`, `shield-check`, `gauge`, `route` for the Conag concept space.

**Don't:** mix filled and outlined icons; use emoji in customer-facing copy; draw bespoke pictograms inline (the brand isn't illustrative). For the leaf-in-circle logo mark, always use `assets/logo-mark.png` — do not redraw it.

---

## Iteration notes

- ⚠️ Font files for Ford Antenna and Quinoa Titling are not in the project — Mulish and Archivo Black are stand-ins. Please drop the official `.woff2` into `fonts/` to swap.
- ⚠️ No live website / app / Figma was provided, so `ui_kits/website/` is **interpretive**. If a real product UI exists, attach it and we'll align.
- ⚠️ The brandbook PDF is truncated past page 6 (pages 7–13 in the source were blank in the extracted text). If a complete version exists, please share — specifically anything about application examples, photography direction, or co-branding rules.
