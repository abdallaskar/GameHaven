# 🎮 GameHaven REST API

A full-featured backend API for a digital video game store, built with Node.js, Express, and MongoDB.

## 📄 Project Overview

GameHaven is a fictional video game marketplace. This backend system powers the entire store — from user registration to managing games, shopping carts, orders, reviews, and more.

The API follows RESTful standards, uses JWT-based authentication, and follows best practices in terms of structure, security, and scalability.

---

## 🌐 Live Demo & Docs

- 📄 **Documentation (Word File)**: [GameHaven_API_Documentation](https://drive.google.com/drive/folders/1gjkN0f-aZNSmT2uwFNhR5-W8kuZmHdn0?usp=sharing)
- 🚀 **Live API Base URL**: `https://gamehaven-api.onrender.com` (example)
- 🔧 **Frontend Repo** (if any): _Add your frontend repo link here_

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js** – Server & Routing
- **MongoDB** & **Mongoose** – Database & ODM
- **JWT** – Authentication
- **Bcrypt** – Password Hashing
- **Multer** – File Upload (Game Cover Images)
- **AJV** – Schema & Input Validation
- **dotenv** – Environment Configuration

> 📁 Architecture: MVC with Service Layer Abstraction

---

## 📦 Features

### 👤 Authentication & Authorization

- User registration & login (JWT-based)
- Role-based access control (Admin/User)

### 🎮 Game Management

- CRUD operations (admin only)
- Image upload for game covers
- Filtering & pagination

### 🛒 Shopping Cart

- Add, remove, update quantities
- Clear cart
- View total cost

### 🧾 Orders

- Place order from cart
- View order history

### ⭐ Reviews

- Add & fetch reviews per game
- View average rating

### ❤️ Wishlist

- Add/remove games to wishlist

---

## 📁 Project Setup

```bash
git https://github.com/abdallaskar/GameHaven.git
cd Gamehaven
npm install

```
