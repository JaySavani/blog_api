# 📰 Blog API

Learn how to build and deploy a **fully production-ready Blog REST API** using **Node.js, Express, TypeScript, and MongoDB** — complete with authentication, logging, and real-time monitoring.

<p align="center">
  <a href="https://jaysavani.gitbook.io/blog-api-doc"><strong>📘 Read Full Documentation →</strong></a>
</p>

---

## 🚀 Features

✅ **JWT Authentication** — Secure access & refresh tokens with HttpOnly cookies  
✅ **User Management** — Register, login, update profile, and delete account  
✅ **Blog CRUD** — Create, read, update, delete blogs with SEO-friendly slugs  
✅ **Interactions** — Like, unlike, and comment on blog posts  
✅ **Filtering & Pagination** — Efficiently retrieve results with search filters  
✅ **Validation & Error Handling** — Centralized error middleware and validation  
✅ **Logging & Monitoring** — Integrated **Winston** logger for structured logs  
✅ **Graceful Shutdown** — Safe server termination to avoid data corruption  

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB with Mongoose |
| **Auth** | JWT (Access + Refresh Tokens) |
| **Logging** | Winston |
| **Validation** | Zod |
| **Documentation** | GitBook |

---

## 📂 Folder Structure

```
📦 blog_api
├─ .env.example
├─ .gitignore
├─ .prettierignore
├─ .prettierrc
├─ LICENSE
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ tsconfig.json
├─ src
│ ├─ @types
│ │ └─ express
│ │ └─ index.d.ts
│ ├─ config/ # Environment config, DB setup
│ ├─ controllers/ # Request handlers (v1 separated)
│ │ └─ v1/
│ │ ├─ auth/ # Login, Register, Logout, Refresh
│ │ ├─ blog/ # Blog CRUD
│ │ ├─ comment/ # Comment operations
│ │ ├─ likes/ # Like/Dislike
│ │ └─ user/ # User CRUD
│ ├─ lib/ # Utility libraries (jwt, winston, cloudinary)
│ ├─ middlewares/ # Auth, rate limit, upload, validation
│ ├─ models/ # Mongoose schemas
│ ├─ routes/ # API routing (v1)
│ ├─ schemas/ # Validation schemas (Zod)
│ ├─ utils/ # Helper utilities
│ └─ server.ts # Server entrypoint
```

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/JaySavani/blog_api.git
cd blog_api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:

```bash
PORT=3000
MONGO_URI=mongodb+srv://your_cluster_url
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```

### 4. Run the Server
#### Development
```bash
npm run dev
```

#### Production
```bash
npm run build
npm start
```

Server should be running at:  
👉 **http://localhost:3000**

---

## 📘 Documentation

For full API documentation, schemas, and examples, visit:  
👉 [**https://jaysavani.gitbook.io/blog-api-doc**](https://jaysavani.gitbook.io/blog-api-doc)
