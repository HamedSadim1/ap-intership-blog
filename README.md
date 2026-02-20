<div align="center">

# 📝 AP Stage Blog

### _Mijn reis door het werkplekleren_

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

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
- 🔐 **Better Auth** authenticatie
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

- [Node.js](https://nodejs.org/) 18+ of [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- Sanity account (gratis tier beschikbaar)

### Quick Start

```bash
# 1️⃣ Clone de repository
git clone https://github.com/[username]/ap-internship-blog.git
cd ap-internship-blog

# 2️⃣ Installeer dependencies
npm install
# of met bun
bun install

# 3️⃣ Configureer environment variables
cp .env.example .env.local
# Vul de benodigde API keys in

# 4️⃣ Start de development server
npm run dev
# of met bun
bun dev
```

### 🔑 Environment Variables

Maak een `.env.local` bestand aan met de volgende variabelen:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Authentication
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
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

| Command           | Beschrijving             |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Bouw productie versie    |
| `npm run start`   | Start productie server   |
| `npm run lint`    | Voer ESLint uit          |
| `npm run typegen` | Genereer Sanity types    |

### 📚 Documentatie Bestanden

- **[MARKDOWN_GUIDE.md](MARKDOWN_GUIDE.md)** - Complete handleiding voor markdown features
- **[PERFORMANCE.md](PERFORMANCE.md)** - Performance optimalisatie documentatie
- **[REFACTORING.md](REFACTORING.md)** - Refactoring geschiedenis en best practices

---

## 🚀 Live Demo

> 🔗 **Live op:** [https://ap-intership-blog-adomate.vercel.app/](https://ap-intership-blog-adomate.vercel.app/)

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
- `next` (16.1+) - React framework met App Router
- `react` (19+) - UI library met Server Components
- `tailwindcss` (4.1+) - Utility-first CSS framework
- `better-auth` - Moderne authenticatie oplossing

**Content & Markdown:**
- `@sanity/client` - Sanity CMS integratie
- `next-sanity` - Next.js + Sanity optimalisatie
- `markdown-it` - Markdown parser
- `markdown-it-anchor` - Automatische heading anchors
- `markdown-it-container` - Custom callout containers
- `highlight.js` - Syntax highlighting voor code blocks

**Utilities:**
- `clsx` - Conditional className helper
- `date-fns` - Datum formatting

---

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden als onderdeel van het curriculum Graduaat Programmeren aan AP Hogeschool.

---

<div align="center">

**Gemaakt met ❤️ door Hamed Sadim**

_Als onderdeel van de WPL Stage @ AP Hogeschool_

<sub>© 2026 | Alle rechten voorbehouden</sub>

</div>
