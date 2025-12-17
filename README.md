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

## ✉️ Email Functionality (Development Only)

This project includes a complete transactional email system supporting:

- Welcome emails after signup
- Password reset emails
- Secure reset token generation
- HTML + text email templates

Email delivery uses Brevo SMTP + Nodemailer.

### Why Development Only?

- Brevo requires a verified domain for production SMTP
- This project does not use a verified domain
- Render free-tier backend cannot send SMTP without domain verification
- To avoid exposing production credentials, email sending is enabled only during local development

The feature remains fully implemented for demonstration and portfolio purposes.
To enable production email, configure your domain in Brevo and update config.env.

## 💳 Payments (Stripe — Test Mode)

- Secure tour booking via Stripe Checkout
- Backend-generated Stripe Checkout Sessions
- Authenticated payment initiation
- Redirect-based hosted checkout flow
- Proper success and cancel redirects
- Error handling during payment initialization

Note:
Payments are implemented using Stripe Test Mode only. The full payment flow is functional and demonstrable, but live payments are not enabled due to Stripe account verification and regional availability constraints.

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

7. Stripe Configuration (Optional)
   To test the payment flow locally:

- Create a Stripe account
- Enable Test Mode
- Add the following environment variables to config.env (backend):

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

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
- Stripe payments are implemented using Stripe Checkout in test mode.
- The integration follows Stripe’s current recommended approach.
- Payment logic is separated cleanly between frontend and backend.
- Webhook-based booking confirmation can be enabled once live payments are supported.
