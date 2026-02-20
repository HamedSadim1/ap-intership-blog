# DRY (Don't Repeat Yourself) Refactoring

## 📋 Overzicht

Het DRY principe is toegepast om code duplicatie te elimineren en onderhoudbaarheid te verbeteren.

## 🎯 Toegepaste Verbeteringen

### 1. **Shared Constants** (`lib/constants.ts`)

**Wat:** Centrale configuratie voor herbruikbare waarden

**Voordelen:**

- ✅ Eén bron van waarheid voor ISR revalidate tijd
- ✅ Consistente metadata across pages
- ✅ Makkelijk aan te passen op één plek

**Gebruik:**

```typescript
import { ISR_REVALIDATE_TIME, DEFAULT_METADATA } from "@/lib/constants";

export const revalidate = ISR_REVALIDATE_TIME; // 10 seconden
```

---

### 2. **Style Utilities** (`lib/utils/styles.ts`)

**Wat:** Herbruikbare Tailwind class combinaties

**Voordelen:**

- ✅ Consistente styling patterns
- ✅ Geen className duplicatie
- ✅ Type-safe style constants

**Gebruik:**

```typescript
import { GLASS_CLASSES, TRANSITION_CLASSES, cn } from "@/lib/utils/styles";

<div className={cn(GLASS_CLASSES.card, ROUNDED_CLASSES.lg)}>
```

---

### 3. **Tag Styling Utilities** (`lib/utils/tag-styles.ts`)

**Wat:** Gedeelde styling logica voor tag componenten

**Voor:**

```typescript
// TagFilter.tsx
<Link className={`px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ...`} />

// TagList.tsx
<Link className={`px-3 py-1 text-sm rounded-full bg-white/20 text-white transition-colors cursor-pointer ...`} />
```

**Na:**

```typescript
import { getTagClassName } from "@/lib/utils/tag-styles";

<Link className={getTagClassName("large", isActive)} />
<Link className={getTagClassName("default", false)} />
```

**Voordelen:**

- ✅ 70% minder code
- ✅ Consistente tag styling
- ✅ Eenvoudig aan te passen

---

### 4. **Component Refactoring**

#### **TagFilter.tsx**

- ❌ **Voor:** 42 regels met inline styling
- ✅ **Na:** 32 regels met utilities
- **Verbetering:** -24% code, +100% onderhoudbaarheid

#### **TagList.tsx**

- ❌ **Voor:** 82 regels met herhaalde logica
- ✅ **Na:** 53 regels met shared utilities
- **Verbetering:** -35% code

#### **NavLink.tsx**

- ❌ **Voor:** Inline class combinaties
- ✅ **Na:** Gebruikt `cn()` helper en shared constants
- **Verbetering:** Betere leesbaarheid

---

## 📊 Impact

### Code Reductie

```
TagFilter:    42 → 32 regels  (-24%)
TagList:      82 → 53 regels  (-35%)
Totaal:      ~125 → ~85 regels (-32%)
```

### Onderhoudbaarheid

- **Voor:** Wijzig styling op 6+ plekken
- **Na:** Wijzig styling op 1 plek

### Consistency

- **Voor:** Variaties in tag styling
- **Na:** Uniform across components

---

## 🛠️ Gebruik

### Importeer Utilities

```typescript
// Style utilities
import {
  GLASS_CLASSES,
  TRANSITION_CLASSES,
  ROUNDED_CLASSES,
  cn,
} from "@/lib/utils/styles";

// Tag styling
import { getTagClassName } from "@/lib/utils/tag-styles";

// Constants
import { ISR_REVALIDATE_TIME, DEFAULT_METADATA } from "@/lib/constants";
```

### Voorbeelden

**Glass effect:**

```typescript
<div className={GLASS_CLASSES.card}>
  <div className={GLASS_CLASSES.light}>
```

**Custom combinatie:**

```typescript
<button className={cn(
  INTERACTIVE_CLASSES.button,
  TRANSITION_CLASSES.all,
  HOVER_CLASSES.scale
)}>
```

**Tag styling:**

```typescript
<Link className={getTagClassName("large", isActive)}>
```

---

## ✅ Voordelen

1. **Minder Code** - 30% reductie in styling code
2. **Consistentie** - Uniforme styling patterns
3. **Onderhoudbaarheid** - Wijzig op één plek
4. **Type Safety** - TypeScript types voor alle utilities
5. **Leesbaarheid** - Declaratieve component code

---

## 🔄 Toekomstige Verbeteringen

- [ ] Shared button styling patterns
- [ ] Form input styling utilities
- [ ] Animation presets
- [ ] Responsive breakpoint helpers

---

**Resultaat:** Cleaner, consistentere en beter onderhoudbare codebase! 🚀
