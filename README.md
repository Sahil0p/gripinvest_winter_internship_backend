# Mini Investment Platform

This is a MERN-style project (Node/Express + React) with MySQL, Docker, and basic AI stubs.
Follow instructions below to run the full stack with Docker.

## Quick start

1. Build and run:
```bash
docker-compose up --build -d
```

2. Frontend: http://localhost:3000  
   Backend API: http://localhost:5000  
   Health: http://localhost:5000/health

Seeded credentials (dev):
- Admin: admin@invest.local / Admin@123
- Demo: demo@invest.local / Demo@123

To force reseed:
```bash
FORCE_SEED=true docker-compose up --build
```

