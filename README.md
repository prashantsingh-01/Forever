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

### 🖼️ High-Level Visual


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
