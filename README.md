# 💰 Digital Wallet API (Bkash/Nagad Clone)

A secure and modular **Digital Wallet Backend API** built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.  
It implements core financial operations (add money, withdraw, send money) with **role-based access**, **JWT authentication**, and **transaction tracking**.

---

## 🚀 Project Overview

This project simulates a **digital wallet system** like **Bkash** or **Nagad**, supporting different user roles —  
**Admin**, **Agent**, and **User** — each with specific permissions and operational scopes.

---

## 🧩 Core Features

### 🔐 Authentication & Authorization
- Secure JWT-based login and registration.
- Roles: `admin`, `agent`, `user`
- Passwords hashed using **bcrypt**.
- Role-based access protection using middleware.

---

### 🏦 Wallet Management
- A wallet is automatically created for each user/agent during registration.
- Initial balance: **৳50**
- Wallet contains:
  - `balance`
  - `status` (active / blocked)
  - `user` reference
- Admins can block/unblock wallets.
- Minimum balance enforcement (default: ৳10, configurable).

---

### 💸 Transaction Ma
