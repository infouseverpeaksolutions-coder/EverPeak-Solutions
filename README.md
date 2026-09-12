# EverPeak Solutions — Full-Stack Web Platform & Admin Portal

> **Tagline**: *"Elevate, Innovate, Dominate"*  
> **Brand Identity**: Black `#000000`, Near Black `#050505`, Dark `#0A0A0C`, Dark Gray `#111114`, Electric Purple `#6D00FF`, Violet `#8A00FF`, Magenta `#D000FF`, Pink `#F000D0`.

---

## 🌟 Overview

EverPeak Solutions is a full-stack web application for an IT services and digital marketing agency based in Indore, MP, with Pan-India reach. The application features a dynamic React frontend, a Node.js/Express.js REST API, a MySQL database powered by Prisma ORM, and a secure Admin Dashboard for managing portfolio projects, media uploads, and client enquiries.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Vite), TailwindCSS, React Router v6, Lucide Icons, Axios, Framer Motion
- **Backend**: Node.js, Express.js, Helmet, CORS, Express Rate Limit
- **Database**: MySQL 8.0+ with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **File Uploads**: Multer (Local static storage in `/uploads`, easily expandable to S3/Cloudinary)
- **Email Notifications**: Nodemailer (Routed to `career.everpeaksolutions@gmail.com`)
- **Direct Messaging**: WhatsApp Click-to-Chat Integration (`+91 74008 81232`)

---

## 📁 Project Architecture

```
EPSolutions/
├── client/                     # React Frontend (Vite)
│   ├── public/                 # Static assets (logo.png)
│   ├── src/
│   │   ├── assets/             # Brand logos & imagery
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Navbar, Footer, FloatingWhatsApp
│   │   │   ├── home/           # Hero, Services, ITServices, Marketing, WhyUs, Process, SelectedWork, CaseStudies, FAQ, CTA
│   │   │   ├── enquiry/        # EnquiryModal
│   │   │   └── admin/          # AdminSidebar, AdminNavbar, AdminLayout, AdminProtectedRoute
│   │   ├── context/            # AuthContext, ModalContext
│   │   ├── pages/              # Home, Services, About, Portfolio, PortfolioDetail, Contact
│   │   │   └── admin/          # AdminLogin, AdminDashboard, AdminProjects, AdminProjectForm, AdminEnquiries
│   │   ├── services/           # api.js (Axios API client)
│   │   ├── styles/             # index.css (Custom utilities & Tailwind)
│   │   ├── App.jsx             # React router
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Node.js + Express Backend API
│   ├── config/                 # db.js (Prisma Client)
│   ├── controllers/            # authController, portfolioController, enquiryController, statsController
│   ├── middleware/             # authMiddleware, rateLimiter, uploadMiddleware, errorHandler
│   ├── routes/                 # authRoutes, portfolioRoutes, enquiryRoutes, statsRoutes
│   ├── services/               # mailService (Nodemailer)
│   ├── uploads/                # Local uploaded portfolio media storage
│   ├── prisma/
│   │   ├── schema.prisma       # MySQL Prisma schema definition
│   │   └── seed.js             # Initial Admin & real EverPeak portfolio seed script
│   ├── .env                    # Local environment variables
│   ├── .env.example            # Environment template
│   ├── server.js               # Express server entry point
│   └── package.json
│
├── .gitignore
├── package.json                # Monorepo root launcher scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.0 or later)
- MySQL Server (v8.0 or later)

### 2. MySQL Database Setup
Open MySQL command line or MySQL Workbench and run:
```sql
CREATE DATABASE IF NOT EXISTS everpeak_solutions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Server Configuration & Setup
1. Navigate to `server/`:
   ```bash
   cd server
   ```
2. Create `.env` from `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   # MySQL Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD
   DB_NAME=everpeak_solutions

   DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/everpeak_solutions"

   # JWT Secret
   JWT_SECRET=YOUR_JWT_SECRET_KEY
   JWT_EXPIRES_IN=7d

   # Email Configuration (Nodemailer)
   EMAIL_USER=career.everpeaksolutions@gmail.com
   EMAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false

   # WhatsApp Configuration
   WHATSAPP_NUMBER=917400881232
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Push schema to MySQL and Seed Data:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

5. Start backend:
   ```bash
   npm run dev
   # Server runs on http://localhost:5000
   ```

### 4. Client Setup
1. Open a new terminal and navigate to `client/`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend:
   ```bash
   npm run dev
   # Client runs on http://localhost:5173
   ```

---

## 🔐 Admin Portal Access

The administrative panel is accessible at `/admin/login` for authorized operators to manage portfolio projects, upload case studies, review incoming client inquiries, and export leads. Credentials can be configured during database initialization via `prisma/seed.js` or managed via environment variables.

---

## 📡 REST API Endpoints

### Authentication
- `POST /api/auth/login` — Admin login & JWT generation
- `GET /api/auth/me` — Verify admin session (Protected)
- `PUT /api/auth/profile` — Update admin credentials (Protected)

### Portfolio Projects (Dynamic MySQL)
- `GET /api/portfolio` — Public list of published projects (Filter by `category`, `featured`, `search`)
- `GET /api/portfolio/slug/:slug` — Public single project case study
- `GET /api/portfolio/admin/all` — All projects including drafts (Protected)
- `GET /api/portfolio/admin/:id` — Single project for edit (Protected)
- `POST /api/portfolio` — Create project with image upload (Protected)
- `PUT /api/portfolio/:id` — Update project (Protected)
- `DELETE /api/portfolio/:id` — Delete project & associated media (Protected)
- `PATCH /api/portfolio/:id/publish` — Toggle published state (Protected)
- `PATCH /api/portfolio/:id/featured` — Toggle featured state (Protected)

### Enquiries & Leads
- `POST /api/enquiries` — Public enquiry submission (Rate-limited, stores in MySQL, sends notification email)
- `GET /api/enquiries` — Admin list of all enquiries (Filter by `status`, `search`) (Protected)
- `GET /api/enquiries/:id` — Get single enquiry details (Protected)
- `PATCH /api/enquiries/:id/status` — Update enquiry status (`New`, `Contacted`, `In Progress`, `Converted`, `Closed`) (Protected)
- `DELETE /api/enquiries/:id` — Delete enquiry (Protected)

### Dashboard Statistics
- `GET /api/stats/dashboard` — Overview counts and recent inquiries (Protected)

---

## 📲 Direct Contact Details
- **Official Email**: `career.everpeaksolutions@gmail.com`
- **WhatsApp / Phone**: `+91 74008 81232` (Direct click-to-chat: `https://wa.me/917400881232`)
- **Office**: Gravity Mall 5th floor Vijay Nagar, Mechinic Nagar Indore 452011

---

## 🛡 Security & Performance
- Zero exposed database credentials in React code
- Password hashing with `bcryptjs`
- SQL Injection protected via Prisma ORM
- Rate limiting on sensitive endpoints
- Responsive across all mobile, tablet, and desktop breakpoints
