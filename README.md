# 🏨 ARK Hotels - Official Website

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A premium, high-performance web presence for **ARK Hotels Ranchi**, meticulously crafted to provide a seamless booking experience for business and leisure travelers. This project leverages the latest web technologies to deliver a fast, responsive, and SEO-optimized platform.

---

## ✨ Key Features

### 🛌 Sophisticated Room Showcase
- **Curated Selection**: Detailed listings for Deluxe Single, Double, and Super Double rooms.
- **Interactive Galleries**: High-quality imagery with custom-built carousels and smooth transitions.
- **Smart Booking**: Integrated WhatsApp booking flow with pre-filled templates for instant inquiries.

### 🍽️ ARK Kitchen (Pure Veg Restaurant)
- Full menu and facility details for the in-house vegetarian restaurant.
- Dedicated dining page highlighting North-Indian and Indo-Chinese specialties.

### 💼 Business-First Experience
- **GST Invoicing**: Seamless corporate billing information and GST support.
- **Strategic Location**: Highlighting proximity to Kokar Industrial Area, HEC, and Birsa Munda Airport.
- **Corporate Services**: Details on early check-ins, late check-outs, and airport transfers.

### 🛠️ Technical Excellence
- **Next.js App Router**: Utilizing the latest React Server Components for maximum performance.
- **SEO & Social**: Automated JSON-LD schema generation, OpenGraph images, and semantic HTML.
- **Rich Motion**: Fluid animations and micro-interactions powered by Framer Motion.
- **Modern Styling**: Styled with the next generation of Tailwind CSS (v4) for a sleek, utility-first UI.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Icons**: [Lucide React](https://lucide.dev)
- **Performance**: WebP image optimization, `next/font`, and optimized bundle sizes.

---

## 📂 Project Structure

```text
web/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── business/         # Business traveler services
│   ├── rooms/            # Room detail pages
│   ├── dining/           # Restaurant information
│   └── ...               # Contact, Gallery, Location
├── components/           # React Components
│   ├── layout/           # Shared Navbar, Footer, WhatsApp FAB
│   ├── home/             # Homepage-specific sections
│   ├── ui/               # Reusable UI primitives (Buttons, Cards)
│   └── shared/           # Cross-cutting components
├── lib/                  # Utilities & Configuration
│   ├── site.ts           # Central source of truth for hotel data
│   ├── jsonld.ts         # Schema.org metadata generation
│   └── cn.ts             # Tailwind class merging utility
├── public/               # Static assets (Images, Icons)
└── package.json          # Dependencies and scripts
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm / pnpm / yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ark-hotels-web.git
   cd ark-hotels-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📈 SEO & Performance

The site is built with a strong focus on Search Engine Optimization:
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<footer>`, and heading hierarchies.
- **JSON-LD Schema**: Automated structured data for `Hotel`, `Restaurant`, and `WebSite` entities to enhance search snippets.
- **Dynamic Metadata**: SEO titles and descriptions managed per-page using the Next.js Metadata API.
- **Performance**: Near-perfect Lighthouse scores through efficient image serving and minimal client-side JS.

---

## 📞 Contact & Support

For technical inquiries regarding this codebase, please contact the development team. For hotel bookings and inquiries:

- **Website**: [arkhotelsranchi.in](https://arkhotelsranchi.in)
- **Phone**: +91 651 3100536
- **WhatsApp**: +91 99558 88780
- **Email**: stay@arkhotelsranchi.in

---

© 2024 ARK Hotels Ranchi. Built with ❤️ for the modern traveler.
