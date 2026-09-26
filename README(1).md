# UK Dining — Restaurant Website (Demo)

The same design you shared, rebuilt as a proper **Next.js 14 (App Router)** project with **TypeScript**, **Tailwind CSS**, and **Framer Motion** — split into one component per section instead of a single file.

> ⚠️ Demo project only — placeholder content, stock photos, and mock forms (no real backend, database, or email service).

## Project structure

```
app/
  layout.tsx          → wraps every page: top info bar, navbar, footer, reservation modal
  page.tsx             → Home (Hero, SpecialOffers, FoodCategories, ReviewsSection)
  menu/page.tsx         → Menu (MenuBanner + MenuBrowser)
  about/page.tsx        → About Us (AboutSection)
  contact/page.tsx      → Contact Us (ContactSection)

components/
  BrandLogo.tsx          → the SVG mark
  UKHoursInfo.tsx        → top bar: address, phone, open/closed, hygiene rating
  Navbar.tsx             → sticky header + nav links + "Book a Table"
  Hero.tsx               → homepage hero section
  SpecialOffers.tsx      → Sunday roast promo banner
  FoodCategories.tsx     → 3 category cards, link to /menu?category=...
  ReviewsSection.tsx     → diner reviews grid
  MenuBanner.tsx         → menu page banner/header
  MenuBrowser.tsx        → search + dietary filter + category tabs + dish grid
  AboutSection.tsx       → philosophy + 3 pillars
  ContactSection.tsx     → contact details + inquiry form
  ReservationModal.tsx   → 2-step booking modal (form → confirmation)
  ReservationContext.tsx → shares the "is the modal open" state across every component
  Footer.tsx             → nav, hours, socials, newsletter

lib/
  data.ts                → MENU_DATA, REVIEWS_DATA, CATEGORIES, DIETARY_FILTERS (shared types + data)
```

## Why it's structured this way

- The original was one big `App.js` switching pages with `activeTab` state. Here each "tab" is a **real route** (`/`, `/menu`, `/about`, `/contact`), which is the normal Next.js pattern — better for SEO, back/forward buttons, and sharable links.
- The reservation modal's open/close state used to live in the top-level `App` component and get passed down as props. It's now a small **React Context** (`ReservationContext`), so any component — the navbar, hero, a menu card's "Reserve Table" button — can open it directly with `useReservation()` instead of prop-drilling.
- Clicking a category card on the homepage now links to `/menu?category=Mains` (etc.), and `MenuBrowser` reads that from the URL on load.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before using this for real

- Swap every Unsplash URL for your own licensed photography.
- Wire `ReservationModal` and `ContactSection`'s forms up to a real API route, booking system, or email service — right now they just simulate success.
- Update the address, phone number, prices, and menu items in `lib/data.ts`.
