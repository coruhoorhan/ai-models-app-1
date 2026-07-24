# UnoRouter Design System

## Overview

UnoRouter positions itself as a technical, developer-first AI infrastructure platform — a router that unifies 200+ AI models behind a single API key. The brand voice is precise, monospace-inflected, and quietly confident: no gradients, no marketing gloss, just a stark black-and-white canvas punctuated by a single live-status green and a small set of functional accent colors used strictly for data encoding (chart series, category tags, provider badges).

Where consumer AI brands lean into big colorful hero art, UnoRouter leans into **data as hero art**: the homepage's most prominent element is a live token counter, not a headline image. Every surface — marketing page, docs, dashboard — shares the exact same visual grammar, so a user moving from the landing page to the dashboard never feels like they left the product.

**Key Characteristics:**
- Two-tone base: pure black ({colors.ink}) on pure white ({colors.canvas}), with a true dark mode (inverted, not just dimmed)
- All structural elements are bordered, not shadowed — 1px hairline borders define every card, button, input, and panel
- Uppercase monospace micro-labels ({typography.label}) mark every stat, status, and section eyebrow — this is the single most repeated typographic move in the system
- Square-cornered, rectangular buttons and inputs — no pill shapes. Radius stays small and functional (6–8px)
- One semantic accent (green, {colors.live}) reserved exclusively for "online / live / active" states — never decorative
- Chart/category colors (teal, purple, pink, blue, orange) are functional data-encoding colors only, never brand decoration
- Dense, grid-driven layouts with visible dotted/hairline background rules suggesting a technical, "inspector" aesthetic

## Colors

### Base
- **Ink** ({colors.ink}): `#111111` — primary text, primary button fill, active nav state.
- **Canvas** ({colors.canvas}): `#FFFFFF` — page background, card fill (light mode).
- **Canvas Dark** ({colors.canvas-dark}): `#0A0A0A` — page background, card fill (dark mode).
- **Ink Inverse** ({colors.ink-inverse}): `#F5F5F5` — primary text in dark mode.
- **Sidebar Ink** ({colors.sidebar}): `#111111` — dashboard sidebar background, constant across both themes.

### Text
- **Muted** ({colors.muted}): `#6B7280` — body copy, descriptions, secondary stat labels.
- **Subtle** ({colors.subtle}): `#9CA3AF` — placeholder text, disabled labels, tertiary metadata.
- **Label** ({colors.label}): `#71717A` — uppercase monospace micro-labels (STAT headers, section eyebrows).

### Borders & Surfaces
- **Hairline** ({colors.hairline}): `#E5E7EB` (light) / `#262626` (dark) — all card, input, and table borders, 1px.
- **Surface** ({colors.surface}): `#FAFAFA` (light) / `#141414` (dark) — card backgrounds, hover rows, sidebar active-item background.
- **Surface Sunken** ({colors.surface-sunken}): `#F3F4F6` — ticker bar background, code/key display fields.

### Semantic / Status
- **Live Green** ({colors.live}): `#10B981` — status dots, "ROUTER ONLINE" badge, positive deltas, active/free badges. The ONLY color allowed to signal state.
- **Live Green BG** ({colors.live-bg}): `#ECFDF5` — background wash behind live/free badges.
- **Error Red** ({colors.error}): `#EF4444` — consumption/negative-trend stats, destructive actions.

### Data / Category Accents (functional only — never for buttons or brand moments)
- **Chart Teal** ({colors.chart-teal}): `#2DD4BF` — primary chart series (e.g. main model consumption).
- **Chart Blue** ({colors.chart-blue}): `#3B82F6` — secondary chart series, "Chat clients" category tag.
- **Chart Pink** ({colors.chart-pink}): `#EC4899` — tertiary chart series, "Character clients" category tag.
- **Chart Purple** ({colors.chart-purple}): `#8B5CF6` — onboarding step badges, "Get Started" pill accent.
- **Chart Orange** ({colors.chart-orange}): `#F97316` — "CLI tools" category tag, warning-adjacent stats.
- **Chart Green** ({colors.chart-green}): `#22C55E` — "Coding agents" category tag (distinct from live-green in usage, same hue family).

## Typography

