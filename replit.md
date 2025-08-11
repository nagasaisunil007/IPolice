# iPolice - Crime Reporting and Community Safety App

## Overview

iPolice is a full-stack web application designed to enable citizens to report crimes and safety violations while building a community-driven safety network. The app features a gamified experience with points, ranks, and rewards to encourage active participation in community safety reporting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server code:

- **Frontend**: React-based SPA with TypeScript and Vite for fast development
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: Radix UI components with Tailwind CSS for consistent styling
- **File Handling**: Multer for media upload processing
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Component Library**: Extensive use of shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Mobile-First Design**: Responsive design optimized for mobile usage

### Backend Architecture
- **API Design**: RESTful endpoints organized under `/api` prefix
- **File Storage**: Local file storage in `uploads/` directory for media files
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request logging
- **Data Access**: Repository pattern with PostgreSQL database implementation using Drizzle ORM

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Users**: Authentication, profile info, points, ranks, and levels
- **Reports**: Crime/violation reports with media attachments and verification status
- **Rewards**: Point-based reward system for user engagement
- **Activities**: User activity tracking for gamification features

### Authentication Strategy
- Simple username/password authentication (basic implementation)
- User sessions tracked through the application state
- No JWT or advanced session management currently implemented

## Data Flow

1. **Report Creation**: Users submit reports with optional media files → API processes and stores data → Updates user points and activities
2. **Gamification**: Point accumulation → Rank calculations → Reward eligibility → Activity logging
3. **Content Management**: Media files uploaded to local storage → URLs stored in database → Served via Express static middleware

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Database connection for Neon PostgreSQL
- **drizzle-orm & drizzle-kit**: Type-safe ORM and migrations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **multer**: File upload handling

### UI Dependencies
- **Radix UI**: Complete suite of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component system

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **ESBuild**: Production bundling for server code

## Deployment Strategy

The application is configured for deployment with:

- **Development**: Vite dev server with HMR and Express API
- **Production Build**: 
  - Client: Vite builds to `dist/public`
  - Server: ESBuild bundles to `dist/index.js`
- **Database**: Drizzle migrations with PostgreSQL (currently configured for Neon)
- **File Storage**: Local filesystem (uploads directory)

### Build Process
1. `npm run build` creates production builds for both client and server
2. `npm run start` runs the production server
3. Database schema managed via `npm run db:push`

The application is structured to run on platforms that support Node.js with file system access for media storage. The current setup assumes a single-server deployment model.

## Recent Changes

Latest modifications with dates:
- **Bengaluru-Only Location Restriction** (July 26, 2025): Implemented comprehensive location filtering to restrict app usage to Bengaluru only, including coordinate validation, Bengaluru area mapping, and fallback to default Bengaluru locations when outside boundaries
- **Enhanced Camera Functionality** (July 26, 2025): Fixed camera opening issues with better error handling, fallback constraints, and improved video element setup with metadata loading
- **Report Submission Navigation Fix** (July 26, 2025): Updated report submission flow to navigate to /view-reports page instead of home page after successful submission
- **Bengaluru Branding Updates** (July 26, 2025): Updated app titles and descriptions to reflect Bengaluru-specific focus with "iPolice Bengaluru" branding and location-specific messaging
- **Firebase Realtime Database Migration** (July 26, 2025): Successfully migrated from PostgreSQL to Firebase Realtime Database with complete CRUD operations, error handling, and sample data seeding
- **Firebase Integration Completion** (July 26, 2025): Implemented comprehensive Firebase Storage class with all required methods, fixed URL formatting issues, and ensured seamless data flow
- **Mobile-Friendly Scrolling Improvements** (Previous): Removed visible scrollbars from Top Contributors and Rewards Store sections for cleaner mobile experience
- **Firebase Setup Documentation** (July 26, 2025): Created detailed Firebase setup guide and configuration files for easy deployment and maintenance
- **Leaderboard UX Enhancement** (January 21, 2025): Consolidated top contributors and leaderboard into single container, enhanced visual hierarchy with top 3 highlighting
- **Complete Feature Set**: All core features implemented and working with Firebase - reporting, viewing reports, rewards store with leaderboard, and user profile
- **Mobile APK Conversion** (July 27, 2025): Implemented complete mobile APK conversion pipeline with Cordova, including Firebase Realtime Database integration for offline-first mobile experience
- **Firebase Real-time Integration** (July 27, 2025): Migrated all data operations to Firebase Realtime Database with mobile-optimized features, offline support, and real-time synchronization
- **Mobile Camera Enhancement** (July 27, 2025): Enhanced mobile camera functionality with image compression, Base64 storage, and multiple fallback options for APK environment
- **APK Build System** (July 27, 2025): Created automated APK build pipeline with Cordova configuration, plugin management, and comprehensive setup documentation
- **APK Issues Resolution** (July 29, 2025): Fixed critical APK deployment issues - camera now opens native camera instead of gallery, Firebase integration working with proper environment configuration, comprehensive troubleshooting guide created
- **Dynamic AI Profile Avatars** (July 29, 2025): Implemented sophisticated AI-generated profile avatar system with 8 different styles (modern, vibrant, elegant, etc.), 8 background patterns (circles, waves, triangles, etc.), rank-based enhancements for top 3 users (gold/silver/bronze effects), and dynamic color gradients based on user names
- **Complete Database Cleanup** (July 29, 2025): Successfully removed all PostgreSQL, Drizzle ORM, and other database dependencies - project now uses only Firebase Realtime Database for all data operations, greatly simplifying APK deployment and removing dependency conflicts
- **Critical APK Issues Resolution** (July 31, 2025): Fixed major camera and Firebase issues preventing APK functionality - implemented cordova-plugin-camera for native camera access replacing web getUserMedia(), created Firebase-Cordova compatibility layer with proper CSP headers, developed universal camera manager that works in both web and APK environments, updated build process with APK-specific configurations
- **Authentication System Production Cleanup** (July 31, 2025): Removed all dummy user accounts from authentication system while preserving Firebase database data, implemented clean production-ready phone-based authentication flow, removed hardcoded test credentials and OTP codes
- **Mobile Responsive Authentication UI** (July 31, 2025): Completely redesigned splash and login screens for full mobile responsiveness, optimized for APK deployment with proper touch targets, responsive typography, and mobile-safe layouts that work across all Android screen sizes and orientations