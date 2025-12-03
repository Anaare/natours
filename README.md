# Natours 🌍

A full-stack web application for browsing and booking nature tours. The backend is built with Node.js, Express, MongoDB, and Mongoose, while the frontend was recreated from the original Pug template into a modern React/TypeScript application for a more dynamic and component-based UI.

---

## Features

## 🔐 Authentication & User Management

✅ User signup and login
✅ JWT-based authentication
✅ Secure cookies
✅ Update user data (name, email, password)

## 🌍 Tours

✅ Browse all tours
✅ View single tour details
✅ Fully RESTful API for tours (CRUD functionality on backend)

## 📸 UI & Frontend

✅ React + TypeScript recreation of the original Pug-based UI
✅ Modern component structure
✅ Dynamic pages for overview, tour details, etc.
✅ Centralized fetching logic
✅ Clean routing with React Router
✅ Styled to closely replicate the original Natours design

## 🗄️ Backend

✅ REST API using Express
✅ MongoDB database using Mongoose
✅ API features: filtering, sorting, pagination
✅ Authentication, authorization, password reset
✅ Error handling with custom AppError class
✅ Security middleware (rate limiting, sanitization, etc.)

## Demo

**Live demo:**

---

## Tech Stack

### Frontend

✅ React.js + TypeScript
✅ React Router
✅ CSS
✅ Custom hooks for fetching
✅ Component-based architecture
✅ React Context

### Backend

✅ Node.js & Express
✅ MongoDB + Mongoose
✅ JWT authentication
✅ Nodemailer for emails (e.g., password reset)
✅ MVC architecture

### Deployment

---

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/Anaare/natours.git
   cd natours
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Create Backend Environment Variables:

   - Create a config.env file inside the /backend folder.

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=your_mongodb_connection_string
   DATABASE_PASSWORD=your_db_password

   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90

   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   EMAIL_HOST=your_host
   EMAIL_PORT=your_port
   ```

4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

5. Run the app (frontend and backend together):

```bash
npm run dev
```

6. Open your browser to http://localhost:5173

## Usage

### 🌍 Browse Tours

✅ Visit the home page (Overview) to see a list of tours.
✅ Click any tour card to view its full details.

### 👤 Manage Account

✅ Log in or sign up
✅ Update name, email, and password
✅ View your user details

### 🔐 Protected Routes

✅ Some pages require authentication
✅ JWT token stored in HTTP-only cookies

## Notes

✅ This project is based on the Natours app from Jonas Schmedtmann’s Node.js course.
✅ I rebuilt the entire frontend UI from Pug templates into a modern React/TypeScript application to make the project more scalable and maintainable.
✅ The backend structure follows the original MVC layout, with improvements where needed.
