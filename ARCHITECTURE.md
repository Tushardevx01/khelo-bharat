# Architecture

## Overview

Khelo Bharat follows a clean architecture approach with Feature-Driven Development (FDD).

## Principles

- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Clean Architecture** - Separation of concerns between layers
- **Repository Pattern** - Abstracted data access
- **Service Layer** - Business logic isolation
- **Domain Separation** - Feature-based organization

## Layers

### Presentation Layer
- App Router pages and layouts
- React components (UI and feature)
- Client-side state management

### Application Layer
- Server Actions
- API Routes
- Request/Response handling

### Domain Layer
- Services (Business Logic)
- Repositories (Data Access)
- Types and Interfaces

### Infrastructure Layer
- Database (Prisma + PostgreSQL)
- External Services (Cloudinary, Nodemailer)
- Authentication (Clerk)

## Data Flow

1. User interacts with UI Component
2. Component calls Server Action or API Route
3. Server Action calls Service
4. Service executes business logic
5. Service calls Repository for data
6. Repository interacts with Prisma
7. Response flows back through layers

## Security

- Clerk Authentication
- Role-Based Access Control (RBAC)
- Protected Routes and API
- Input Validation (Zod)
- CSRF Protection
- Rate Limiting
