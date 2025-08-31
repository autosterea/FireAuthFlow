# replit.md

## Overview
This is a full-stack web application built with React frontend and Express backend, featuring Firebase authentication and PostgreSQL database integration. The application uses modern development tools including Vite for build tooling, Drizzle ORM for database management, and shadcn/ui components for the user interface. The system implements a clean separation between client and server code with shared schemas and types.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build system
- **UI Library**: shadcn/ui components with Radix UI primitives and Tailwind CSS styling
- **Routing**: wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and React Context for authentication
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Authentication**: Firebase Auth with email/password, Google, and GitHub sign-in options

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Storage**: In-memory storage with interface for future database integration
- **Development**: Hot reload with Vite middleware integration

### Data Storage
- **Primary Database**: PostgreSQL via Neon Database serverless connection
- **ORM**: Drizzle with schema definitions in shared directory for type safety
- **Migrations**: Drizzle Kit for database schema management
- **Schema Validation**: Zod schemas generated from Drizzle tables for runtime validation

### Authentication System
- **Provider**: Firebase Authentication
- **Methods**: Email/password, Google OAuth, GitHub OAuth
- **Session Management**: Firebase auth state persistence with React Context
- **Route Protection**: Protected route wrapper component for authenticated access
- **User Interface**: Custom login page with form validation

### Project Structure
- **Shared**: Common types and database schemas used by both client and server
- **Client**: React application with components, pages, hooks, and utilities
- **Server**: Express API with routes, storage interface, and Vite integration
- **Configuration**: TypeScript paths for clean imports and development tooling

### Build and Development
- **Development**: Concurrent client (Vite) and server (tsx) development with hot reload
- **Production**: Static client build served by Express with API routes
- **Database**: Push-based schema updates with Drizzle migrations
- **Environment**: Replit-optimized with development banner and error overlay

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect

### Authentication Services
- **Firebase Authentication**: Google's authentication service with multiple provider support

### Frontend Libraries
- **React Ecosystem**: React 18, React DOM, React Router (wouter)
- **UI Components**: Radix UI primitives, Lucide icons, class-variance-authority
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form, Hookform Resolvers for Zod integration
- **Data Fetching**: TanStack Query for server state management

### Development Tools
- **Build Tools**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with path mapping
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Replit Integration**: Vite plugins for error overlay and development banner

### Utility Libraries
- **Validation**: Zod for runtime type checking and schema validation
- **Styling Utilities**: clsx and tailwind-merge for conditional classes
- **Date Handling**: date-fns for date manipulation
- **UI Enhancement**: cmdk for command palette, embla-carousel for carousels