// Screen 5 – Customer Dashboard – My Bookings
export function renderCustomerDash(container, navigate) {
  const bookings = [
    { id:'BK-2026-0412', service:'Household Shifting', from:'Pune', to:'Mumbai',    date:'Apr 28, 2026', amount:'₹12,840', status:'pending' },
    { id:'BK-2026-0389', service:'Office Relocation',  from:'Surat', to:'Ahmedabad', date:'Apr 20, 2026', amount:'₹18,500', status:'transit' },
    { id:'BK-2026-0341', service:'Vehicle Transport',  from:'Delhi', to:'Jaipur',    date:'Apr 12, 2026', amount:'₹8,200',  status:'delivered' },
    { id:'BK-2026-0290', service:'Household Shifting', from:'Pune', to:'Nagpur',    date:'Mar 30, 2026', amount:'₹9,640',  status:'delivered' },
    { id:'BK-2026-0245', service:'Warehousing',        from:'Mumbai','to':'Mumbai',  date:'Mar 15, 2026', amount:'₹3,600',  status:'delivered' },
  ];

  const statusBadge = { pending: '<span class="badge badge-warning">⏳ Pending</span>', transit: '<span class="badge badge-info">🚚 In Transit</span>', delivered: '<span class="badge badge-success">✅ Delivered</span>' };

  container.innerHTML = `
  <div class="page-wrap">
    <div class="layout-sidebar">
      <nav class="sidebar">
        <div style="color:#fff;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;padding:10px 14px;margin-bottom:6px;opacity:.5;text-transform:uppercase;letter-spacing:.8px;">Customer Portal</div>
        <button class="sidebar-item active"><span class="icon">📋</span> My Bookings</button>
        <button class="sidebar-item" onclick="window._nav('booking')"><span class="icon">➕</span> New Booking</button>
        <button class="sidebar-item" onclick="window._nav('tracking')"><span class="icon">📍</span> Track Shipment</button>
        <button class="sidebar-item" onclick="window._nav('invoice')"><span class="icon">🧾</span> Invoices</button>
        <div style="flex:1;"></div>
        <button class="sidebar-item" onclick="window._nav('landing')"><span class="icon">🏠</span> Home</button>
        <button class="sidebar-item"><span class="icon">⚙️</span> Settings</button>
        <button class="sidebar-item"><span class="icon">🚪</span> Logout</button>
      </nav>

      <div class="main-content">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <div>
            <h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;">Welcome back, Rahul 👋</h1>
            <p style="color:var(--text-light);font-size:13.5px;">Manage your bookings and track shipments in one place.</p>
          </div>
          <button class="btn btn-accent" onclick="window._nav('booking')">+ New Booking</button>
        </div>

        <!-- Stat Cards -->
        <div class="grid-4" style="margin-bottom:28px;">
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span class="stat-label">Total Bookings</span>
              <div class="stat-icon" style="background:#EEF4FF;color:var(--primary);">📦</div>
            </div>
            <div class="stat-value">5</div>
            <div class="stat-delta">↑ 2 this month</div>
          </div>
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span class="stat-label">In Transit</span>
              <div class="stat-icon" style="background:#DBEAFE;color:var(--info);">🚚</div>
            </div>
            <div class="stat-value">1</div>
            <div class="stat-delta" style="color:var(--info);">BK-2026-0389</div>
          </div>
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span class="stat-label">Delivered</span>
              <div class="stat-icon" style="background:#DCFCE7;color:var(--success);">✅</div>
            </div>
            <div class="stat-value">3</div>
            <div class="stat-delta">100% on-time</div>
          </div>
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span class="stat-label">Total Spent</span>
              <div class="stat-icon" style="background:#FEF3C7;color:var(--warning);">💰</div>
            </div>
            <div class="stat-value" style="font-size:22px;">₹52,780</div>
            <div class="stat-delta">Across all bookings</div>
          </div>
        </div>

        <!-- Bookings Table -->
        <div class="card" style="padding:0;overflow:hidden;">
          <div style="padding:18px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h2 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;">My Bookings</h2>
            <div style="display:flex;gap:10px;">
              <input class="form-control" style="padding:7px 12px;font-size:12.5px;width:200px;" placeholder="🔍 Search bookings..." />
              <select class="form-control" style="padding:7px 12px;font-size:12.5px;width:140px;">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Transit</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead><tr>
                <th>Booking ID</th><th>Service</th><th>Route</th>
                <th>Date</th><th>Amount</th><th>Status</th><th>Actions</th>
              </tr></thead>
              <tbody>
                ${bookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary);">${b.id}</strong></td>
                  <td>${b.service}</td>
                  <td style="font-size:12.5px;">${b.from} → ${b.to}</td>
                  <td style="font-size:12.5px;color:var(--text-light);">${b.date}</td>
                  <td><strong>${b.amount}</strong></td>
                  <td>${statusBadge[b.status]}</td>
                  <td>
                    <div style="display:flex;gap:6px;">
                      <button class="btn btn-sm btn-outline" onclick="window._nav('tracking')" style="font-size:11px;padding:4px 10px;">📍 Track</button>
                      <button class="btn btn-sm btn-ghost" onclick="window._nav('invoice')" style="font-size:11px;padding:4px 10px;">🧾 Invoice</button>
                    </div>
                  </td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  window._nav = navigate;
}
