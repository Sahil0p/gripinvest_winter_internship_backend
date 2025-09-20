# GripInvest Mini Investment Platform

## Overview

This project is a full-stack mini investment platform built as part of the GripInvest Winter Internship assignment. It includes Backend APIs, Frontend React application, and DevOps Docker containerization to simulate a real-world investment platform.

---

## Features

### Backend

- User Authentication: Signup, Login, JWT-based authentication, Password Reset via OTP/email.
- Investment Products CRUD: Admin can create, update, delete products; users can view product lists.
- Investments: Users can invest in products, view portfolio with returns and AI-generated insights.
- Transaction Logs: Logs every API call with detailed status and errors; supports filtering.
- AI Integrations: Password strength suggestions, product description generation, portfolio insights, error summarization.
- Unit tests for backend modules with Jest (>75% coverage).
- Health check endpoint and structured logs.

### Frontend

- React.js with TailwindCSS for responsive UI.
- Authentication pages with JWT token management.
- Dashboard with portfolio snapshot and AI insights.
- Products listing with filters and AI recommendations.
- Investment form and portfolio view with charts.
- Transaction logs table with AI error summaries.
- Profile management including risk appetite update.
- Unit tests with Jest & React Testing Library (>75% coverage).

### DevOps

- Backend, Frontend, and MySQL running in Docker containers via `docker-compose`.
- Health endpoint monitoring service and DB status.
- Container logs accessible via Docker.
- Database schema and seed data included.

---

## Getting Started

### 1. Prerequisites

- Node.js >= 16.0
- npm/yarn
- Docker & Docker Compose
- MySQL server or use included MySQL Docker container

### 2. Backend Setup
- cd backend
- npm instal
- cd backend
- npm install
- cp .env.example .env
- # Edit .env with your MySQL credentials and JWT secrets
- npm run migrate    # Run Sequelize migrations
- npm run seed       # Seed test data (optional)
- npm start          # Start backend on localhost:5000

### 3. Frontend Setup

- cd ../frontend
- npm install
- cp .env.example .env
- # Update API URL if needed (default: http://localhost:5000/api)
- npm start          # Start React app on localhost:3000

### 4. Docker Setup (Alternative to manual startups)

- docker-compose up --build
- Runs backend, frontend, and MySQL in containers.
- Health endpoints available at /health.
- Docker logs accessible using docker logs <container-name>.

## Running Tests
### Backend:

- cd backend
- npm test     # Runs Jest tests with coverage report


### Frontend:

- cd frontend
- npm test     # Runs React Testing Library tests with coverage

## Postman Collection
- Import postman/GripInvest_API_Collection.json into Postman.
- Configure environment variables:
- baseUrl: Backend API URL, e.g., http://localhost:5000/api.
- token: JWT token obtained after login.
- Run API tests for automated verification.

# AI Usage
- Password strength validation during signup.
- Auto-generated product descriptions from structured data.
- AI-driven portfolio insights (risk/return).
- Transaction log error summarization.
- Jest tests implement mocks for AI modules for robust testing.
