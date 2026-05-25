# Ayush Aahar | आयुष आहार

> Government of India Ayurvedic Nutrition Initiative — Farm to Table Traceability Platform

A production-ready web platform promoting authentic Ayurvedic nutrition and herbal wellness, featuring an immersive traceability journey from farm to consumer.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM v6 |
| State | Context API |
| Backend | Node.js + Express |
| Security | Helmet, CORS, Rate Limiting, express-validator |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone and enter project
cd ayush_aahar

# Install all dependencies (root + client + server)
npm run install:all
```

### Development

```bash
# Run both client and server concurrently
npm run dev

# Or individually:
npm run dev:client   # Frontend on http://localhost:5173
npm run dev:server   # Backend on http://localhost:5001
```

### Production Build

```bash
npm run build   # Builds client to client/dist/
npm start       # Starts Express server serving the built frontend
```

---

## Project Structure

```
ayush_aahar/
├── client/                    # React + Vite Frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── MissionSection.jsx
│   │   │   │   └── FeaturedProducts.jsx
│   │   │   ├── traceability/
│   │   │   │   ├── JourneyTimeline.jsx
│   │   │   │   ├── JourneyMap.jsx
│   │   │   │   ├── BatchTracker.jsx
│   │   │   │   └── SustainabilityCards.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetailCard.jsx
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── CTASection.jsx
│   │   │   ├── QualityBadge.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   └── FloatingParticles.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Traceability.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Quality.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                    # Express Backend
│   ├── src/
│   │   ├── data/
│   │   │   ├── products.js
│   │   │   ├── traceability.js
│   │   │   └── quality.js
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── traceability.js
│   │   │   ├── quality.js
│   │   │   └── contact.js
│   │   └── index.js
│   └── package.json
├── package.json
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (summary) |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/traceability` | Full traceability journey data |
| GET | `/api/quality` | Quality standards & lab results |
| POST | `/api/contact` | Submit inquiry (validated) |
| GET | `/api/health` | Health check |

---

## Pages

1. **Home** — Cinematic hero, mission cards, featured products, stats
2. **Products** — Detailed product cards with Ayurvedic properties
3. **Traceability** — Interactive journey timeline, India map, batch tracker, sustainability scores
4. **About** — Mission, vision, timeline, farmer empowerment
5. **Quality** — Certifications, testing process, lab results
6. **Contact** — Government office style contact with validated form

---

## Design Language

- **Colors**: Forest green, dark herbal, cream, gold accents
- **Typography**: Cormorant Garamond (headings) + Inter (body)
- **Aesthetic**: Government + premium wellness + Indian heritage
- **Animations**: Parallax, stagger, floating particles, scroll-reveal

---

## Security Features

- Helmet security headers
- CORS whitelist
- Rate limiting (100 req/15min)
- Input sanitization (express-validator)
- XSS protection via HTML escaping

---

## Environment Variables

Copy `.env.example` files in both `client/` and `server/` directories and rename to `.env`.

---

## License

Government of India Initiative — All Rights Reserved.
