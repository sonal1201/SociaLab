# Socialogy 🌐  
**Modern Social Media Web Application**

Socialogy is a full-stack social media platform where users can create profiles, follow others, share posts, and interact with the community. The application is built with a modern React frontend, a scalable Node.js backend, Supabase (PostgreSQL) for data storage, and Cloudinary for image hosting.

---

## ✨ Features

- 👤 **User Authentication** – Secure signup and login using JWT
- 🧑‍🤝‍🧑 **User Profiles** – Create and update profiles
- ➕ **Follow System** – Follow and unfollow other users
- 📝 **Post Creation** – Create posts with text and images
- ❤️ **Engagement** – Like and interact with posts
- 🖼️ **Image Uploads** – Upload and store images using Cloudinary
- 📱 **Responsive UI** – Works smoothly on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- Context API
- Lucide Icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- Supabase PostgreSQL
- JWT Authentication
- Multer (file uploads)
- Cloudinary (image hosting)

---

## 🏗️ Architecture Overview

1. Users authenticate using JWT-based authentication
2. Frontend communicates with backend via REST APIs
3. Prisma manages database interactions with Supabase PostgreSQL
4. Images are uploaded using Multer and stored on Cloudinary
5. User feeds, profiles, and relationships are handled server-side
6. Context API manages global frontend state

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (PostgreSQL)
- Cloudinary account

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/socialogy.git
cd socialogy
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:
`http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on:
`http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=your_supabase_postgres_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Development Scripts

### Backend

```bash
npm run dev
npm run build
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```





