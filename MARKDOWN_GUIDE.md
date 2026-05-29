# 📝 Markdown Features Gids

Deze gids laat zien hoe je alle Markdown-features gebruikt in je blog posts via Sanity CMS.

---

## 📑 Table of Contents (TOC)

De TOC wordt **automatisch gegenereerd** op basis van je headings (H2, H3, H4) in de blog post.

**Features:**
- ✅ Sticky sidebar op desktop (blijft zichtbaar tijdens scrollen)
- ✅ Active heading highlighting via IntersectionObserver
- ✅ Smooth scroll naar sectie
- ✅ Automatisch — geen extra actie nodig

---

## 📊 Tabellen

Maak professionele tabellen met automatische styling:

```markdown
| Feature          | Voor    | Na      |
| ---------------- | ------- | ------- |
| LCP              | 32.66s  | 2.62s   |
| Cache            | ❌ Geen | ✅ ISR  |
```

**Voorbeeld:**
| Situatie          | LCP    | Cache     |
| ----------------- | ------ | --------- |
| Origineel         | 32.66s | ❌ Geen   |
| Geoptimaliseerd   | 2.62s  | ✅ 60s    |

---

## 💬 Callout Boxes

Gebruik containers voor belangrijke informatie:

### Success (Groen)

```markdown
::: success
✅ Dit is een success message!
Server-side rendering heeft enorme voordelen.
:::
```

### Warning (Geel)

```markdown
::: warning
⚠️ Let op! Server actions zijn niet bedoeld voor client-side data fetching.
:::
```

### Info (Blauw)

```markdown
::: info
💡 **Tip:** Gebruik `Promise.all()` voor parallel data fetching.
:::
```

### Danger (Rood)

```markdown
::: danger
❌ **NIET DOEN:** Server action in useEffect gebruiken!
:::
```

---

## 🎨 Code Blocks met Syntax Highlighting

Code blocks krijgen automatisch:

- ✅ **Syntax highlighting** voor 180+ talen via highlight.js
- ✅ **Copy button** (rechtsboven — klik om te kopiëren)
- ✅ Donker thema (github-dark)

```typescript
export async function getServerData() {
  const data = await fetch("/api/data");
  return data.json();
}
```

**Taal specificeren:** Zet de taalnaam achter de opening backticks:
- ` ```typescript ` — TypeScript
- ` ```javascript ` — JavaScript
- ` ```python ` — Python
- ` ```bash ` — Terminal commands
- ` ```css ` — CSS
- ` ```html ` — HTML/JSX

---

## 🔗 Heading Anchors

Alle headings krijgen automatisch een anchor link voor deep linking:

```markdown
## Mijn Heading
```

Wordt: `#mijn-heading` — direct linkbaar en zichtbaar bij hover.

---

## 📈 Reading Progress Bar

Een **progress bar** bovenaan de pagina toont in real-time hoeveel van het artikel je hebt gelezen. Automatisch, geen actie nodig.

---

## 🎨 Styling Tips

### Inline Code

Gebruik backticks voor inline code: `` `const name = "value"` ``

### Block Quotes

```markdown
> Dit is een quote. Gebruik dit voor citaten of belangrijke opmerkingen.
```

### Lijsten

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested
```

### Genummerde Lijsten

```markdown
1. Eerste stap
2. Tweede stap
3. Derde stap
```

---

## 📝 Volledige Voorbeeld Blog Post

```markdown
# Mijn Eerste Week als Stagiair

## De Eerste Dag

::: info
💡 **Tip:** Begin altijd met een goede onboarding!
:::

Wat me meteen opviel is hoe modern de tech stack is:

- **Next.js 16** voor het framework
- **Sanity CMS** voor content management
- **Tailwind CSS 4** voor styling

## Performance Optimalisatie

::: success
✅ **Resultaat:** Van 32s naar 100ms — een verbetering van 92%!
:::

### De Code

```typescript
export default async function Page() {
  const data = await getData();
  return <Component data={data} />;
}
```

### Resultaten

| Metric | Voor   | Na     |
| ------ | ------ | ------ |
| LCP    | 32.66s | 2.62s  |
| Cache  | ❌     | ✅     |

::: warning
⚠️ **Belangrijk:** Test altijd je performance verbeteringen!
:::

## Conclusie

Wat een geweldige week!
```

---

## 🚀 Best Practices

1. **Gebruik headings hiërarchisch** — Begin met H2, dan H3, dan H4
2. **Gebruik callouts spaarzaam** — Te veel kan afleiden
3. **Voeg taal toe aan code blocks** — ` ```typescript ` voor syntax highlighting
4. **Maak tabellen overzichtelijk** — Hou kolommen beperkt voor mobiel
5. **Gebruik emoji** — via kopiëren/plakken voor betere compatibiliteit

---

## 🛠️ Technische Details

### Gebruikte Packages

| Package                    | Doel                                       |
| -------------------------- | ------------------------------------------ |
| `markdown-it`              | Core markdown parser                       |
| `markdown-it-anchor`       | Automatische heading anchors voor TOC      |
| `markdown-it-container`    | Custom containers voor callout boxes       |
| `highlight.js`             | Syntax highlighting voor code blokken      |

### Custom Componenten

| Component              | Functie                                   |
| ---------------------- | ----------------------------------------- |
| `TableOfContents`      | Automatisch gegenereerde TOC (desktop)    |
| `MobileTocToggle`      | Inklapbare TOC voor mobiel                |
| `CodeBlockEnhancer`    | Voegt copy-knoppen toe aan code blokken   |
| `ReadingProgress`      | Real-time leesvoortgangsbalk              |
| `PostHeader`           | Hero-sectie met featured image & metadata |
| `RelatedPostsSection`  | Gerelateerde posts o.b.v. gedeelde tags   |

---

Succes met je blog posts! 🎉
