# 📘 GameHaven API Documentation

**Base URL:** `http://localhost:5000`

---

## 📌 Authentication Routes (`/auth`)

### 🔐 Register

**POST** `/auth/register`  
Register a new user.

#### Request Body

```json
{
  "username": "abdalla_sakr",
  "email": "abdalla@example.com",
  "password": "secret123"
}
```

---

### 🔑 Login

**POST** `/auth/login`

#### Request Body

```json
{
  "email": "abdalla@example.com",
  "password": "secret123"
}
```

Response with a token. Copy this token and add it to the Authorization header like this:  
**Headers:** `Authorization: Bearer <token>`

---

## 🎮 Games Routes (`/games`)

### 🔍 Get All Games

**GET** `/games`  
Returns an array of games.

### 🔍 Get Single Game

**GET** `/games/:id`  
Returns one game.

### ✍️ Create Game (Admin)

**POST** `/games`  
Requires authentication and admin role.

**Headers:** `Authorization: Bearer <token>`  
FormData with cover file upload.

#### Body Example

```json
{
  "title": "Call of Sakr",
  "platform": "PC",
  "genre": "Action",
  "description": "First-person shooter",
  "price": 59.99,
  "stock": 100
}
```

### 🔄 Update Game (Admin)

**PUT** `/games/:id`  
Same schema and behavior as POST `/games`.

### ❌ Delete Game (Admin)

**DELETE** `/games/:id`

---

## 💬 Reviews (`/games/:id/reviews`)

### Get Reviews

**GET** `/games/:id/reviews`  
Returns all reviews for the specified game.

### Add Review

**POST** `/games/:id/reviews`  
Requires authentication.

#### Request Body

```json
{
  "rating": 4,
  "comment": "Exciting gameplay!"
}
```

---

## 🛒 Cart Routes (`/cart`)

### Get Cart Items

**GET** `/cart`  
Requires authentication.

### Add to Cart

**POST** `/cart`

#### Request Body

```json
{
  "gameId": "683f6a5abe2bbe5724086561"
}
```

### Increase Quantity

**POST** `/cart/add/:id`  
Requires authentication.

### Decrease Quantity

**POST** `/cart/sub/:id`  
Requires authentication.

### 🧹 Clear Cart

**DELETE** `/cart/clear`  
Requires authentication.

---

## ❤️ Wishlist (`/user/wishlist`)

### Get Wishlist

**GET** `/user/wishlist`  
Requires authentication.

### Add to Wishlist

**POST** `/user/wishlist`  
Requires authentication.

#### Request Body

```json
{
  "gameId": "683f6a5abe2bbe5724086561"
}
```

---

## 📦 Orders (`/user/orders`)

### Get All Orders

**GET** `/user/orders`  
Requires authentication.

### Create Order

**POST** `/user/orders`  
Requires authentication.  
Automatically creates an order based on cart items.
