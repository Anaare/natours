# Natours 🌍

A full-stack web application for browsing and booking nature tours. The backend is built with Node.js, Express, MongoDB, and Mongoose, while the frontend was recreated from the original Pug template into a modern React/TypeScript application for a more dynamic and component-based UI.

---

## Features

## 🔐 Authentication & User Management

- User signup and login
- JWT-based authentication
- Secure cookies
- Update user data (name, email, password)

## 🌍 Tours

- Browse all tours
- View single tour details
- Fully RESTful API for tours (CRUD functionality on backend)

## 📸 UI & Frontend

- React + TypeScript recreation of the original Pug-based UI
- Modern component structure
- Dynamic pages for overview, tour details, etc.
- Centralized fetching logic
- Clean routing with React Router
- Styled to closely replicate the original Natours design

## 🗄️ Backend

- REST API using Express
- MongoDB database using Mongoose
- API features: filtering, sorting, pagination
- Authentication, authorization, password reset
- Error handling with custom AppError class
- Security middleware (rate limiting, sanitization, etc.)

## Demo

🔗 **Live Application (Frontend)**: https://natours-v1-inky.vercel.app/

🔗 **API Endpoint (Backend)**: https://natours-x62c.onrender.com/api/v1/tours

---

## Tech Stack

### Frontend

- React.js + TypeScript
- React Router
- CSS
- Custom hooks for fetching
- Component-based architecture
- React Context

### Backend

- Node.js & Express
- MongoDB + Mongoose
- JWT authentication
- Nodemailer for emails (e.g., password reset)
- MVC architecture

### Deployment

| Component    | Host               | Key Technology               |
| :----------- | :----------------- | :--------------------------- |
| **Frontend** | Vercel             | Vercel CLI / Git Integration |
| **Backend**  | Render (Free Tier) | Node.js Web Service          |
| **Database** | MongoDB Atlas      | Cloud-hosted M0 Cluster      |

---

## Getting Started

1. Clone the repo and navigate to the project root:
      `bash
   git clone [https://github.com/Anaare/natours.git](https://github.com/Anaare/natours.git)
   cd natours
   `
2. Install Backend Dependencies:
      `bash
   cd backend
   npm install
   cd ..
   `
3. Install Frontend Dependencies:
      `bash
   cd frontend
   npm install
   cd ..
   `
4. Create Backend Environment Variables: (Keep this step)
5. Run the app (frontend and backend together):
      `bash
   # Assuming your package.json in the project root runs both servers concurrently
   npm run dev
   `

## Usage

### 🌍 Browse Tours

- Visit the home page (Overview) to see a list of tours.
- Click any tour card to view its full details.

### 👤 Manage Account

- Log in or sign up
- Update name, email, and password
- View your user details

### 🔐 Protected Routes

- Some pages require authentication
- JWT token stored in HTTP-only cookies

### ⚡ Dynamic Interactivity

- **Centralized State Management:** User authentication state is managed via React Context and securely persists across pages using HTTP-only cookies.

## Notes

- This project is based on the Natours app from Jonas Schmedtmann’s Node.js course.
- I rebuilt the entire frontend UI from Pug templates into a modern React/TypeScript application to make the project more scalable and maintainable.
- The backend structure follows the original MVC layout, with improvements where needed.