### Font Family
**Primary:** Inter (or Geist Sans) — all headlines, body copy, UI labels.
**Monospace:** JetBrains Mono (or Space Mono) — every uppercase micro-label, every large numeric stat, API key displays, ticker text. This is the system's signature: **numbers and labels go monospace, prose goes sans-serif.**

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Font | Use |
|---|---|---|---|---|---|---|
| `{typography.hero}` | 72px | 800 | 1.05 | -0.02em | Inter | Landing hero headline |
| `{typography.display}` | 44px | 700 | 1.1 | -0.01em | JetBrains Mono | Giant live stat number (Tokens Served) |
| `{typography.heading-lg}` | 40px | 700 | 1.15 | 0 | Inter | Section headlines |
| `{typography.heading-md}` | 28px | 700 | 1.2 | 0 | Inter | Dashboard page title, card titles |
| `{typography.heading-sm}` | 20px | 600 | 1.3 | 0 | Inter | Card headers ("Model Data Analysis") |
| `{typography.stat-number}` | 24–36px | 700 | 1.2 | 0 | JetBrains Mono | Stat card values ($0.61, 217, 1,480,602) |
| `{typography.body}` | 16px | 400 | 1.6 | 0 | Inter | Paragraphs, descriptions |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Inter | Secondary body, table cells, nav links |
| `{typography.label}` | 11px | 600 | 1.4 | 0.08em | JetBrains Mono | Uppercase micro-labels (ALL CAPS, always) |
| `{typography.button}` | 13px | 600 | 1 | 0.03em | Inter | Button text, uppercase |
| `{typography.mono-inline}` | 13px | 400 | 1.5 | 0 | JetBrains Mono | API keys, model IDs, ticker items |

### Principles
- **Every stat label is uppercase monospace at 11px** with wide tracking (0.08em) — this single rule is what makes the dashboard, hero stats card, and pricing tables feel like one system.
- **Numbers are always monospace**, text around them is always Inter. Never mix — a stat card's label + number pairing is the atomic unit of this design language.
- Headlines stay heavy (700–800) and tight; body text stays light (400) and generous (1.5–1.6 line height) — the contrast between "loud numbers, quiet prose" is intentional.
- No italics anywhere in the system. Emphasis comes from weight and color (ink vs. muted), never style.

## Layout

### Spacing System
- **Base unit:** 4px (8px primary increment).
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Card internal padding:** 20–24px standard, 32px for onboarding step cards.
- **Grid gap:** 16px between cards in a row, 24px between major sections within a card.

### Grid & Container
- Marketing pages: 1440–1600px max-width, 64px side gutters (24px on mobile).
- Stat rows: 4-column grid with 1px vertical dividers between columns (not gaps — dividers).
- Card grids (Popular Paths, onboarding, feature tiles): equal-width columns, 16px gap, always 1px bordered.
- Dashboard: fixed 260px dark sidebar + fluid content area, content max-width unconstrained (fills viewport), inner content padding 32px.
- Dashboard main grid: 4-column stat row → large chart card (3/4 width) + side card (1/4 width) → 3-column bottom row.

### Whitespace Philosophy
Marketing surfaces breathe: 96px between major sections, generous card padding. Dashboard tightens considerably — this is a working surface, not a showcase — 16px card gaps, 20px card padding, dense stat rows. The rule: **the more "live data" a screen shows, the tighter the spacing gets.**

## Elevation & Depth

The system is almost entirely flat. No drop shadows on default cards — borders do the separating work.

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | 1px solid `{colors.hairline}`, no shadow | Default cards, stat tiles, table rows, inputs |
| 1 (subtle) | `rgba(0,0,0,0.03) 0px 1px 2px` | Sticky top nav on scroll |
| 2 (raised) | `rgba(0,0,0,0.06) 0px 4px 12px` | Dropdowns, tooltips, popovers |
| 3 (modal) | `rgba(0,0,0,0.12) 0px 12px 24px` | Modals, command palette, confirmation dialogs |

Decorative floating elements (the scattered provider icon badges on the hero) use a very soft ambient shadow only: `rgba(0,0,0,0.04) 0px 2px 8px` — just enough to lift them off the dotted background grid.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Badges, small pills, chip tags |
| `{rounded.sm}` | 6px | Buttons, inputs, table cells |
| `{rounded.md}` | 8px | Standard cards, stat tiles |
| `{rounded.lg}` | 12px | Large feature cards, chat panel container |
| `{rounded.full}` | 9999px | Status dot badges only ("ROUTER ONLINE" pill), avatar circles, icon badges |

