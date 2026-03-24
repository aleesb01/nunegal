# Mobile Store — ITX Frontend Technical Test

A React Single Page Application (SPA) for browsing and purchasing mobile devices.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (mock API)
cd ../backend
npm install
```

### Running the Application

**1. Start the mock API server:**
```bash
cd backend
npm start
# Runs on http://localhost:3001
```

**2. Start the frontend (in a separate terminal):**
```bash
cd frontend
npm start
# Opens on http://localhost:5173
```

The Vite dev server proxies `/api` requests to the backend automatically.

## 📜 Available Scripts

From the `frontend/` directory:

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `vite` | Development server with HMR |
| `npm run build` | `vite build` | Production build |
| `npm test` | `vitest run` | Run unit tests |
| `npm run lint` | `eslint .` | Lint code |

## 🏗️ Architecture

### Tech Stack
- **React 19** — UI library
- **React Router v7** — Client-side routing (SPA)
- **Vite 5** — Build tool & dev server
- **Vitest** + **React Testing Library** — Testing
- **ESLint 8** — Code quality
- **Vanilla CSS** — Styling (CSS custom properties)

### Project Structure

```
frontend/src/
├── api/            # API service layer (fetch + caching)
├── components/     # Reusable UI components
│   ├── Header/
│   ├── Breadcrumbs/
│   ├── SearchBar/
│   ├── ProductCard/
│   ├── ProductImage/
│   ├── ProductDescription/
│   └── ProductActions/
├── context/        # React Context (CartContext)
├── hooks/          # Custom hooks (useProducts, useProductDetail, useCart)
├── pages/          # Route pages
│   ├── ProductListPage/
│   └── ProductDetailPage/
├── test/           # Test setup
└── utils/          # Utilities (cache with 1h TTL)
```

### Key Features
- **Product List (PLP)**: Responsive grid (1–4 columns), real-time search by brand/model
- **Product Detail (PDP)**: Two-column layout, full specs, storage/color selectors, add to cart
- **Shopping Cart**: Persistent cart count in header, synced with API response
- **Client-Side Caching**: localStorage with 1-hour TTL on API responses
- **Loading States**: Skeleton placeholders during API calls
- **Error Handling**: Graceful error messages on API failures

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/product` | List all products |
| GET | `/api/product/:id` | Product details |
| POST | `/api/cart` | Add to cart (`{ id, colorCode, storageCode }`) |

### Caching Strategy

API responses are cached in `localStorage` with a 1-hour TTL. When the cache expires, the next request fetches fresh data from the API and re-caches it. Cart mutations (`POST /api/cart`) are never cached.

## 🎨 Design

- **Dark theme** with glassmorphism effects
- **Google Fonts**: Inter (body) + Outfit (headings)
- **CSS custom properties** for consistent design tokens
- **Micro-animations**: hover effects, fade-in transitions, loading shimmer
- **Fully responsive**: mobile-first, adapts from 1 to 4 columns

## 🧪 Testing

```bash
cd frontend
npm test
```

Tests cover:
- Cache utility (set, get, TTL expiration, clearing)
- API service (endpoint URLs, request bodies, error handling)
- Header component (logo, breadcrumbs, cart badge)
- SearchBar component (input, filtering, clear)
- ProductCard component (rendering, linking, edge cases)
