# Secure Task Manager API

A complete end-to-end full-stack project demonstrating a scalable backend architecture, authentication, role-based access control (RBAC), and a responsive React frontend interface to interact with the APIs.

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for secure password hashing
- Express Validator for rigorous input validation
- Morgan for HTTP request logging
- Swagger UI for comprehensive API documentation

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

## Project Overview

The Secure Task Manager allows users to securely register, log in, and manage their own tasks. The backend enforces complete data isolation between regular users, while `admin` users have overarching access to view all tasks in the system.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)

### 1. Clone & Install Dependencies
First, install backend dependencies:
```bash
cd backend
npm install
```

Then, install frontend dependencies:
```bash
cd frontend
npm install
```

### 2. Environment Variables
In the `backend` directory, rename `.env.example` to `.env` and fill in your details:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/secure-task-manager
JWT_SECRET=your_jwt_secret_key
```

### 3. Run the Application

Start the **backend** server:
```bash
cd backend
npm run dev
```

Start the **frontend** development server:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend will start at `http://localhost:5000`.

## API Endpoints (`/api/v1`)

### Authentication (`/auth`)
- `POST /auth/register` - Create a new user (Requires `name`, `email`, `password`)
- `POST /auth/login` - Authenticate user and receive JWT

### Tasks (`/tasks`)
- `GET /tasks` - Retrieve tasks (Users see own tasks; Admins see all tasks)
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update task details (Owner or Admin only)
- `DELETE /tasks/:id` - Delete task (Owner or Admin only)

> Access full API documentation (Swagger) by navigating to: `http://localhost:5000/api-docs`

## Scalability Considerations

This application is built with a modular foundation, allowing it to scale securely in a production environment:

1. **Stateless Authentication**: Using JWT ensures server instances do not need to maintain session states, making horizontal scaling simple and effective.
2. **Microservices Architecture**: The modular file structure (`controllers`, `routes`, `models`) is prime for decoupling. The `Auth` and `Tasks` domains could easily be split into distinct microservices if loads require independent scaling.
3. **Caching Layer (Redis)**: Frequently accessed queries, such as an Admin's `GET /tasks`, can be cached using Redis to drastically reduce MongoDB load and improve response times.
4. **Containerization**: Wrapping the Node.js backend and React frontend into Docker images enables uniform deployments across any orchestrator like Kubernetes or AWS ECS.
5. **Load Balancing**: Deploying behind an Nginx reverse proxy or an API Gateway will seamlessly distribute incoming traffic across multiple backend instances to guarantee high availability.
