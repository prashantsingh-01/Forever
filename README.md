# 🛍️ Forever Ecommerce Store

A **modern, full-featured ecommerce platform** built with a scalable architecture and cutting-edge tech stack.

---

## 🌐 Live Demo

- **Frontend (Customer UI):** [forever-frontend](https://forever-frontend-psi-nine.vercel.app/)
- **Admin Panel:** [forever-admin](https://forever-admin-psi-dun.vercel.app/add)

---

## 🏗️ Project Structure

forever-ecommerce/  
├── admin/ # Admin Panel (Vite + React)  
├── frontend/ # Customer Storefront (Vite + React)  
└── backend/ # API Server (Node.js + Express + MongoDB)

---

## ⚙️ Environment Variables

### 🔁 Backend (`/backend/.env`)

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 🌐 Frontend (`/frontend/.env`)

```
VITE_BACKEND_URL=your_backend_api_url
```

### 🛠️ Admin Panel (`/admin/.env`)

```
VITE_BACKEND_URL=your_backend_api_url
```

⚠️ Replace all placeholder values with your actual environment-specific credentials and URLs.

---

## 📦 Installation & Setup

1. Clone the Repository

```
git clone https://github.com/yourusername/forever-ecommerce.git
cd forever-ecommerce
```

2. Install Dependencies

```
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Panel
cd ../admin
npm install
```

3. Create Environment Files
   Create .env files in each of the three folders (backend, frontend, admin) and fill them as shown above.

4. Run Development Servers
   Open three separate terminal tabs or windows:

```
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

# Admin Panel
cd admin
npm run dev
```

---

## 🚀 Features

### 🧑 Customer (Frontend)

- Product browsing & search
- Cart and checkout system
- User signup/signin
- Payment integration via Stripe

### 👨‍💼 Admin Panel

- Add, Delete products
- Manage users and orders
- Upload images via Cloudinary
- Secure login for admin access

## 🖥️ Backend API

- RESTful endpoints
- JWT authentication
- MongoDB with Mongoose
- Stripe integration
- Cloudinary image upload

### 🛠️ Tech Stack

- Frontend & Admin: Vite + React + TailwindCSS
- Backend: Node.js + Express + MongoDB + Mongoose
- Auth: JWT
- Payments: Stripe
- Media Uploads: Cloudinary
- Deployment: Vercel (Frontend & Admin), Render/Heroku (Backend)

## 🙌 Acknowledgements

- React
- Express
- MongoDB
- Cloudinary
- Stripe
