# replit.md

## Overview
This is a complete, production-ready Firebase authentication demo and template built with React 18, TypeScript, and modern web technologies. The application showcases secure Google OAuth authentication with popup/redirect fallback mechanisms, comprehensive user management, and responsive design. It's designed as an open-source template for developers and AI agents to quickly implement Firebase authentication in their projects.

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

### Authentication Data
- **User Management**: Firebase handles all user data and authentication state
- **Session Persistence**: Automatic session management with Firebase SDK
- **User Information**: Complete user profiles including email, display name, photo URL
- **Authentication Status**: Real-time auth state updates throughout the application

### Authentication System
- **Provider**: Firebase Authentication  
- **Methods**: Google OAuth with popup and redirect fallback
- **Session Management**: Firebase auth state persistence with React Context
- **Route Protection**: Protected route wrapper component for authenticated access
- **User Interface**: Clean login page with Google sign-in and comprehensive dashboard
- **Error Handling**: Automatic fallback from popup to redirect when popups are blocked

### Project Structure
- **Shared**: Common types and schemas for consistent data handling
- **Client**: React application with components, pages, hooks, and utilities
- **Server**: Express API with Vite integration for development
- **Documentation**: Comprehensive guides for setup, deployment, and development
- **Configuration**: TypeScript paths for clean imports and development tooling

### Open Source Documentation
- **README.md**: Complete project documentation with setup instructions
- **FIREBASE_SETUP.md**: Detailed Firebase configuration guide
- **DEPLOYMENT.md**: Platform-specific deployment instructions  
- **.env.example**: Environment variable template
- **AI Agent Instructions**: Clear guidelines for AI agents to implement this template

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