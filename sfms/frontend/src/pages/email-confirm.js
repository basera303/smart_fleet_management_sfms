// Screen 4 – Booking Confirmation Email
export function renderEmailConfirm(container, navigate) {
  container.innerHTML = `
  <div class="page-wrap" style="max-width:680px;margin:0 auto;padding:28px 20px;">
    <div class="page-header-row">
      <div>
        <h1 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;">📧 Booking Confirmation Email</h1>
        <p style="color:var(--text-light);font-size:13px;">Sent automatically via Nodemailer · HTML Email Template</p>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="window._nav('customer-dash')">View Dashboard →</button>
    </div>

    <!-- Simulated email client chrome -->
    <div style="background:var(--card);border-radius:14px;box-shadow:var(--shadow);overflow:hidden;border:1px solid var(--border);">

      <!-- Email client toolbar -->
      <div style="background:#F8FAFC;padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;font-size:13px;">
        <span style="color:var(--text-light);">📨 Inbox</span>
        <span style="color:var(--border);">›</span>
        <span style="font-weight:600;">Booking Confirmed – BK-2026-0412</span>
        <span class="badge badge-success" style="margin-left:auto;">Delivered ✓</span>
      </div>

      <!-- Email meta -->
      <div style="padding:16px 24px;border-bottom:1px solid var(--border);background:#FAFBFD;font-size:12.5px;display:flex;flex-direction:column;gap:5px;">
        <div><span style="color:var(--text-light);min-width:60px;display:inline-block;">From:</span> <strong>noreply@chaharpackersandmovers.com</strong> &lt;SFMS Notifications&gt;</div>
        <div><span style="color:var(--text-light);min-width:60px;display:inline-block;">To:</span> rahul.sharma@example.com</div>
        <div><span style="color:var(--text-light);min-width:60px;display:inline-block;">Date:</span> Wednesday, April 23, 2026 at 10:35 AM IST</div>
        <div><span style="color:var(--text-light);min-width:60px;display:inline-block;">Subject:</span> <strong>✅ Booking Confirmed – BK-2026-0412 | Chahar Packers &amp; Movers</strong></div>
      </div>

      <!-- Email body -->
      <div style="background:#fff;">

        <!-- Header banner -->
        <div style="background:linear-gradient(135deg,#0F4C81 0%,#1B3A5C 100%);padding:32px 36px;text-align:center;">
          <div style="font-size:36px;margin-bottom:10px;">🚚</div>
          <h1 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;margin-bottom:6px;">
            Booking Confirmed!
          </h1>
          <p style="color:rgba(255,255,255,.75);font-size:13px;">Thank you for choosing Chahar Packers &amp; Movers</p>
        </div>

        <!-- Booking ID badge -->
        <div style="background:#F0F7FF;padding:18px 36px;text-align:center;border-bottom:1px solid var(--border);">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:.8px;color:var(--text-light);">Your Booking ID</span>
          <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--primary);letter-spacing:2px;margin-top:4px;">BK-2026-0412</div>
          <span style="font-size:11px;color:var(--text-light);">Keep this ID for tracking and support</span>
        </div>

        <!-- Booking details -->
        <div style="padding:28px 36px;">
          <p style="font-size:14px;color:var(--text);line-height:1.7;margin-bottom:22px;">
            Dear <strong>Rahul Sharma</strong>,<br><br>
            Your booking with Chahar Packers &amp; Movers has been successfully confirmed. Here are your booking details:
          </p>

          <div style="background:var(--surface);border-radius:10px;overflow:hidden;border:1px solid var(--border);margin-bottom:22px;">
            ${[
              ['Service Type',      '🏠 Household Shifting'],
              ['Pickup Address',    'Flat 4B, Rose Apartments, Koregaon Park, Pune – 411001'],
              ['Delivery Address',  '204, Sunrise Towers, Borivali West, Mumbai – 400092'],
              ['Scheduled Date',    'Monday, April 28, 2026'],
              ['Time Slot',         'Morning (8:00 AM – 12:00 PM)'],
              ['Estimated Amount',  '₹12,840 (incl. 18% GST)'],
              ['Payment Status',    '💳 Pay on Delivery'],
            ].map(([k, v]) => `
              <div class="email-detail-row" style="padding:11px 16px;border-bottom:1px solid var(--border);display:flex;gap:12px;font-size:13px;">
                <span style="color:var(--text-light);min-width:160px;font-weight:500;">${k}</span>
                <span style="font-weight:600;">${v}</span>
              </div>
            `).join('')}
          </div>

          <!-- CTA buttons -->
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:24px 0;">
            <button class="btn btn-primary" onclick="window._nav('tracking')" style="padding:12px 28px;">
              📍 Track Your Shipment
            </button>
            <button class="btn btn-ghost" onclick="window._nav('invoice')" style="padding:12px 28px;">
              🧾 View Invoice
            </button>
          </div>

          <!-- Help block -->
          <div style="background:#FFF5F0;border-left:4px solid var(--accent);border-radius:6px;padding:14px 16px;font-size:12.5px;color:var(--text-light);">
            <strong style="color:var(--text);">Need Help?</strong> Contact our support team at
            <a href="mailto:info@chaharpackersandmovers.com" style="color:var(--primary);">info@chaharpackersandmovers.com</a>
            or call <a href="tel:+919081882281" style="color:var(--primary);">+91 9081882281</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:var(--dark);padding:20px 36px;text-align:center;color:rgba(255,255,255,.5);font-size:11.5px;">
          Chahar Packers &amp; Movers · Shubh Vatika, Millennium Park Road, Dindoli, Surat, Gujarat – 394210<br>
          <span style="margin-top:6px;display:block;">© 2026 Chahar Packers and Movers. All rights reserved.</span>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:20px;">
      <button class="btn btn-accent" onclick="window._nav('customer-dash')">Go to My Dashboard →</button>
    </div>
  </div>
  `;
  window._nav = navigate;
}