Note the inversion versus a typical SaaS system: **buttons here are rounded-sm (6px), not pills.** Pill shape is reserved narrowly for status badges and circular icon containers. This is a deliberate signal — square-ish buttons read "technical tool," pill buttons read "consumer app," and UnoRouter wants the former.

## Components

### Buttons

**`button-primary`** — Solid black CTA, the dominant action.
- Background `{colors.ink}`, text white, typography `{typography.button}` uppercase, padding `12px 24px`, rounded `{rounded.sm}`.
- Pressed: background lightens to `{colors.surface}`-inverse equivalent (charcoal `#2A2A2A`).
- Icon-leading variant (lightning bolt icon) uses 16px icon + 8px gap before label.

**`button-secondary`** — Outlined, paired with primary in every dual-CTA row.
- Background transparent, text `{colors.ink}`, border `1px solid {colors.ink}`, same padding/radius/typography as primary.

**`button-tertiary`** — Bordered on `{colors.hairline}` instead of full ink — quieter than secondary, used for "View Guide" and inline nav CTAs.
- Background `{colors.canvas}`, text `{colors.ink}`, border `1px solid {colors.hairline}`, rounded `{rounded.sm}`.

**`button-icon-circular`** — 36×36px circular utility button (copy key, refresh chart, carousel arrows).
- Background `{colors.canvas}`, border `1px solid {colors.hairline}`, rounded `{rounded.full}`.

### Status & Badges

**`badge-status-live`** — Signature "ROUTER ONLINE" / "Live" indicator.
- 8px `{colors.live}` dot + uppercase monospace label, padding `6px 12px`, border `1px solid {colors.hairline}`, rounded `{rounded.full}`.

**`badge-free`** — Green "Free" tag on free-tier models.
- Background `{colors.live-bg}`, text `{colors.live}`, typography `{typography.label}` (not uppercase-forced here, sentence case allowed), rounded `{rounded.xs}`, padding `2px 8px`.

**`badge-category`** — Colored category tag (Coding agents = green, Character clients = pink, Chat clients = blue, CLI tools = orange).
- Text-only colored label + matching colored icon, no background fill — color carries the meaning, not a pill.

### Cards

