# Smart Fleet Management System (SFMS)
## Chahar Packers & Movers — Internship Project by Ajay

This is the **complete frontend UI** for all 12 screens described in the internship report.

---

## 📁 Folder Structure

```
sfms/
└── frontend/
    ├── index.html              ← Entry point (open this in browser)
    ├── styles.css              ← Global styles + design system
    └── src/
        ├── app.js              ← Router — mounts all screens
        └── pages/
            ├── landing.js      ← Screen 1:  Landing Page / Homepage
            ├── auth.js         ← Screen 2:  Customer Login & Register
            ├── booking.js      ← Screen 3:  Multi-Step Booking Wizard
            ├── email-confirm.js← Screen 4:  Booking Confirmation Email
            ├── customer-dash.js← Screen 5:  Customer Dashboard – My Bookings
            ├── tracking.js     ← Screen 6:  Shipment Tracking with Timeline
            ├── admin-dash.js   ← Screen 7:  Admin Dashboard Overview
            ├── assign-modal.js ← Screen 8:  Driver Assignment Modal
            ├── driver-panel.js ← Screen 9:  Driver Panel – My Jobs
            ├── invoice.js      ← Screen 10: PDF Invoice Preview
            ├── analytics.js    ← Screen 11: Analytics with Charts
            └── fleet-mgmt.js  ← Screen 12: Fleet & Driver CRUD
```

---

## 🚀 How to Run

### Option 1 — Simplest (VS Code Live Server)
1. Open the `frontend/` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 2 — Python HTTP Server
```bash
cd sfms/frontend
python3 -m http.server 5500
# Open: http://localhost:5500
```

### Option 3 — Node http-server
```bash
cd sfms/frontend
npx http-server . -p 5500
# Open: http://localhost:5500
```

> ⚠️ The app uses ES modules (`type="module"`), so it **must be served over HTTP** —
> opening `index.html` directly as a `file://` URL will cause CORS errors.

---

## 📺 Screens & Navigation

The top navigation bar gives access to all 12 screens:

| # | Screen | Description |
|---|--------|-------------|
| 1 | 🏠 Landing | Public homepage with services & hero |
| 2 | 🔐 Login/Register | JWT auth UI with Google OAuth button |
| 3 | 📦 New Booking | 4-step wizard with live price estimator |
| 4 | 📧 Booking Email | Nodemailer HTML email preview |
| 5 | 👤 My Bookings | Customer dashboard with booking table |
| 6 | 📍 Track Shipment | Live timeline + map panel |
| 7 | 🛡 Admin Dashboard | KPIs, bookings table, quick actions |
| 8 | 🚚 Assign Driver | Driver selection with availability filter |
| 9 | 👷 Driver Panel | Active job + upcoming jobs |
| 10 | 🧾 Invoice PDF | Full invoice with itemised billing + GST |
| 11 | 📊 Analytics | Revenue chart, pie chart, leaderboard |
| 12 | 🚛 Fleet Mgmt | Driver CRUD table + Add Driver modal |

---

## 🛠 Tech Stack (Frontend)
- **Vanilla JS** with ES Modules (no build step needed)
- **Tailwind CSS** (CDN)
- **Chart.js** (CDN) — for Analytics charts
- **Google Fonts** — Syne + DM Sans

## 📦 Full Stack (from Report)
- **Backend**: Node.js + Express.js + Sequelize ORM + MySQL
- **Auth**: JWT + bcrypt
- **Email**: Nodemailer
- **PDF**: PDFKit
- **Deploy**: Render (backend) + Vercel (frontend)
