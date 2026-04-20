# 🚀 MERN Task Manager App

A full-stack **MERN (MongoDB, Express, React, Node.js)** application for managing tasks and projects with a smooth, responsive, and user-friendly interface.

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication (Access & Refresh Tokens)
* Secure password hashing using bcrypt

### 📂 Project & Task Management

* Create and manage projects
* Add tasks inside projects
* Drag & Drop tasks between projects
* Organized workflow for better productivity

### 🎯 Frontend Highlights

* Built with **React + Vite**
* Global state management using **Context API (useContext)**
* Responsive and modern UI
* Theme switching (Light/Dark mode)
* Smooth and optimized user experience

### 🔄 Data Handling

* Data normalization
* Clean API integration
* Efficient state updates

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Context API
* Modern UI / CSS

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB

---

## ⚙️ Environment Variables

Create `.env` files in both **client** and **server** folders.

---

### 🔹 Frontend `.env`

```env id="f1env"
# Backend API URL
VITE_SERVER_URL=http://localhost:5000/api
```

---

### 🔹 Backend `.env`

```env id="b1env"
# MongoDB connection string
CONNECTION_URL=mongodb://localhost:27017/task_mangent

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Server Port
PORT=5000

# JWT Secrets (change in production)
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Bcrypt salt rounds
BCRYPT=12

# Environment mode
NODE_ENV=development
```

---

## ▶️ Getting Started

### 1. Clone the repository

```id="clone02"
git clone https://github.com/your-username/your-repo.git
```

### 2. Install dependencies & run project

#### 🔹 Backend

```id="runbackend"
cd server
npm install
npm start
```

#### 🔹 Frontend

```id="runfrontend"
cd client
npm install
npm run dev
```

---

## 🔗 API Connection

Frontend connects to backend using:

```id="apiconn"
VITE_SERVER_URL=http://localhost:5000/api
```

---

## ✨ Core Functionalities

* User authentication (Signup/Login)
* JWT & Refresh token system
* Create, update, and delete projects
* Task management with drag-and-drop
* Global state using Context API
* Responsive UI with theme support

---

## 📱 UI & UX

* Fully responsive design
* Mobile-friendly interface
* Smooth drag-and-drop interactions
* Light/Dark theme toggle

---

## ⚠️ Important Notes

* Do **not** commit `.env` files
* Use strong secrets in production
* Update API URLs when deploying
* Use MongoDB Atlas for production database

---

## 📌 Future Improvements

* Real-time updates (Socket.io)
* Notifications system
* Role-based access control
* Analytics dashboard

---

## 📄 License

This project is open-source and free to use.

---

## 🙌 Conclusion

This project demonstrates a complete **MERN stack workflow** with:

* Secure backend using JWT & bcrypt
* Scalable API structure
* Clean React frontend with Context API
* Smooth and user-friendly experience

---

Feel free to use, customize, and improve this project 🚀
