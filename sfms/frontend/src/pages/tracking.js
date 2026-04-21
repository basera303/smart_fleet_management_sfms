// Screen 6 – Real-Time Shipment Tracking
export function renderTracking(container, navigate) {
  let searched = true; // show results by default for demo

  const milestones = [
    { label: 'Booking Confirmed',  time: 'Apr 23, 2026 · 10:35 AM', done: true,  note: 'Booking BK-2026-0412 confirmed & payment received.' },
    { label: 'Picked Up',          time: 'Apr 28, 2026 · 9:12 AM',  done: true,  note: 'Items picked up from Koregaon Park, Pune.' },
    { label: 'In Transit',         time: 'Apr 28, 2026 · 11:45 AM', done: true,  note: 'Vehicle MH-12-AB-4321 en route to Mumbai.' },
    { label: 'Near Destination',   time: 'Estimated: Apr 28 · 4PM', done: false, note: 'Approx. 45 km from delivery address.' },
    { label: 'Delivered',          time: 'Estimated: Apr 28 · 5PM', done: false, note: 'Delivery pending.' },
  ];

  container.innerHTML = `
  <div class="page-wrap" style="max-width:860px;margin:0 auto;padding:28px 20px;">
    <div class="page-header-row">
      <div>
        <h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;">📍 Track Your Shipment</h1>
        <p style="color:var(--text-light);font-size:13px;">Enter your Booking ID for real-time status updates</p>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="window._nav('customer-dash')">← Dashboard</button>
    </div>

    <!-- Search bar -->
    <div class="card" style="margin-bottom:24px;">
      <div style="display:flex;gap:12px;align-items:flex-end;">
        <div class="form-group" style="flex:1;">
          <label>Booking / Tracking ID</label>
          <input class="form-control" id="trackId" value="BK-2026-0412" placeholder="e.g. BK-2026-0412" style="font-size:15px;font-family:'Syne',sans-serif;font-weight:700;letter-spacing:1px;" />
        </div>
        <button class="btn btn-primary" style="padding:11px 28px;" onclick="window._search()">Track 📍</button>
      </div>
    </div>

    ${searched ? `
    <!-- Results grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">

      <!-- Timeline Card -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
          <h2 style="font-family:'Syne',sans-serif;font-size:15px;font-weight:700;">Status Timeline</h2>
          <span class="badge badge-info">🚚 In Transit</span>
        </div>
        <div class="timeline">
          ${milestones.map((m, i) => `
            <div class="timeline-item ${m.done ? 'done' : ''} ${i===2 ? 'active' : ''}">
              <div class="timeline-dot">${m.done ? '✓' : (i===3||i===4 ? '○' : '•')}</div>
              <div style="padding-bottom:8px;">
                <div style="font-weight:600;font-size:13.5px;">${m.label}</div>
                <div style="font-size:11.5px;color:var(--text-light);margin-top:2px;">${m.time}</div>
                <div style="font-size:12px;color:var(--text-light);margin-top:4px;">${m.note}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Info + Map Panel -->
      <div style="display:flex;flex-direction:column;gap:18px;">

        <!-- Booking Summary -->
        <div class="card" style="padding:20px;">
          <h3 style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;margin-bottom:14px;text-transform:uppercase;letter-spacing:.6px;">Booking Info</h3>
          ${[
            ['Booking ID',    '<strong style="color:var(--primary);letter-spacing:1px;">BK-2026-0412</strong>'],
            ['Service',       'Household Shifting'],
            ['Driver',        'Ramesh Kumar'],
            ['Vehicle',       'MH-12-AB-4321 (Tata Ace)'],
            ['From',          'Koregaon Park, Pune'],
            ['To',            'Borivali West, Mumbai'],
            ['Est. Delivery', 'Apr 28, 2026 · 5:00 PM'],
          ].map(([k,v]) => `
            <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border);font-size:12.5px;">
              <span style="color:var(--text-light);">${k}</span><span>${v}</span>
            </div>
          `).join('')}
        </div>

        <!-- Map placeholder -->
        <div class="map-placeholder" style="height:200px;">
          <div style="font-size:36px;">🗺️</div>
          <div style="font-weight:600;font-size:13px;">Live Route Map</div>
          <div style="font-size:11.5px;">Pune → Mumbai (National Highway 48)</div>
          <div style="font-size:11px;background:var(--card);padding:6px 14px;border-radius:8px;margin-top:4px;">
            📍 Current: Near Khopoli (45 km remaining)
          </div>
        </div>

        <!-- Driver card -->
        <div class="card" style="padding:16px;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div class="driver-avatar" style="width:50px;height:50px;font-size:18px;">RK</div>
            <div>
              <div style="font-weight:700;font-size:14px;">Ramesh Kumar</div>
              <div style="font-size:12px;color:var(--text-light);">Driver · 8 yrs exp</div>
              <div class="stars">★★★★★</div>
            </div>
            <a href="tel:+919081882281" class="btn btn-success btn-sm" style="margin-left:auto;">📞 Call</a>
          </div>
        </div>
      </div>
    </div>
    ` : `
    <div class="card" style="text-align:center;padding:60px;">
      <div style="font-size:56px;margin-bottom:16px;">📍</div>
      <h3 style="font-family:'Syne',sans-serif;font-size:18px;margin-bottom:8px;">Enter your Booking ID</h3>
      <p style="color:var(--text-light);font-size:13.5px;">You can find your Booking ID in the confirmation email.</p>
    </div>
    `}
  </div>
  `;

  window._nav = navigate;
  window._search = () => { searched = true; renderTracking(container, navigate); };
}
