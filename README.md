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

### 💸 Transaction Management
All financial operations are **atomic and fully tracked**.

#### Supported Transaction Types:
| Type | Description | Initiated By |
|------|--------------|--------------|
| `cash_in` | Add money to user wallet | Agent |
| `cash_out` | Withdraw money from user wallet | Agent |
| `add_money` | Top-up user’s own wallet | User |
| `withdraw` | Withdraw funds | User |
| `send_money` | Transfer money between users | User |
| `commission` | Agent earns commission | System |

#### Key Features:
- **Transaction Fee System:** configurable by admin.
- **Minimum Balance Rule:** user must maintain a minimum wallet balance.
- **Atomic Operations:** uses MongoDB transactions for consistency.
- **Statuses:** `pending`, `completed`, `reversed`.
- **Commission Support (optional).**
- **Transaction History:** Users, agents, and admins can view their transaction logs.

---

### 🧑‍💼 Admin Functionalities
Admins can:
- View all **users**, **agents**, **wallets**, and **transactions**.
- **Block / Unblock** user wallets.
- **Approve / Suspend** agents.
- **Set system parameters:**
  - Transaction Fee (%)
  - Minimum Wallet Balance
- Monitor global transaction activity.

---

### 🧾 Agent Functionalities
Agents can:
- **Cash-In**: add money to user wallet.
- **Cash-Out**: withdraw money from user wallet.
- View commission and transaction logs.
- Commission automatically calculated based on fee settings.

---

### 👤 User Functionalities
Users can:
- View wallet balance.
- **Add Money**, **Withdraw**, and **Send Money** to other users.
- View full **transaction history**.
- Must maintain the minimum balance set by admin.

---

## ⚙️ Technologies Used

| Category | Stack |
|-----------|--------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt |
| Validation | Zod |
| Config Management | Dotenv |
| Architecture | Modular MVC |
| Error Handling | Centralized Error Middleware |
| Logging | Console (can integrate Winston / Morgan) |

---

## 📁 Folder Structure

