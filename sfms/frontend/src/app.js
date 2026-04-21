// ============================================================
// Smart Fleet Management System – Frontend App
// Chahar Packers and Movers
// ============================================================

import { renderLanding }       from './pages/landing.js';
import { renderAuth }          from './pages/auth.js';
import { renderBookingWizard } from './pages/booking.js';
import { renderEmailConfirm }  from './pages/email-confirm.js';
import { renderCustomerDash }  from './pages/customer-dash.js';
import { renderTracking }      from './pages/tracking.js';
import { renderAdminDash }     from './pages/admin-dash.js';
import { renderAssignModal }   from './pages/assign-modal.js';
import { renderDriverPanel }   from './pages/driver-panel.js';
import { renderInvoice }       from './pages/invoice.js';
import { renderAnalytics }     from './pages/analytics.js';
import { renderFleetMgmt }     from './pages/fleet-mgmt.js';

const SCREENS = [
  { id: 'landing',      label: '🏠 Landing',        render: renderLanding },
  { id: 'auth',         label: '🔐 Login/Register',  render: renderAuth },
  { id: 'booking',      label: '📦 New Booking',     render: renderBookingWizard },
  { id: 'email',        label: '📧 Booking Email',   render: renderEmailConfirm },
  { id: 'customer-dash',label: '👤 My Bookings',     render: renderCustomerDash },
  { id: 'tracking',     label: '📍 Track Shipment',  render: renderTracking },
  { id: 'admin-dash',   label: '🛡 Admin Dashboard', render: renderAdminDash },
  { id: 'assign',       label: '🚚 Assign Driver',   render: renderAssignModal },
  { id: 'driver-panel', label: '👷 Driver Panel',    render: renderDriverPanel },
  { id: 'invoice',      label: '🧾 Invoice PDF',     render: renderInvoice },
  { id: 'analytics',    label: '📊 Analytics',       render: renderAnalytics },
  { id: 'fleet',        label: '🚛 Fleet Mgmt',      render: renderFleetMgmt },
];

let currentScreen = 'landing';

function buildNav() {
  const nav = document.createElement('nav');
  nav.className = 'app-nav';
  nav.innerHTML = `
    <div class="logo">SFMS <span>CPM</span></div>
    <div class="nav-links" id="navLinks"></div>
  `;
  document.body.prepend(nav);

  const navLinks = document.getElementById('navLinks');
  SCREENS.forEach(s => {
    const btn = document.createElement('button');
    btn.textContent = s.label;
    btn.dataset.screen = s.id;
    btn.onclick = () => navigate(s.id);
    navLinks.appendChild(btn);
  });
}

function navigate(screenId) {
  currentScreen = screenId;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const screen = SCREENS.find(s => s.id === screenId);
  if (screen) screen.render(app, navigate);

  // update active nav
  document.querySelectorAll('.nav-links button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });

  window.scrollTo(0, 0);
}

// Boot
buildNav();
navigate('landing');
