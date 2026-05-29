<div align="center">

# 📝 AP Stage Blog

### _Mijn reis door het werkplekleren_

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<br/>

> 🎓 **AP Hogeschool** | Graduaat Programmeren | WPL Stage Portfolio
>
> 📅 Stage periode: **Februari 2026 - Juni 2026**

<br/>

[🚀 Live Demo](#-live-demo) · [✨ Features](#-features) · [🛠️ Installatie](#️-installatie) · [📖 Documentatie](#-documentatie)

</div>

---

## 👋 Welkom

Dit is mijn **persoonlijke stage blog** waarin ik mijn ervaringen, uitdagingen en groei documenteer tijdens mijn werkplekleren (WPL) stage bij **[Adomate](https://www.adomate.com/)** — een innovatief, AI-ondersteund reclamebureau uit Gent.

Als student Graduaat Programmeren aan AP Hogeschool gebruik ik deze blog om:

- 📔 Dagelijkse ervaringen en lessen vast te leggen
- 🎯 Voortgang op leerdoelen te documenteren
- 💭 Te reflecteren op mijn professionele groei
- 🔧 Technische kennis en oplossingen te delen

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Frontend

- ⚡ **Next.js 16** met App Router
- 🎭 **React 19** met Server Components
- 💅 **Tailwind CSS 4** voor styling
- 📱 Volledig **responsive** design
- 🌙 Moderne glassmorphism UI
- 🎨 **Reading progress** indicator
- 📑 **Table of Contents** sidebar

</td>
<td width="50%">

### 🔧 Backend

- 📝 **Sanity CMS** voor content management
- 📖 **Geavanceerde Markdown** met callouts, TOC, en meer
- 🏷️ Tag-gebaseerde filtering
- ⚡ Live content updates

</td>
</tr>
</table>

### ✨ Markdown Features

- 📑 **Table of Contents** - Automatisch gegenereerde inhoudsopgave
- 📊 **Mooie tabellen** - Professionele tabel styling met hover effects
- 💬 **Callout boxes** - Success, Warning, Info, en Danger containers
- 📋 **Copy button** - Kopieer code blocks met één klik
- 🔗 **Heading anchors** - Deep linking naar specifieke secties
- 📈 **Reading progress** - Visuele voortgangsbalk tijdens lezen
- 🎨 **Syntax highlighting** - Code highlighting voor 180+ talen

👉 **Zie [MARKDOWN_GUIDE.md](MARKDOWN_GUIDE.md) voor complete handleiding**

### 📄 Pagina's

| Pagina          | Beschrijving                                   |
| --------------- | ---------------------------------------------- |
| 🏠 **Home**     | Landing page met hero sectie en recente posts  |
| 📝 **Blog**     | Overzicht van alle stage verslagen met filters |
| 👤 **Over Mij** | Persoonlijke informatie en leerdoelen          |
| ✍️ **Admin**    | Content beheer via Sanity Studio               |

### 📝 Blog Post Features

Elke blog post bevat:
- 📊 **Metadata** - Titel, excerpt, datum, auteur, tags
- 📑 **Table of Contents** - Sticky sidebar met active highlighting
- 📈 **Reading Progress** - Real-time voortgangsbalk
- 💬 **Callout Boxes** - Visuele highlights voor belangrijke info
- 📋 **Code Blocks** - Syntax highlighting + copy button
- 🔗 **Deep Linking** - Directe links naar specifieke secties
- 📊 **Tabellen** - Professioneel gestyled met hover effects
- 🏷️ **Tags** - Categorisatie en filtering

---

## 🛠️ Installatie

### Vereisten

- [Bun](https://bun.sh/) 1.2+ (aanbevolen) of [Node.js](https://nodejs.org/) 18+
- [Git](https://git-scm.com/)
- Sanity account (gratis tier beschikbaar)

### Quick Start

```bash
# 1️⃣ Clone de repository
git clone https://github.com/HamedSadim1/ap-intership-blog.git
cd ap-intership-blog

# 2️⃣ Installeer dependencies
bun install

# 3️⃣ Configureer environment variables
cp .env.example .env.local
# Vul de benodigde API keys in

# 4️⃣ Start de development server
bun run dev
```

### 📦 Husky Hooks

Dit project gebruikt **Husky** voor geautomatiseerde Git hooks die code kwaliteit waarborgen:

| Hook        | Actie                               |
| ----------- | ----------------------------------- |
| **pre-commit** | `bun run lint` + `bunx tsc --noEmit` |
| **pre-push**   | `bun run build`                     |

Hooks worden automatisch geactiveerd na `bun install`.

### 🔑 Environment Variables

Maak een `.env.local` bestand aan met de volgende variabelen:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

---

## 📖 Documentatie

### 📁 Project Structuur

```
ap-internship-blog/
├── 📂 app/
│   ├── 📂 (site)/           # Publieke pagina's
│   │   ├── 📂 about/        # Over mij pagina
│   │   ├── 📂 blog/         # Blog overzicht & posts
│   │   ├── 📂 components/   # Site componenten
│   │   └── 📂 data/         # Statische content data
│   ├── 📂 actions/          # Server actions
│   ├── 📂 api/              # API routes
│   └── 📂 studio/           # Sanity Studio
├── 📂 lib/                  # Utilities & configuratie
├── 📂 sanity/               # Sanity schema's & queries
├── 📂 public/               # Statische assets
└── 📂 types/                # TypeScript types
```

### 🎯 Scripts

| Command                | Beschrijving                 |
| ---------------------- | ---------------------------- |
| `bun run dev`          | Start development server     |
| `bun run build`        | Bouw productie versie        |
| `bun run start`        | Start productie server       |
| `bun run lint`         | Voer ESLint uit              |
| `bun run typegen`      | Genereer/ververs Sanity types |
| `bunx tsc --noEmit`    | TypeScript typecheck         |

### 📚 Documentatie Bestanden

- **[MARKDOWN_GUIDE.md](MARKDOWN_GUIDE.md)** - Complete handleiding voor markdown features
- **[PERFORMANCE.md](PERFORMANCE.md)** - Performance optimalisatie documentatie
- **[REFACTORING.md](REFACTORING.md)** - Refactoring geschiedenis en best practices

---

## 🚀 Live Demo

> 🔗 **Ontwikkeling:** [http://localhost:3000](http://localhost:3000)
> 🔗 **Productie:** [https://stageblog.vercel.app/](https://stageblog.vercel.app/)

---

## 📸 Screenshots

<details>
<summary>🖼️ Klik om screenshots te bekijken</summary>

<br/>

| Home Page                                      | Blog Overzicht                                 |
| ---------------------------------------------- | ---------------------------------------------- |
| ![Home](public/screenshots/home-Stageblog.png) | ![Blog](public/screenshots/blog-Stageblog.png) |

| Blog Post                                      | Over Mij                                         |
| ---------------------------------------------- | ------------------------------------------------ |
| ![Post](public/screenshots/blog-Stageblog.png) | ![About](public/screenshots/about-Stageblog.png) |

</details>

---

## 🧑‍💻 Over de Auteur

<table>
<tr>
<td width="150">
<img src="https://github.com/identicons/hamedsadim.png" width="100" style="border-radius: 50%"/>
</td>
<td>

### Hamed Sadim

**Student Graduaat Programmeren** @ AP Hogeschool

🏢 Stagiair bij [Adomate](https://www.adomate.com/)

[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat-square&logo=google-chrome&logoColor=white)](https://hamedsadim-portfolio.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](#)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](#)

</td>
</tr>
</table>

---

## 🎓 Leerdoelen

Tijdens mijn stage focus ik op de volgende ontwikkelgebieden:

- 🔧 **Technische Vaardigheden** — Verdiepen in moderne web technologieën
- 🤝 **Professionele Groei** — Communicatie en samenwerking in teamverband
- 🪞 **Zelfreflectie** — Bewust reflecteren op mijn leerproces
- 💼 **Praktijkervaring** — Theorie omzetten naar real-world projecten

---

## 📚 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

### 📦 Belangrijkste Dependencies

**Frontend:**
- `next` (16.2.6) - React framework met App Router
- `react` (19.2.6) - UI library met Server Components
- `typescript` (6.0.3) - Type-safe JavaScript

**Content & Markdown:**
- `@sanity/client` - Sanity CMS integratie
- `next-sanity` - Next.js + Sanity optimalisatie
- `sanity` (5.28+) - Sanity Studio + CMS
- `markdown-it` (14.2+) - Markdown parser
- `markdown-it-anchor` - Automatische heading anchors
- `markdown-it-container` - Custom callout containers
- `markdown-it-attrs` - HTML attributen in Markdown
- `markdown-it-emoji` - Emoji ondersteuning
- `highlight.js` - Syntax highlighting voor code blocks

**Styling:**
- `tailwindcss` (4.3+) - Utility-first CSS
- `@tailwindcss/typography` - Prose classes voor Markdown
- `@tailwindcss/postcss` - Tailwind PostCSS plugin

**Utilities:**
- `@sanity/image-url` - Sanity image URLs genereren
- `@sanity/icons` - Sanity icon set
- `sanity-plugin-markdown` - Markdown editor in Sanity Studio
- `server-only` - Server-side only code markering

---

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden als onderdeel van het curriculum Graduaat Programmeren aan AP Hogeschool.

---

<div align="center">

**Gemaakt met ❤️ door Hamed Sadim**

_Als onderdeel van de WPL Stage @ AP Hogeschool_

<sub>© 2026 | Alle rechten voorbehouden</sub>

</div>
