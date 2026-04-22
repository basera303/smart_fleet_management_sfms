# SFMS Backend — Smart Fleet Management System

Node.js + Express + MongoDB REST API with real-time Socket.io support.

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js       # Register, login, email verify
│   ├── bookingController.js    # CRUD for bookings
│   ├── fleetController.js      # Vehicle management
│   └── analyticsController.js # Dashboard stats & revenue
├── middleware/
│   ├── authMiddleware.js       # JWT protect + role authorize
│   └── errorMiddleware.js      # Global error handler
├── models/
│   ├── User.js                 # Customer / Driver / Admin
│   ├── Vehicle.js              # Fleet vehicles
│   ├── Booking.js              # Booking records
│   └── Invoice.js              # Invoice & payments
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── fleetRoutes.js
│   ├── driverRoutes.js
│   ├── invoiceRoutes.js
│   ├── trackingRoutes.js
│   ├── analyticsRoutes.js
│   └── adminRoutes.js
├── utils/
│   ├── emailService.js         # Nodemailer email helper
│   └── socketHandler.js        # Socket.io real-time events
├── .env.example
├── .gitignore
├── package.json
└── server.js                   # Entry point
```

## 🚀 Getting Started

```bash
cd backend
npm install
cp .env.example .env       # Fill in your credentials
npm run dev                # Starts with nodemon
```

## 🔑 API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login & get JWT |
| GET | /api/auth/me | Private | Get current user |
| GET | /api/bookings | Private | Get bookings |
| POST | /api/bookings | Private | Create booking |
| PUT | /api/bookings/:id/status | Admin | Update status |
| GET | /api/fleet | Private | Get all vehicles |
| POST | /api/fleet | Admin | Add vehicle |
| GET | /api/analytics/dashboard | Admin | Stats overview |
| GET | /api/analytics/revenue | Admin | Monthly revenue |
| GET | /api/tracking/booking/:id | Private | Live GPS tracking |
| GET | /api/invoices | Private | Get invoices |
| POST | /api/invoices/generate/:bookingId | Admin | Generate invoice |

## ⚡ Real-Time Events (Socket.io)

| Event | Direction | Description |
|-------|-----------|-------------|
| `driver:join` | Client → Server | Driver connects |
| `location:update` | Client → Server | GPS location push |
| `location:update` | Server → Client | Broadcast to trackers |
| `booking:update` | Server → Client | Status notification |
| `admin:join` | Client → Server | Admin joins dashboard |

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **Real-time**: Socket.io
- **Email**: Nodemailer
- **Payments**: Stripe

## 🔐 Roles

| Role | Access |
|------|--------|
| `customer` | Book vehicles, view own bookings/invoices |
| `driver` | View assigned trips, update location |
| `admin` | Full access — fleet, users, analytics, invoices |
