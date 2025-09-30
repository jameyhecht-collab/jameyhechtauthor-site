# Dr. Jamey Hecht Author Website

## Overview

This is a sophisticated author website for Dr. Jamey Hecht, featuring his dual identity as both a scholar and literary author. The site showcases his published works in literature, psychoanalysis, and poetry, while prominently featuring his unpublished manuscript "Into Theism: Overcoming Obstacles to Belief in God" that is seeking publication. The platform includes an integrated book store for selling physical copies from his personal collection and serves as a professional portfolio for literary agents, publishers, and academic collaborators.

## Recent Changes (September 30, 2025)

### Route-Based Navigation Architecture
The site has been refactored from anchor-based navigation to dedicated route-based navigation to enable proper domain redirection strategies. Key pages now have individual routes:

- `/` - Homepage/landing page (HeroSection only)
- `/into-theism` - Manuscript showcase page (enables www.intotheism.com → www.jameyhechtauthor.com/into-theism redirect)
- `/published-works` - Published works page
- `/about` - About page with Substack feed integration
- `/contact` - Contact page
- `/shop` - Bookshop (Stripe-integrated e-commerce)
- `/success` - Post-purchase confirmation page
- `/request-proposal` - Literary agent proposal request page

This architecture enables clean server-side redirects from dedicated domains (like www.intotheism.com) to specific sections of the main portfolio site.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system based on literary and academic aesthetics
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Typography**: Google Fonts integration (Crimson Text serif for literary elegance, Source Sans Pro for clean navigation)
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the full stack
- **API Design**: RESTful API with structured route handlers
- **Request Validation**: Zod schemas for runtime type checking and validation
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Centralized schema definitions in shared TypeScript files
- **Data Models**: User management system and book catalog with server-controlled pricing

### Design System
- **Color Palette**: Sophisticated burgundy accents with warm cream/charcoal base colors
- **Layout**: Single-column layouts with generous margins optimized for reading (65ch max width)
- **Spacing**: Consistent Tailwind spacing units (4, 8, 12, 16) for visual hierarchy
- **Interactive States**: Custom hover and active states with elevation effects
- **Dark Mode**: Built-in theme switching capability with CSS custom properties

### Payment Integration
- **Payment Processor**: Stripe integration for secure book sales
- **Checkout Flow**: Server-side session creation with client-side redirection
- **Security**: Server-controlled pricing prevents client-side price manipulation
- **Success Handling**: Dedicated success page with order confirmation

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Build Tools**: Vite with TypeScript support and development plugins
- **Routing**: Wouter for lightweight client-side navigation

### UI and Styling
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Design System**: shadcn/ui component collection with custom theming
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Typography**: Google Fonts (Crimson Text, Source Sans Pro)

### Database and Backend
- **Database**: Neon PostgreSQL serverless with connection pooling
- **ORM**: Drizzle ORM with PostgreSQL dialect and migration support
- **Server**: Express.js with TypeScript and middleware support
- **Session Storage**: connect-pg-simple for PostgreSQL session persistence

### Payment Processing
- **Stripe**: Full Stripe integration with React components (@stripe/stripe-js, @stripe/react-stripe-js)
- **Security**: Server-side checkout session creation and webhook handling

### Development Tools
- **Type Safety**: TypeScript with strict configuration and path mapping
- **Validation**: Zod for runtime schema validation and type inference
- **Development**: Replit-specific plugins for enhanced development experience
- **Build**: ESBuild for fast server bundling and optimization