**`stat-card`** — The atomic unit of the whole system. Appears on hero, dashboard, pricing.
- Background `{colors.canvas}`/`{colors.surface}`, border `1px solid {colors.hairline}`, rounded `{rounded.md}`, padding `20px`.
- Internal structure: icon (optional, 16–20px, colored) + `{typography.label}` uppercase micro-label on top row → `{typography.stat-number}` value below → optional muted description line.
- Stacked-stat variant: two label/value pairs separated by a thin `{colors.hairline}` divider inside one card (used in dashboard's 4 top cards).

**`card-feature`** — Popular Paths / onboarding step cards.
- Background `{colors.canvas}`, border `1px solid {colors.hairline}`, rounded `{rounded.md}`, padding `24px`.
- Colored icon + colored title (matches category accent) + muted description + `button-tertiary`-style "View Guide" link with circular arrow icon.

**`card-chart`** — Main dashboard analytics card.
- Border `1px solid {colors.hairline}`, rounded `{rounded.md}`, padding `24px`.
- Header row: icon + title (`{typography.heading-sm}`) left, date-range pill + refresh icon-button right.
- Segmented tab row beneath header (see Tabs below).
- Chart legend: colored square swatch (8px, `{rounded.xs}`) + monospace model-name label, horizontal row, 16px gaps.

### Inputs & Forms

**`text-input`** — Standard field.
- Background `{colors.canvas}`, border `1px solid {colors.hairline}`, rounded `{rounded.sm}`, padding `10px 12px`, height 40px, typography `{typography.body-sm}`.
- Focus: border becomes `2px solid {colors.ink}` (not a color shift — this system uses weight/width for focus state, staying monochrome).

**`key-display-field`** — Masked API key box with copy button.
- Background `{colors.surface-sunken}`, border `1px solid {colors.hairline}`, rounded `{rounded.sm}`, padding `12px 16px`, monospace typography, copy icon button right-aligned.

### Tabs

**`segmented-tab`** + **`segmented-tab-active`** — Dashboard chart tabs (Consumption Distribution / Trend / Calls Distribution / Ranking).
- Inactive: text `{colors.muted}`, `{typography.body-sm}`, padding `12px 16px`, no border.
- Active: text `{colors.ink}`, 2px bottom border `{colors.ink}`, same padding.

### Navigation

**Top Nav (Marketing)** — Sticky, bottom-bordered.
- Background `{colors.canvas}`, height 64px, border-bottom `1px solid {colors.hairline}`.
- Left: icon logo + wordmark. Center: uppercase nav links (`{typography.body-sm}`, letter-spacing 0.02em). Right: icon cluster (Discord, bell, language, theme toggle, avatar), 16px gaps, 20–24px icon size.

**Sidebar Nav (Dashboard)** — Fixed dark rail, constant across light/dark theme.
- Background `{colors.sidebar}` (`#111111`), width 260px, full height.
- Section label: `{typography.label}` in `{colors.subtle}`, 16px top margin before each group.
- `sidebar-nav-item`: 40px height, 8px `{rounded.sm}`, icon (16px) + label (`{typography.body-sm}`), 12px internal gap.
- `sidebar-nav-item-active`: background `rgba(255,255,255,0.08)`, text white, icon accent-colored if applicable.

### Live Ticker

**`ticker-bar`** — Horizontal scrolling model-name strip.
- Background `{colors.surface-sunken}`, height 56px, border-top `1px solid {colors.hairline}`.
- Left: `badge-status-live`. Right: `{typography.label}` "TPS:" + bold monospace live number. Center: scrolling monospace model-name list separated by `·` dot separators.

## Component Inventory (Prop Sözleşmesi)

Bu tablo her component'in **tek doğru prop arayüzünü** tanımlar. Bir component ihtiyacı doğduğunda önce burada ara — yoksa ekle (onaylı), varsa birebir bu interface ile kullan. Amaç: aynı component'in 3 farklı varyantının doğmasını engellemek.

### `StatCard`
```ts
interface StatCardProps {
  icon?: LucideIcon;
  iconColor?: 'live' | 'error' | 'chart-teal' | 'chart-blue' | 'chart-pink' | 'chart-purple' | 'chart-orange' | 'chart-green';
  label: string;          // otomatik uppercase + {typography.label} render edilir
  value: string | number; // otomatik {typography.stat-number} render edilir
  description?: string;   // muted, opsiyonel alt satır
  secondaryStat?: { label: string; value: string | number }; // stacked-stat varyantı için, hairline divider ile ayrılır
}
```

### `Button`
```ts
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'icon-circular';
  icon?: LucideIcon;
  iconPosition?: 'leading' | 'trailing';
  size?: 'default' | 'sm'; // default: 40px height, sm: 36px
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

### `FeatureCard` (Popular Paths / onboarding tipi kartlar)
```ts
interface FeatureCardProps {
  icon: LucideIcon;
  accentColor: 'chart-green' | 'chart-pink' | 'chart-blue' | 'chart-orange';
  title: string;
  description: string;
  ctaLabel?: string;   // örn. "View Guide"
  onCtaClick?: () => void;
}
```

### `Badge`
```ts
interface BadgeProps {
  variant: 'status-live' | 'free' | 'category' | 'beta' | 'error';
  label: string;
  showDot?: boolean; // status-live varyantında zorunlu true
}
```

### `DataTable`
```ts
interface DataTableProps<T> {
  columns: { key: keyof T; label: string; align?: 'left' | 'right' }[];
  rows: T[];
  emptyState?: React.ReactNode; // verilmezse standart empty-state-block render edilir
  isLoading?: boolean;          // true ise standart skeleton-table render edilir
}
```

### `ChartCard`
```ts
interface ChartCardProps {
  title: string;
  icon?: LucideIcon;
  tabs?: { key: string; label: string }[];
  activeTab?: string;
  onTabChange?: (key: string) => void;
  dateRangeLabel?: string;
  onRefresh?: () => void;
  legend: { color: string; label: string }[]; // color = chart-teal | chart-blue | chart-pink token'ı
  children: React.ReactNode; // asıl chart component'i (recharts vb.)
}
```

### `SidebarNavItem`
```ts
interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  section?: 'primary' | 'secondary'; // primary: Dashboard/API Keys grubu, secondary: Models/Rankings grubu
}
```

Yeni bir component gerektiğinde bu tabloya aynı formatta eklenir — serbest biçimli prop tanımlamak yasaktır.

## İkon Sistemi

- **Kütüphane:** `lucide-react` — proje genelinde tek ikon kaynağı. Başka bir ikon paketi (Heroicons, FontAwesome vb.) karıştırılmaz.
- **Boyut kuralları:**
  - Nav bar ikonları (top nav sağ küme): 20px
  - Sidebar nav ikonları: 16px
  - Buton içi ikonlar: 16px
  - Stat card ikonları: 16–20px (kartın `icon` prop'una göre otomatik)
  - Feature card ikonları: 24px
  - Icon-circular button içeriği: 16px (buton kendisi 36×36px)
  - Empty-state ikonları: 32px, `{colors.subtle}` renginde
- **Renk kuralı:** İkon rengi her zaman ya `{colors.ink}` (nötr), ya `{colors.muted}` (pasif), ya da bir `chart-*`/`{colors.live}` token'ı (anlamlıysa) olur — asla Tailwind default paletinden serbest renk alınmaz.
- **Stroke width:** Lucide varsayılanı (2px) korunur, özelleştirilmez.

## Boş / Yükleniyor / Hata Durumu Şablonları

Her liste, tablo veya kart grid'i şu üç durumu **standart component'lerle** karşılamak zorundadır — özel/anlık çözüm üretilemez.

### `empty-state-block`
- Ortalanmış blok: 32px ikon (`{colors.subtle}`) + `{typography.label}` uppercase mesaj (örn. "NO API INFORMATION") + opsiyonel `button-tertiary` CTA.
- Kapsayıcı: mevcut card/table chrome'unu korur, sadece içerik empty-state'e döner.

### `skeleton-loader`
- Gerçek içerikle aynı grid/spacing yapısını korur, `{colors.surface}` arka planlı `{rounded.sm}` bloklar, hafif pulse animasyonu (1.5s ease-in-out infinite).
- Stat card iskeleti: label yerine 60px genişlik bar, value yerine 100px genişlik bar.
- Tablo iskeleti: gerçek satır sayısına yakın (varsayılan 5) satır, her hücre kendi genişliğinde bar.
- Metin ("Loading...") KESİNLİKLE kullanılmaz.

### `error-state-block`
- Ortalanmış blok: `{colors.error}` renkli uyarı ikonu (24px) + `{typography.body-sm}` kullanıcı dostu hata mesajı + `button-secondary` "Tekrar Dene" CTA.
- Ham hata mesajı (stack trace, API error code) asla doğrudan UI'a basılmaz; loglanır, kullanıcıya sade mesaj gösterilir.

## Do's and Don'ts

### Do
- Pair every large number with an uppercase monospace label above it — this pairing is non-negotiable and appears on every screen.
- Keep buttons rectangular (`{rounded.sm}`, 6px) — this is what separates UnoRouter's technical feel from generic consumer SaaS pill-button trends.
- Use `{colors.live}` green exclusively for state (online/active/free) — never as a decorative accent.
- Use borders, not shadows, to separate every card, table row, and input by default.
- Keep the sidebar dark (`{colors.sidebar}`) in both light and dark theme — it's a constant anchor, not a themed surface.
- Route category/chart colors (teal, pink, blue, purple, orange) only to data-encoding contexts: chart legends, category tags, badges tied to a specific model/provider — never to primary buttons.

### Don't
- Don't make buttons pill-shaped — reserve `{rounded.full}` strictly for status dots and icon-circle containers.
- Don't use drop shadows on standard cards; flat-with-border is the default at every elevation level below dropdowns.
- Don't mix Inter and JetBrains Mono within the same text run — a label is monospace, its neighboring sentence is Inter, but never both fonts inside one continuous phrase.
- Don't introduce a second accent color for "primary" branding — ink (black) is the only brand color; everything else is either status (green) or data (chart palette).
- Don't let the chart/category palette bleed into UI chrome — a pink category tag never means "this button is pink now."

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 480px | Single column everywhere. Hero drops to 36px. Stat rows go 2×2 then 1-column. Sidebar becomes bottom drawer/hamburger. |
| Tablet | 480 – 1023px | 2-column card grids. Top nav collapses to hamburger. Dashboard sidebar collapses to icon-only 64px rail. |
| Desktop | 1024 – 1439px | Full 4-column stat rows and card grids. Sidebar full 260px. |
| Wide | ≥ 1440px | Max-width container centers content; extra gutter space, no new column counts. |

### Touch Targets
- Buttons: 40px height desktop → 44px mobile (padding increases, radius stays 6px).
- Sidebar nav items: 40px → 44px on mobile drawer.
- Icon buttons: 36px → 44px on mobile.

### Collapsing Strategy
- **Stat rows** (4-column with dividers) → 2×2 grid at tablet (dividers become borders around each cell) → 1-column at mobile.
- **Dashboard chart + side card** (3/4 + 1/4 split) → stacks vertically, side card moves below chart, at < 1024px.
- **Sidebar** → icon-only rail at tablet → full-screen drawer overlay at mobile.
- **Ticker bar** → text truncates to fewer visible model names, scroll speed unchanged.
- **Popular Paths / feature card grids** → 2-column at tablet → 1-column stacked at mobile.

## Iteration Guide

1. Before designing any new screen, check whether it needs a `stat-card` — if it shows any number (balance, count, percentage), it goes in a `stat-card`, full stop.
2. Reference tokens directly (`{colors.live}`, `{rounded.sm}`, `{typography.label}`) in every prompt to Stitch/AI Studio/Claude Code — don't restate hex values from memory, pull them from this file.
3. New screens should be built by copying the closest existing component (e.g. a new "Rankings" page reuses `card-chart` + `data-table`) rather than inventing new card styles.
4. Keep this file as the single source of truth — paste the relevant sections (or the whole file) into every design prompt so tone, spacing, and color stay identical across sessions.
5. If a new color feels necessary, ask first: is this a new *data category* (→ add to chart accent list) or is it trying to be a new *brand* color (→ reject, ink stays the only brand color).

## Known Gaps

- Dark-mode exact hex values for `{colors.surface}` and `{colors.hairline}` in dashboard context are approximate — verify contrast (WCAG AA) once dark mode is implemented in full.
- Animation/transition timing not yet defined — recommend 150ms ease-out for hover/focus, 200ms ease-in-out for sidebar collapse.
- Empty states (e.g. "NO API INFORMATION") need a formal component — currently ad hoc centered gray text; consider standardizing as `empty-state-block`.
- Mobile chat client layout (sidebar + thread + input, currently designed for split-desktop view) needs explicit mobile stacking rules.

### Ranking Components

- **`chart-card-scatter`**
  - **Function:** `card-chart`'ın scatter/radar varyantı.
  - **Structure:** Aynı chrome (border, radius, padding), farklı olarak `segmented-tab` ile 2 görselleştirme modu arasında geçiş yapabiliyor. Chart data-accent paletini kullanır, eksen etiketleri `{typography.caption}`.

- **`highlight-list-item`**
  - **Function:** Tek satırlık liste öğesi.
  - **Structure:** Sol: iki satırlı model bilgisi (isim + context). Sağ: delta badge (yeşil pozitif / kırmızı negatif, `{typography.caption-bold}`, `rounded-xs`) + fiyat metni (monospace, muted). Border yok, sadece satır arası `{colors.hairline-soft}` ayraç.

- **`cost-simulator-card`**
  - **Function:** API Maliyet Simülasyonu.
  - **Structure:** `card-chart` benzeri chrome, ama tab yerine 4'lü segmented-selector (token hacmi seçimi) kullanıyor. Liste öğeleri `highlight-list-item`'a benzer ama delta yerine sabit fiyat gösteriyor.

- **`methodology-tile`**
  - **Function:** Değerlendirme Metodolojisi ve Standartlar.
  - **Structure:** `ai-product-tile`/`feature-tile` mantığına benzer, ama bordersiz/daha sade. İkon + başlık + açıklama düzeni.

### Ranking Page Components
- `chart-card-scatter`: Scatter/radar varyantı grafik kartı. Segmented-tab ile farklı veri görünümleri arasında geçiş sağlar. Data-accent paletini kullanır.
- `highlight-list-item`: Tek satırlık liste öğesi. Sol tarafta çift satırlı model bilgisi (isim + context), sağ tarafta delta rozeti (artış/azalış) ve fiyat bilgisini gösterir.
- `cost-simulator-card`: Token hacmini baz alarak fiyat/maliyet simülasyonu sunan özel kart.
- `methodology-tile`: Değerlendirme metodolojisi adımlarını gösteren ikonlu bilgi bloğu.
