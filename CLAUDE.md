# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Pekitas Ecotienda** is a React-based PWA e-commerce platform for organic and natural products. The project is currently at version 2.0.0 and has been modernized with Vite, Firebase backend, Chakra UI, and comprehensive accessibility features.

## Development Commands

### Primary Development
- `npm run dev` - Start Vite dev server on port 3000
- `npm run build` - Build production bundle with code splitting
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run Jest test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

### Code Quality
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking (gradual TypeScript adoption)

### Bundle Analysis
- `npm run analyze` - Analyze production bundle size with vite-bundle-analyzer

### Firebase
- `npm run firebase:deploy` - Build and deploy to Firebase hosting
- `npm run firebase:rules` - Deploy only Firestore security rules

### Docker
- `npm run docker:build` - Build Docker production image
- `npm run docker:run` - Run containerized app on port 80
- `docker-compose --profile dev up` - Development with Docker Compose

## Architecture Overview

### Context Providers Hierarchy
The application uses a nested context provider pattern in App.jsx:
```
HelmetProvider (SEO)
  → ErrorBoundary (Error handling at page level)
    → AuthProvider (User authentication state)
      → CartProvider (Shopping cart reducer)
        → ReviewsProvider (Product reviews)
          → WishlistProvider (User favorites)
```

**Important**: All providers wrap `MainRoutes`, so any context can be accessed from any route component.

### State Management Pattern
- **Cart**: Uses `useReducer` with actions `ADD_ITEM`, `REMOVE_ITEM`, `DELETE_ITEM` - see [CartContext.jsx](src/context/CartContext.jsx)
- **Auth**: Listens to Firebase auth state changes via `auth.onAuthStateChanged`
- **Reviews & Wishlist**: Context-based state with Firestore persistence

### Route Protection
Routes in [MainRoutes.jsx](src/routes/MainRoutes.jsx) use the pattern:
```jsx
element={currentUser ? <Component /> : <Navigate to="/login" />}
```
Protected routes: `/item/:itemId`, `/cart`, `/checkout`, `/wishlist`, `/dashboard`

### Firebase Configuration
- **Config**: Centralized in [src/firebase/config.js](src/firebase/config.js)
- **Auth Methods**: Email/password, Google OAuth (with `prompt: 'select_account'`)
- **Firestore Collections**: `products`, `users`, `contact`, `reviews` (planned), `wishlists` (planned)
- **Security Rules**: [firestore.rules](firestore.rules) - Products are publicly readable, user data requires authentication

### Service Layer
- **products.service.js**: Firestore operations - `getAllProducts()`, `createProductsFirestore()`
- **analytics.js**: Unified analytics service for GA4 and Facebook Pixel (only runs in production)
- **productService.js**: Additional product data fetching utilities

### Custom Hooks Pattern
Located in `src/hooks/`:
- `useAuth` - Access current user and auth methods from AuthContext
- `useCart` - Cart operations (addToCart, getTotalItems, getTotalPrice)
- `useProductsOptimized` - Performance-optimized product fetching with caching
- `usePWA` - PWA features (isOnline, canInstall, installApp)
- `usePerformanceMonitor` - Track component-level performance metrics (currently disabled in App.jsx)
- `useUpdateNotification` - Handle app update notifications

### Component Structure
```
src/components/
├── ui/                    # Reusable UI components (ErrorBoundary, LoadingStates, BreadcrumbNavigation)
├── accessibility/         # Accessibility features (planned)
├── features/              # Feature-specific components (planned)
├── forms/                 # Form components (planned)
├── [Feature]/             # Feature folders (Navbar, Hero, ProductCarousel, etc.)
```

**Pattern**: Most components are self-contained in their own folders with the component file named the same as the folder.

### Performance Optimizations
- **Code Splitting**: Vite's `manualChunks` in [vite.config.js](vite.config.js) splits `react-vendors`, `firebase-vendors`, and `chakra-ui`
- **Lazy Loading**: `Suspense` wrapper in App.jsx with `PageLoader` fallback
- **Image Optimization**: Planned WebP support and lazy loading in `OptimizedImage` component
- **PWA**: Service Worker configured for offline caching (see `public/sw.js`)

### Analytics Integration
Analytics events are tracked via [src/services/analytics.js](src/services/analytics.js):
- Only runs in production (`import.meta.env.PROD`)
- Track events: `app_init`, `whatsapp_contact`, errors
- Environment variables: `VITE_GA4_MEASUREMENT_ID`, `VITE_FACEBOOK_PIXEL_ID`, `VITE_ANALYTICS_ENABLED`

## Important Patterns and Conventions

