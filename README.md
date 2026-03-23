# Superhero Roster

A modern web application for browsing, filtering, and managing your favorite superheroes and villains, built with Next.js 16, React 19, and TypeScript.

## Features

- 🦸 Browse superheroes and villains from Marvel and DC universes
- 🔍 Search heroes by name or alias
- 🎯 Filter by universe (Marvel, DC, Other) and powers (Strength, Speed, Intelligence, Magic)
- ❤️ Mark heroes as favorites and view them on a dedicated page
- 🌓 Light/Dark mode theme toggle
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Optimized performance with Next.js rendering strategies

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **React**: 19.2.4
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **State Management**: React Context API + useSyncExternalStore
- **Theme**: next-themes 0.4.6
- **Testing**: Jest 29 + React Testing Library 16
- **Code Quality**: ESLint 9, Prettier 3
- **Utilities**: clsx, tailwind-merge, use-debounce

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd superhero-roster
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file:

```bash
cp .env.local
```

4. Update the `.env.local` file with your API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/heroes
```

### Running Locally

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Rendering Strategies

This project demonstrates thoughtful use of Next.js rendering strategies:

### SSG (Static Site Generation)

**Used in**: `/heroes/[slug]` - Hero detail pages

**Why**:

- Hero data is static and doesn't change frequently
- Pre-rendering at build time provides instant page loads
- SEO-friendly with full HTML content
- Uses `generateStaticParams()` to pre-generate all hero pages

**Implementation**:

```typescript
// app/heroes/[slug]/page.tsx
export async function generateStaticParams() {
  const heroes = await getHeroes()
  return heroes.map((hero) => ({ slug: hero.slug }))
}
```

### ISR (Incremental Static Regeneration)

**Used in**: Home page hero list

**Why**:

- Hero list can be updated without full rebuild
- Balances static performance with data freshness
- Revalidates every 3600 seconds (1 hour)
- The first user gets cached page, background revalidation happens

**Implementation**:

### Server Components (Default)

**Used in**: Most pages and layouts

**Why**:

- Zero JavaScript shipped to a client for data fetching
- Better security (API keys, database queries stay on server)
- Reduced bundle size
- Automatic request deduplication

**Examples**:

- `app/page.tsx` - Home page with server-side filtering
- `app/heroes/favorites/page.tsx` - Fetches all heroes on server, filters on a client
- `app/layout.tsx` - Root layout

### Client Components

**Used in**: Interactive UI elements only

**Why**: Required for browser APIs and user interactions

**Examples**:

- `FavoritesProvider` - Uses localStorage (browser API)
- `SearchBar` - Handles user input with debouncing
- `FilterPanel` - Manages URL params with user clicks
- `ThemeToggle` - Uses next-themes hook
- `FavoriteButton` - Interactive favorite toggle

**Key Decision**: Favorites page uses **hybrid approach**:

1. Server Component fetches all hero data (fast, SEO-friendly)
2. Client Component filters based on localStorage favorites
3. Best of both worlds: initial HTML and reactive filtering

## API Routes

The project uses Next.js API routes to mock an external backend:

**Why API routes instead of direct imports?**

- Simulates a real-world scenario where frontend consumes external API
- Easy to swap with actual backend (just change `NEXT_PUBLIC_API_URL`)
- Consistent HTTP-based data fetching throughout the app
- Enables testing of error handling, loading states, and retry logic

**Routes**:

- `GET /api/heroes` - Returns all heroes
- `GET /api/heroes/[slug]` - Returns single hero by slug

## Key Technical Decisions

### 1. State Management

**Choice**: Context API + `useSyncExternalStore`

**Why**:

- Favorites are simple key-value store (no complex state)
- `useSyncExternalStore` prevents hydration mismatches with localStorage
- Built-in React solution, no external dependency
- Cross-tab synchronization via storage events

### 2. Styling Approach

**Choice**: Tailwind CSS 4 with custom CSS variables

**Why**:

- Utility-first for rapid development
- Built-in dark mode support
- Custom properties for theme consistency
- Smaller bundle size with Tailwind 4's new engine

### 3. Search/Filter Implementation

**Choice**: URL-based state with debouncing

**Why**:

- Shareable URLs (bookmark/share filtered results)
- Browser back/forward works correctly
- Server-side filtering for SEO
- Debounced search (300ms) prevents excessive re-renders

**Implementation**:

```typescript
// Custom hook centralizes URL param logic
const { setParam, updateParam, clearAll } = useQueryParams()
```

### 4. Error Handling

**Choice**: Next.js error boundaries at multiple levels

**Why**:

- Graceful degradation (app doesn't crash)
- User-friendly error messages
- Recovery actions (retry button)

**Locations**:

- `app/error.tsx` - Root level
- `app/heroes/error.tsx` - Heroes section
- `app/heroes/[slug]/error.tsx` - Individual hero pages
- Provider with try-catch for localStorage errors

### 5. Testing Strategy

**Coverage**:

- ✅ Component tests (Hero cards, filters)
- ✅ API route tests
- ✅ Provider tests (favorites with localStorage)
- ✅ Utility function tests
- ✅ Custom hook tests

**Total**: 44 tests across 7 test suites

## Performance Optimizations

1. **Image Optimization**
   - Next.js Image component with proper sizes
   - SVG icons for crisp rendering at any size

2. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports where beneficial

3. **Debouncing**
   - Search input debounced (300ms) to reduce re-renders
   - Prevents unnecessary API calls

4. **Memoization**
   - `useMemo` for filtered favorites
   - `useCallback` for stable function references

5. **Request Deduplication**
   - Next.js automatically dedupes fetch requests
   - ISR reduces database/API load
