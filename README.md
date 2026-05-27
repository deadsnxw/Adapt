# ADAPT - Nutrition Tracking Platform

ADAPT is a university diploma project focused on helping people manage nutrition in a simple, data-driven way.  
The platform allows users to track meals, monitor calories and macronutrients, and align eating habits with personal fitness goals.

## Project Overview

Many people struggle to keep a consistent and realistic nutrition routine. ADAPT solves this by combining:

- Easy daily meal logging
- Personalized user profile data (age, weight, activity level, goals)
- Nutrition insights based on consumed products
- A searchable food database, including external product data

The product is designed to be practical for everyday use and extensible for future health-related features.

## Business Value

- Promotes healthier lifestyle habits through clear daily tracking
- Reduces friction compared to manual tracking
- Supports goal-based nutrition planning (maintenance, weight change, etc.)
- Demonstrates full-stack development skills

## Core User Journey

1. User registers and creates a profile
2. User logs in securely
3. User searches for food products or creates custom entries
4. User adds products to daily meals (by date and meal type)
5. User reviews and adjusts diary entries over time

## Key Features

- Secure registration and login (JWT-based authentication)
- Personal profile management
- Product search with Open Food Facts integration
- Custom product management
- Daily diary CRUD operations for meals and consumed products

## Technology Summary

- Backend: Java 17, Spring Boot, Spring Security, Spring Data JPA, Flyway
- Frontend: React 19, Vite
- Database: PostgreSQL 16
- Infrastructure: Docker Compose for full local stack (frontend + backend + database)

## Architecture (High-Level)

- Frontend client for user interaction
- REST API backend for business logic and validation
- PostgreSQL for persistent data storage
- Flyway for database schema versioning
- JWT for stateless authentication and protected endpoints

## Repository Layout

```text
.
├── backend/
│   └── adapt/          # Spring Boot REST API
├── frontend/           # React client
└── docker-compose.yml  # PostgreSQL local setup
```

## Demo Readiness Notes

For portfolio-grade system purposes:

- Authentication and API security are implemented
- Product and diary management flows are implemented
- Backend data model and migrations are versioned
- Frontend currently includes base scaffold and can be extended to full product UI

## Technical Quick Start

### Prerequisites

- Java 17+
- Node.js 18+ and npm
- Docker and Docker Compose

### 1) Configure environment

Create `.env` in project root:

```env
POSTGRES_DB=adapt
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
JWT_SECRET=change_me_to_at_least_32_characters_secret_key
JWT_EXPIRATION=86400000
OPEN_FOOD_FACTS_URL=https://world.openfoodfacts.org
```

### 2) Start everything with Docker Compose

```bash
docker compose up --build -d
```

Frontend URL: `http://localhost:5173`  
Backend URL: `http://localhost:8080`

## API Snapshot

All API routes are under `/api`.

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- User: `GET/PUT/DELETE /api/users/me`
- Products: `GET /api/products/search`, `POST/PUT/DELETE /api/products`
- Diary: `GET /api/diary`, `POST/PUT/DELETE /api/diary/items`

## Security and Compliance Notes

- All endpoints except `/api/auth/**` require JWT authentication.
- Do not store real secrets (JWT keys, DB credentials) in version control.