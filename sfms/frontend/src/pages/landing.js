// Screen 1 – Landing Page
export function renderLanding(container, navigate) {
  container.innerHTML = `
  <div class="page-wrap">
    <!-- HERO -->
    <section class="hero">
      <h1 class="hero-title">Move Smarter with <span>Chahar</span> Packers &amp; Movers</h1>
      <p class="hero-sub">India's trusted logistics partner for household shifting, office relocation, vehicle transport, and warehousing — powered by our Smart Fleet Management System.</p>
      <div class="hero-btns">
        <button class="btn btn-accent" onclick="window._nav('booking')" style="font-size:15px;padding:14px 32px;">
          📦 Book a Move
        </button>
        <button class="btn btn-outline" style="color:#fff;border-color:#fff;font-size:15px;padding:14px 32px;" onclick="window._nav('tracking')">
          📍 Track Shipment
        </button>
      </div>
      <div style="position:absolute;right:60px;top:50%;transform:translateY(-50%);opacity:.12;font-size:220px;line-height:1;user-select:none;">🚚</div>
    </section>

    <!-- SERVICES -->
    <div style="padding:44px 60px 0;">
      <h2 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;text-align:center;margin-bottom:28px;">Our Services</h2>
    </div>
    <div class="service-cards">
      <div class="service-card">
        <div class="icon">🏠</div>
        <h3>Household Shifting</h3>
        <p>Safe and affordable home relocation services with professional packing.</p>
        <br><button class="btn btn-outline btn-sm" onclick="window._nav('booking')">Book Now</button>
      </div>
      <div class="service-card">
        <div class="icon">🏢</div>
        <h3>Office Relocation</h3>
        <p>Minimal downtime office moves with dedicated project coordinators.</p>
        <br><button class="btn btn-outline btn-sm" onclick="window._nav('booking')">Book Now</button>
      </div>
      <div class="service-card">
        <div class="icon">🚗</div>
        <h3>Vehicle Transport</h3>
        <p>Car and two-wheeler transport on enclosed carriers across India.</p>
        <br><button class="btn btn-outline btn-sm" onclick="window._nav('booking')">Book Now</button>
      </div>
      <div class="service-card">
        <div class="icon">🏭</div>
        <h3>Warehousing</h3>
        <p>Secure short and long-term storage facilities with 24/7 access.</p>
        <br><button class="btn btn-outline btn-sm" onclick="window._nav('booking')">Book Now</button>
      </div>
    </div>

    <!-- STATS BAR -->
    <div class="stats-bar">
      <div class="stat-item"><div class="num">2,400+</div><div class="lbl">Moves Completed</div></div>
      <div class="stat-item"><div class="num">98%</div><div class="lbl">On-Time Delivery</div></div>
      <div class="stat-item"><div class="num">18</div><div class="lbl">Cities Covered</div></div>
      <div class="stat-item"><div class="num">4.8 ★</div><div class="lbl">Avg. Customer Rating</div></div>
    </div>

    <!-- ABOUT STRIP -->
    <div style="padding:48px 60px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;">
      <div>
        <h2 style="font-family:'Syne',sans-serif;font-size:26px;font-weight:800;margin-bottom:14px;line-height:1.2;">
          Real-time tracking &amp; transparent pricing
        </h2>
        <p style="color:var(--text-light);line-height:1.8;font-size:14.5px;">
          Our Smart Fleet Management System gives you live updates at every step — from booking confirmation to final delivery. No hidden charges, no surprises. Auto-generated invoices with GST breakdown sent directly to your inbox.
        </p>
        <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="window._nav('auth')">Create Account</button>
          <button class="btn btn-ghost" onclick="window._nav('tracking')">Track a Booking</button>
        </div>
      </div>
      <div style="background:linear-gradient(135deg,#E8F0FE,#FFF0EB);border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;background:#fff;padding:14px 18px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.06);">
          <span style="font-size:22px;">✅</span>
          <div><div style="font-weight:600;font-size:13px;">Booking Confirmed</div><div style="font-size:11px;color:var(--text-light);">BK-2026-0412 · Today 10:32 AM</div></div>
          <span class="badge badge-success" style="margin-left:auto;">Confirmed</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:#fff;padding:14px 18px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.06);">
          <span style="font-size:22px;">🚚</span>
          <div><div style="font-weight:600;font-size:13px;">Driver Assigned</div><div style="font-size:11px;color:var(--text-light);">Ramesh K. · MH-12-AB-4321</div></div>
          <span class="badge badge-info" style="margin-left:auto;">In Transit</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:#fff;padding:14px 18px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.06);">
          <span style="font-size:22px;">🧾</span>
          <div><div style="font-weight:600;font-size:13px;">Invoice Ready</div><div style="font-size:11px;color:var(--text-light);">₹6,800 · GST included</div></div>
          <button class="btn btn-sm btn-accent" style="margin-left:auto;" onclick="window._nav('invoice')">Download</button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer style="background:var(--dark);color:rgba(255,255,255,.6);padding:28px 60px;font-size:13px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <strong style="color:#fff;font-family:'Syne',sans-serif;">Chahar Packers &amp; Movers</strong><br>
        Shubh Vatika, Millennium Park Road, Dindoli, Surat, Gujarat – 394210
      </div>
      <div style="text-align:right;">
        📞 +91 9081882281<br>
        ✉️ info@chaharpackersandmovers.com
      </div>
    </footer>
  </div>
  `;

  window._nav = navigate;
}
