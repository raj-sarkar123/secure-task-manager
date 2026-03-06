# Secure Task Manager API

A full-stack project demonstrating a scalable backend system with authentication, role-based access control (RBAC), secure REST APIs, and a responsive React frontend for interacting with the APIs.

This project was developed as part of the **Backend Developer Internship Assignment** to showcase backend architecture, security practices, and API integration with a frontend UI.

---

## **Tech Stack**

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt Password Hashing
- Express Validator
- Morgan Logging
- Swagger API Documentation

### **Frontend**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

---

## **Project Overview**

Secure Task Manager allows users to:

- Register and log in securely
- Manage personal tasks
- Perform CRUD operations on tasks
- Access protected routes using JWT authentication

The backend enforces **Role-Based Access Control**.

| Role | Permissions |
|-----|-------------|
| **User** | Manage only their own tasks |
| **Admin** | View and manage all tasks |

---


Admin users can:
- View all users' tasks
- Update any task
- Delete any task

---

## **Features Implemented**

### **Authentication**
- User Registration
- Secure Login
- Password Hashing with Bcrypt
- JWT Token Authentication

### **Role-Based Access Control**
- Admin vs User permissions
- Middleware-based authorization

### **Task Management (CRUD)**
- Create Task
- Get Tasks
- Update Task
- Delete Task

### **API Security**
- JWT Authentication
- Input Validation
- Error Handling Middleware
- Secure Password Storage

### **Frontend UI**
The React frontend allows users to:
- Register new accounts
- Login securely
- Access protected dashboard
- Create, update, delete tasks
- View tasks based on role permissions
- Receive API success/error feedback

---

## **Project Structure**

secure-task-manager
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   └── api
│
├── secure-tasks-postman-collection.json
└── README.md

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v16+)
- MongoDB (local or Atlas)

### **1. Clone Repository**

git clone https://github.com/YOUR_USERNAME/secure-task-manager.git  
cd secure-task-manager

### **2. Install Backend Dependencies**

cd backend  
npm install

### **3. Install Frontend Dependencies**

cd frontend  
npm install

### **4. Environment Variables**

Create a `.env` file inside the **backend** folder.

PORT=5000  
MONGO_URI=mongodb://localhost:27017/secure-task-manager  
JWT_SECRET=your_jwt_secret  

### **5. Run the Application**

Start the backend

cd backend  
npm run dev  

Start the frontend

cd frontend  
npm run dev  

Frontend: http://localhost:5173  
Backend: http://localhost:5000

---

## **API Endpoints**

Base URL: /api/v1

### **Authentication**

POST /auth/register  
POST /auth/login

### **Tasks**

GET /tasks  
POST /tasks  
PUT /tasks/:id  
DELETE /tasks/:id

---

## **API Documentation**

Swagger documentation available at:

http://localhost:5000/api-docs

---

## **Postman Collection**

Included in the repository:

secure-tasks-postman-collection.json

Steps to test APIs:

1. Open Postman
2. Click Import
3. Select the JSON file
4. Run requests in order:
   - Register User
   - Login User
   - Create Task
   - Get Tasks
   - Update Task
   - Delete Task

---
## Demo Credentials

Credentials will be shared with reviewers during submission.

## **Scalability Considerations**

**Stateless Authentication**
JWT allows easy horizontal scaling.

**Modular Architecture**
Controllers, routes, and middleware are separated.

**Caching**
Redis can be added for frequently accessed queries.

**Containerization**
Docker can be used for consistent deployments.

**Load Balancing**
Nginx or API Gateway can distribute traffic across multiple backend instances.
