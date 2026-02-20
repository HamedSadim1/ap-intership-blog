# 📝 Markdown Features Gids

Dit document laat zien hoe je alle verbeterde markdown features gebruikt in je blog posts.

## ✨ Nieuwe Features

### 1. **Tabellen**

Maak professionele tabellen met automatische styling:

```markdown
| Feature | Before  | After      |
| ------- | ------- | ---------- |
| LCP     | 32.66s  | 2.62s      |
| Cache   | ❌ Geen | ✅ ISR 60s |
```

**Voorbeeld:**
| Situatie | LCP | Cache |
|----------|-----|-------|
| Origineel | 32.66s | ❌ Geen |
| Geoptimaliseerd | 2.62s | ✅ 60s |

---

### 2. **Callout Boxes**

Gebruik containers voor belangrijke informatie:

#### Success (Groen)

```markdown
::: success
✅ Dit is een success message!
Server-side rendering heeft enorme voordelen.
:::
```

#### Warning (Geel)

```markdown
::: warning
⚠️ Let op! Server actions zijn niet bedoeld voor client-side data fetching.
:::
```

#### Info (Blauw)

```markdown
::: info
💡 **Tip:** Gebruik `Promise.all()` voor parallel data fetching.
:::
```

#### Danger (Rood)

```markdown
::: danger
❌ **NIET DOEN:** Server action in useEffect gebruiken!
:::
```

---

### 3. **Emoji Support**

Gebruik emoji shortcuts:

```markdown
:smile: :heart: :rocket: :fire: :tada:
```

Wordt: 😄 ❤️ 🚀 🔥 🎉

---

### 4. **Code Blocks met Syntax Highlighting**

Code blocks krijgen automatisch:

- ✅ Syntax highlighting (TypeScript, JavaScript, Python, etc.)
- ✅ Copy button (rechtsboven)
- ✅ Line numbers
- ✅ Mooie styling

```typescript
export async function getServerData() {
  const data = await fetch("/api/data");
  return data.json();
}
```

---

### 5. **Heading Anchors**

Alle headings krijgen automatisch een anchor link voor deep linking:

```markdown
## Mijn Heading
```

De URL wordt: `#mijn-heading` (klikbaar voor directe navigatie)

---

### 6. **Table of Contents (TOC)**

De TOC wordt automatisch gegenereerd op basis van je headings (H2, H3, H4).

**Features:**

- ✅ Sticky sidebar (blijft zichtbaar tijdens scrollen)
- ✅ Active heading highlighting
- ✅ Smooth scroll naar sectie
- ✅ Automatisch gegenereerd

Je hoeft niks te doen - werkt automatisch!

---

### 7. **Reading Progress Bar**

Een progress bar bovenaan de pagina toont hoeveel van het artikel je hebt gelezen.

---

## 🎨 Styling Tips

### Inline Code

Gebruik backticks voor inline code: \`const name = "value"\`

### Block Quotes

```markdown
> Dit is een quote. Gebruik het voor citaten of belangrijke opmerkingen.
```

### Lijsten

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested
```

### Numbered Lists

```markdown
1. Eerste stap
2. Tweede stap
3. Derde stap
```

---

## 📊 Volledige Voorbeeld Blog Post

```markdown
# Mijn Eerste Week als Full Stack Developer

## De Eerste Dag

::: info
💡 Tip: Begin altijd met een goede onboarding!
:::

Wat me meteen opviel is hoe modern de tech stack is:

- **GitHub** voor version control
- **Notion** voor task management
- **Next.js** + **Prisma** + **TypeScript**

## Performance Optimalisatie

::: success
✅ **Resultaat:** Van 32s naar 100ms - een verbetering van 92%!
:::

### De Code

\`\`\`typescript
export default async function Page({ searchParams }) {
const { brandId } = await searchParams;
const data = await getData(brandId);
return <Component data={data} />;
}
\`\`\`

### Resultaten

| Metric | Voor   | Na    |
| ------ | ------ | ----- |
| LCP    | 32.66s | 2.62s |
| Cache  | ❌     | ✅    |

::: warning
⚠️ **Belangrijk:** Test altijd je performance verbeteringen!
:::

## Conclusie

Wat een geweldige week! :tada: :rocket:
```

---

## 🚀 Best Practices

1. **Gebruik headings hierarchisch** - Begin met H2, dan H3, dan H4
2. **Gebruik callouts spaarzaam** - Te veel kan afleiden
3. **Voeg taal toe aan code blocks** - \`\`\`typescript voor syntax highlighting
4. **Maak tabellen responsive** - Hou kolommen beperkt voor mobiel
5. **Gebruik emoji's met mate** - Voegt persoonlijkheid toe maar overdrijf niet

---

## 🛠️ Technische Details

### Gebruikte Packages

- `markdown-it` - Core markdown parser
- `markdown-it-anchor` - Heading anchors
- `markdown-it-container` - Custom containers/callouts
- `markdown-it-emoji` - Emoji support
- `markdown-it-attrs` - HTML attributes
- `highlight.js` - Syntax highlighting

### Custom Components

- `TableOfContents` - Auto-generated TOC
- `CodeBlockEnhancer` - Adds copy buttons
- `ReadingProgress` - Progress bar

---

Succes met je blog posts! 🎉
