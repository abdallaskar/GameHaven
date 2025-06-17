# 📄 GameHaven API Documentation

## 📘 Overview

The **GameHaven** API offers a complete backend solution for an e-commerce gaming platform. It allows developers to:

- Manage user authentication
- Handle CRUD operations for games (admin only)
- Implement a shopping cart and wishlist system
- Process orders
- Collect and view user reviews on games

All responses are returned in JSON format.

## 🚀 Getting Started

To start using the **GameHaven API**, you need to:

1. Set up your local server or deploy it.
2. Use Postman, ThunderClient, or any REST client.
3. Authenticate (for protected routes).
4. Use the correct headers and follow request/response schemas.

> All routes are based on `http://localhost:5000`

---

## 🔐 Authentication

### 🔑 Register - `POST /auth/register`

Registers a new user.

**Request Body:**

```json
{
  "username": "abdalla_sakr",
  "email": "abdalla@example.com",
  "password": "secret123"
}
```

### 🔐 Login - `POST /auth/login`

Logs in an existing user and returns a JWT token.

**Request Body:**

```json
{
  "email": "abdalla@example.com",
  "password": "secret123"
}
```

**Use Token:**

```
Headers: Authorization: Bearer <token>
```

---

## 👥 User Routes (`/user`)

### 🙋‍♂️ Get Current User Info (Requires Auth) - `GET /user/me`

Returns the profile information of the currently logged-in user.

### 👥 Get All Users (Admin Only) - `GET /user/`

Returns all users in the systme.

### 👤 Get User By ID (Admin Only) - `GET /user/:id`

Returns details of a user by their ID.

---

## 🎮 Games Routes (`/games`)

### 📥 Get All Games - `GET /games`

Returns a list of all games.

### 📥 Get Game By ID - `GET /games/:id`

Returns details of a specific game.

### 🆕 Create Game (Admin Only) - `POST /games`

Headers: `Authorization: Bearer <token>`

📦 **Game Example:**
**FormData:** (Include image file as `cover`)

```json
{
  "title": "Call of Sakr",
  "platform": "PC",
  "genre": "Action",
  "description": "First-person shooter",
  "price": 59.99,
  "stock": 100,
  "imageUrl": "https://example.com/images/elden-ring.jpg"
}
```

### 🔁 Update Game (Admin Only)- `PUT /games/:id`

Same structure as POST `/games`.

### ❌ Delete Game (Admin Only)- `DELETE /games/:id`

---

## 📝 Reviews Routes (`/games/:id/reviews`)

### 📥 Get All Reviews

`GET /games/:id/reviews`

### ➕ Add Review (Requires Auth)

`POST /games/:id/reviews`

```json
{
  "rating": 4,
  "comment": "Exciting gameplay!"
}
```

---

## 🛒 Cart Routes (`/cart`)

### 📥 Get Cart Items (Auth) - `GET /cart`

### ➕ Add to Cart (Auth) - `POST /cart`

```json
{
  "gameId": "683f6a5abe2bbe5724086561"
}
```

### 🔼 Increase Quantity (Auth) - `POST /cart/add/:id`

### 🔽 Decrease Quantity (Auth) - `POST /cart/sub/:id`

### 🗑️ Clear Cart (Auth) - `DELETE /cart/clear`

---

## 💖 Wishlist Routes (`/user/wishlist`)

### 📥 Get Wishlist (Auth) - `GET /user/wishlist`

### ➕ Add to Wishlist (Auth) - `POST /user/wishlist`

```json
{
  "gameId": "683f6a5abe2bbe5724086561"
}
```

---

## 📦 Orders Routes (`/user/orders`)

### 📥 Get All Orders (Auth) - `GET /user/orders`

### ➕ Create Order (Auth) - `POST /user/orders`

Automatically creates an order from cart items.

---

## 🛡️ Authentication Summary

This API uses **Bearer Token Auth**.
You must include a token in your header:

```
Authorization: Bearer <your-token-here>
```

If the token is missing/invalid:

- You receive: `401 Unauthorized`

---

## ⏱️ Rate & Usage Limits

- Up to 300 requests/minute
- `429 Too Many Requests` if exceeded

---

© 2025 GameHaven API
