# 🛒 Forever: Scalable MERN E-Commerce Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://mongodb.com)
[![Docker Support](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Load_Balancer-Nginx-green.svg)](https://nginx.org)

**Forever** is a production-ready, full-stack e-commerce solution engineered for high performance and horizontal scalability. It goes beyond a basic CRUD app by implementing advanced architectural patterns like **Load Balancing**, **Distributed Caching**, and **Reverse Proxying**.



---

## 🌐 Live Demo

* **Frontend (Customer UI):** [forever-frontend-psi-nine.vercel.app](https://forever-frontend-psi-nine.vercel.app/)
* **Admin Panel:** [forever-admin-psi-dun.vercel.app/add](https://forever-admin-psi-dun.vercel.app/add)

---

## 🏗️ System Architecture & Design

Forever uses a high-availability architecture designed to handle traffic spikes and ensure data consistency.

### 🖼️ High-Level Architecture


```mermaid
graph TD
    User((User)) -->|HTTPS| Frontend[React + Vite SPA]
    Frontend -->|API Requests| Nginx{Nginx Load Balancer}
    
    subgraph "Application Cluster"
        Nginx -->|Round Robin| S1[Express Instance 1]
        Nginx -->|Round Robin| S2[Express Instance 2]
        Nginx -->|Round Robin| S3[Express Instance 3]
    end

    subgraph "Data & Caching Layer"
        S1 & S2 & S3 -->|1. Check Cache| Redis[(Redis Cache)]
        S1 & S2 & S3 -->|2. Fallback / Write| DB[(MongoDB Atlas)]
        DB -.->|3. Update| Redis
    end

    subgraph "External Services"
        S1 & S2 & S3 --- Cloudinary(Cloudinary - Media)
        S1 & S2 & S3 --- Payments(Stripe / Razorpay)
    end


### 🔁 Request Flow
1.  **Client Tier:** Users interact with a high-performance **React 19** SPA powered by **Vite**.
2.  **Gateway Tier:** **Nginx** acts as the entry point, performing SSL termination and Round-Robin load balancing across multiple Node.js instances.
3.  **Application Tier:** Stateless **Express** instances process business logic and verify **JWT** credentials.
4.  **Cache Tier:** Frequently accessed data (Product lists/Carts) is served via **Redis (Upstash)** using a *Cache-Aside* strategy.
5.  **Data Tier:** **MongoDB** serves as the primary source of truth for persistent storage.

---

## ✨ Key Features

* **🔐 Secure Auth:** Robust JWT-based authentication with role-based access control (RBAC).
* **💳 Dual Payment Gateways:** Integrated with **Stripe** and **Razorpay** for global/local transactions.
* **⚡ High Performance:** Sub-millisecond data retrieval for hot-path data via Redis.
* **🖼️ Media Management:** Automated image optimization and storage using **Cloudinary**.
* **🧑‍💼 Admin Intelligence:** Comprehensive dashboard for product inventory and order lifecycle tracking.
* **🐳 DevOps Optimized:** Fully containerized with Docker and orchestrated via Docker Compose.

---

## 🧱 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose ODM) |
| **Cache** | Redis (Upstash) |
| **Auth** | JWT, Bcrypt |
| **Payments** | Stripe, Razorpay |
| **Media** | Cloudinary |
| **DevOps** | Docker, Nginx, Docker Compose |

---

## ⚙️ Getting Started

### 📌 Prerequisites
* Node.js (v18+)
* Docker Desktop (Recommended)
* MongoDB Atlas Account
* Cloudinary API Keys

### 📥 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <repo-url>
    cd Forever
    ```

2.  **Environment Configuration**
    Create a `.env` file in the `backend/` directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=name
    CLOUDINARY_API_KEY=key
    CLOUDINARY_API_SECRET=secret
    STRIPE_SECRET_KEY=sk_test_...
    UPSTASH_REDIS_REST_URL=url
    UPSTASH_REDIS_REST_TOKEN=token
    ```

3.  **Run with Docker (Recommended)**
    ```bash
    docker-compose up --build
    ```

4.  **Manual Development Mode**
    * **Backend:** `cd backend && npm install && npm run server`
    * **Frontend:** `cd frontend && npm install && npm run dev`

---

## 📡 API Reference (Summary)

### User Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/user/register` | Register a new customer |
| `POST` | `/api/user/login` | Authenticate & get JWT |

### Product Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/product/list` | Fetch all products (Cached) |
| `POST` | `/api/product/add` | Create product (Admin only) |

---

## 📁 Directory Structure

```text
Forever/
├── admin/            # Admin Panel UI
├── backend/          # Express API & Business Logic
│   ├── config/       # DB & Third-party configs
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose Schemas
│   └── routes/       # API Route definitions
├── frontend/         # Customer-facing React App
├── nginx/            # Reverse proxy configuration
└── docker-compose.yaml