### Environment Variables
- **Naming**: All environment variables use `REACT_APP_` prefix in `.env.example` but code uses `VITE_` prefix for Vite compatibility
- **Firebase Config**: Check [.env.example](.env.example) for required Firebase credentials
- **When adding new env vars**: Use `VITE_` prefix and access via `import.meta.env.VITE_YOUR_VAR`

### Error Handling
- **Global Boundary**: `<ErrorBoundary>` in App.jsx catches all page-level errors
- **Error Tracking**: Errors are sent to analytics via `analytics.trackError(error, errorInfo)`
- **User Feedback**: Toast notifications for user-friendly error messages

### Authentication Flow
1. User submits login form
2. [AuthContext.jsx](src/context/AuthContext.jsx) calls `signInWithEmail()` or `signInWithGoogle()`
3. Firebase returns user credential
4. `onAuthStateChanged` listener updates `currentUser` state
5. Protected routes check `currentUser` and redirect if null

### Product Data Flow
1. Component calls `useProductsOptimized()` or directly uses Firestore
2. [products.service.js](src/services/products.service.js) fetches from Firestore `products` collection
3. Products cached for performance (implementation in `useProductsOptimized`)
4. Offline-first: Service Worker caches previously viewed products

## Key Files to Reference

- [src/App.jsx](src/App.jsx) - Main app structure, provider hierarchy, PWA setup
- [src/context/CartContext.jsx](src/context/CartContext.jsx) - Cart reducer logic and operations
- [src/context/AuthContext.jsx](src/context/AuthContext.jsx) - Authentication state and methods
- [src/routes/MainRoutes.jsx](src/routes/MainRoutes.jsx) - Route configuration and protection
- [src/firebase/config.js](src/firebase/config.js) - Firebase initialization and auth helpers
- [vite.config.js](vite.config.js) - Build configuration and code splitting
- [eslint.config.js](eslint.config.js) - ESLint rules (flat config format)

## Migration and Modernization Context

This project has been migrated from Create React App to Vite (see [MIGRATION-REPORT.md](MIGRATION-REPORT.md)). Key changes:
- CRA → Vite: Faster build times, HMR improvements
- PropTypes → Gradual TypeScript adoption (TypeScript ready, but not strictly enforced)
- Local JSON → Firestore: 76 products migrated to Firebase
- ESLint issues reduced from 140 to 26 (82% improvement)

## Roadmap Context

The project follows a phased development plan documented in [ROADMAP-DESARROLLO.md](ROADMAP-DESARROLLO.md):
- **Current Phase**: v2.0.0 (Core PWA, Carousel, Accessibility)
- **Next Phase**: v2.1.0 - Reviews System, Wishlist, User Dashboard
- **Future**: Backend API, Admin Panel, Advanced Search, Chat Support

When implementing new features, reference the roadmap to understand priorities and architectural decisions.

## Testing Notes

- **Test Framework**: Jest with jsdom environment
- **Setup**: Test configuration in [package.json](package.json) under `jest` key
- **Setup File**: `src/setupTests.js` for global test utilities
- **Coverage**: Excludes `index.js`, `reportWebVitals.js`, `setupTests.js`
- **Style Mocks**: CSS imports mocked with `identity-obj-proxy`

## Docker Deployment

Multi-stage Dockerfile with nginx:
1. Build stage: Node 18, runs `npm run build`
2. Production stage: nginx:alpine serves static files
3. Port: 80 (configurable in docker-compose.yml)

Docker Compose profiles available: `dev`, `cache`, `analytics`, `production`

## PWA Features

- **Installable**: Prompt appears after 30 seconds of interaction
- **Offline**: Service Worker caches key routes and previously viewed products
- **Update Notifications**: `UpdateNotification` component shows when new version available
- **Offline Indicator**: Orange banner displays when `!isOnline`

## Known Issues and Considerations

1. **Performance Monitor Disabled**: `usePerformanceMonitor` commented out in App.jsx to improve dev performance
2. **Product Creation Disabled**: `createProductsFirestore` call commented out in App.jsx - enable only when migrating new products
3. **Firebase Config Exposed**: Firebase config in [src/firebase/config.js](src/firebase/config.js) contains API keys (safe for client-side Firebase apps, but should use env vars)
4. **Firestore Rules**: Currently permissive for `products` collection (`allow write: if true`) - tighten after migration complete

## Browser Support

See `browserslist` in [package.json](package.json):
- **Production**: >0.2%, not dead, not op_mini all
- **Development**: Last 1 version of Chrome, Firefox, Safari

## Node/NPM Requirements

- **Node**: >=18.0.0
- **npm**: >=9.0.0

Enforced via `engines` in package.json.
