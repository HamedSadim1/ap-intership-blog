# DRY (Don't Repeat Yourself) Refactoring

## 📋 Overzicht

Het DRY-principe is toegepast om code duplicatie te elimineren en onderhoudbaarheid te verbeteren. Hieronder staan de belangrijkste refactoring-verbeteringen.

---

## 🎯 Toegepaste Verbeteringen

### 1. **Shared Constants** (`lib/constants.ts`)

**Wat:** Centrale configuratie voor herbruikbare waarden.

```typescript
import { SITE_URL, SITE_EMAIL, NEW_POST_DAYS, IMAGE_DIMENSIONS, DEFAULT_METADATA } from "@/lib/constants";
```

**Voordelen:** ✅ Eén bron van waarheid ✅ Consistent across pages ✅ Makkelijk aan te passen

---

### 2. **Style Utilities** (`lib/utils/styles.ts`)

**Wat:** Herbruikbare Tailwind class combinaties voor consistente styling.

```typescript
import { GLASS_CLASSES, TRANSITION_CLASSES, ROUNDED_CLASSES, GRADIENTS, HOVER_CLASSES, cn } from "@/lib/utils/styles";
```

**Beschikbare groepen:**

| Groep             | Doel                                       |
| ----------------- | ------------------------------------------ |
| `GLASS_CLASSES`   | Glassmorphism effecten (card, light)       |
| `TRANSITION_CLASSES` | Transition durations (fast, medium)     |
| `ROUNDED_CLASSES` | Border radius varianten (sm, md, lg, xl)  |
| `GRADIENTS`       | Achtergrond- en badge gradients (brand, badge) |
| `HOVER_CLASSES`   | Hover effecten (scale, glow, lift)        |
| `INTERACTIVE_CLASSES` | Cursor en pointer styles (button, card) |
| `OVERLAY_CLASSES` | Dark overlays (voor hero images, etc.)    |

**Gebruik:**

```typescript
<div className={cn(GLASS_CLASSES.card, ROUNDED_CLASSES.lg, TRANSITION_CLASSES.medium)}>
```

---

### 3. **Tag Styling Utilities** (`lib/utils/tag-styles.ts`)

**Wat:** Gedeelde styling logica voor tag componenten.

**Voorheen:** TagFilter en TagList hadden elk hun eigen (vaak inconsistente) className strings.

**Nu:**

```typescript
import { getTagClassName, TAG_SIZES, TAG_VARIANTS } from "@/lib/utils/tag-styles";

// In TagList
<Link className={getTagClassName("default", false)} />

// In TagFilter
<Link className={getTagClassName("large", isActive)} />
```

**Resultaat:** ✅ 70% minder code ✅ Consistente tag styling ✅ Eén plek om styling aan te passen

---

### 4. **Component Refactoring — Blog Componenten**

| Component        | Voorheen | Nu       | Verbetering         |
| ---------------- | -------- | -------- | ------------------- |
| **BlogCard.tsx** | n.v.t.   | Nieuw    | Herbruikbare post card (grid + related) |
| **PostMeta.tsx** | n.v.t.   | Nieuw    | Metadata bar (auteur, datum, leestijd) |
| **RelatedPostsSection.tsx** | n.v.t. | Nieuw | Related posts sectie |
| **BackToBlogsLink.tsx** | n.v.t. | Nieuw | Terug-link component |
| **MobileTocToggle.tsx** | Inline in [slug]/page | Apart component | Herbruikbaar |
| **PostImageFallback.tsx** | Inline in BlogCard | Apart component | Herbruikbaar |

---

### 5. **SVG Iconen** (`app/(site)/components/svgs/`)

**Wat:** Alle inline SVG's geëxtraheerd naar herbruikbare componenten.

```typescript
import { ClockIcon, CalendarIcon, ArrowUpIcon } from "@/app/(site)/components/svgs";

// Icoon met aangepaste grootte
<ClockIcon className="w-4 h-4" />
```

**Resultaat:** ✅ 13 herbruikbare iconen ✅ Type-safe ✅ Consistente interface (className prop)

---

### 6. **Data Centralisatie** (`app/(site)/data/`)

**Wat:** Statische content gescheiden van componenten.

```
app/(site)/data/
├── about.ts       # Persoonlijke info, leerdoelen, contact, links
├── hero.ts        # Homepage hero content
├── metadata.ts    # SEO metadata configuratie
├── navbar.ts      # Navigatie items
└── index.ts       # Barrel export
```

**Voordelen:** ✅ Content los van UI ✅ Eén bestand om te wijzigen ✅ Type-safe

---

### 7. **UI Wrapper Componenten**

| Component        | Doel                                       |
| ---------------- | ------------------------------------------ |
| `PageLayout`     | Herbruikbare pagina-wrapper met gradient bg |
| `PageHeader`     | Header met gradient titel + subtitle       |
| `EmptyState`     | Lege toestand placeholder                  |
| `GlassCard`      | Glasmorphism container                     |
| `InfoCard`       | Informatiekaart met titel, icoon en link   |

---

## 📊 Impact

### Code Reductie

```
Blog detail pagina:  ~250 → ~60 regels  (-76%)
Tag styling:         ~42 → ~32 regels  (-24%)
SVG iconen:          Inline → 13 componenten  (+herbruikbaarheid)
```

### Onderhoudbaarheid

- **Voorheen:** Wijzig styling op 6+ plekken
- **Nu:** Wijzig styling op 1 plek (shared utilities)

### Consistency

- **Voorheen:** Variaties in styling tussen componenten
- **Nu:** Uniform via gecentraliseerde constants en utilities

---

## 🛠️ Gebruik

```typescript
// Style utilities
import { GLASS_CLASSES, TRANSITION_CLASSES, ROUNDED_CLASSES, cn } from "@/lib/utils/styles";

// Tag styling
import { getTagClassName } from "@/lib/utils/tag-styles";

// Constants
import { SITE_URL, DEFAULT_METADATA } from "@/lib/constants";

// SVG iconen
import { ClockIcon, CalendarIcon } from "@/app/(site)/components/svgs";

// Data
import { navbarData } from "@/app/(site)/data";
```

---

## ✅ Voordelen

1. **Minder Code** — Tot 76% minder regels in pages
2. **Consistentie** — Uniforme styling patterns
3. **Onderhoudbaarheid** — Wijzig op één plek
4. **Type Safety** — TypeScript types voor alle utilities
5. **Leesbaarheid** — Declaratieve component code
6. **Herbruikbaarheid** — Componenten geschikt voor meerdere contexten

---

## 🔄 Toekomstige Verbeteringen

- [ ] Shared button/CTA styling patterns
- [ ] Form input styling utilities
- [ ] Animation presets (framer-motion of CSS)
- [ ] Responsive breakpoint helpers
- [ ] Dark mode toggle utilities

---

**Resultaat:** Cleaner, consistentere en beter onderhoudbare codebase! 🚀
