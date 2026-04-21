// Screen 7 – Admin Dashboard Overview
export function renderAdminDash(container, navigate) {
  const bookings = [
    { id:'BK-2026-0420', customer:'Sneha Patil',     service:'Office Relocation', from:'Surat',    to:'Vadodara', date:'Apr 30, 2026', amount:'₹19,200', status:'pending',   driver:'Unassigned' },
    { id:'BK-2026-0419', customer:'Vikas Mehta',     service:'Household Shifting', from:'Pune',     to:'Mumbai',   date:'Apr 29, 2026', amount:'₹13,600', status:'transit',   driver:'Ramesh K.' },
    { id:'BK-2026-0418', customer:'Ananya Nair',     service:'Vehicle Transport',  from:'Delhi',    to:'Chandigarh',date:'Apr 27, 2026',amount:'₹7,800',  status:'delivered', driver:'Suresh B.' },
    { id:'BK-2026-0417', customer:'Rahul Sharma',    service:'Household Shifting', from:'Nagpur',   to:'Hyderabad',date:'Apr 26, 2026', amount:'₹11,400', status:'delivered', driver:'Arun V.' },
    { id:'BK-2026-0416', customer:'Priya Deshmukh',  service:'Warehousing',        from:'Mumbai',   to:'Mumbai',   date:'Apr 25, 2026', amount:'₹3,600',  status:'transit',   driver:'N/A' },
  ];

  const badge = (s) => ({
    pending:   '<span class="badge badge-warning">⏳ Pending</span>',
    transit:   '<span class="badge badge-info">🚚 In Transit</span>',
    delivered: '<span class="badge badge-success">✅ Delivered</span>',
  }[s] || '');

  container.innerHTML = `
  <div class="page-wrap">
    <div class="layout-sidebar">
      <nav class="sidebar">
        <div style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;padding:10px 14px;margin-bottom:4px;opacity:.4;text-transform:uppercase;letter-spacing:.8px;">Admin Panel</div>
        <button class="sidebar-item active"><span class="icon">📊</span> Dashboard</button>
        <button class="sidebar-item" onclick="window._nav('assign')"><span class="icon">🚚</span> Assign Drivers</button>
        <button class="sidebar-item" onclick="window._nav('fleet')"><span class="icon">🚛</span> Fleet &amp; Drivers</button>
        <button class="sidebar-item" onclick="window._nav('analytics')"><span class="icon">📈</span> Analytics</button>
        <button class="sidebar-item" onclick="window._nav('invoice')"><span class="icon">🧾</span> Invoices</button>
        <button class="sidebar-item" onclick="window._nav('tracking')"><span class="icon">📍</span> Track All</button>
        <div style="flex:1;"></div>
        <button class="sidebar-item" onclick="window._nav('landing')"><span class="icon">🌐</span> View Site</button>
        <button class="sidebar-item"><span class="icon">⚙️</span> Settings</button>
        <button class="sidebar-item"><span class="icon">🚪</span> Logout</button>
      </nav>

      <div class="main-content">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <div>
            <h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;">Admin Dashboard</h1>
            <p style="color:var(--text-light);font-size:13px;">Chahar Packers &amp; Movers · Operations Overview</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:12px;color:var(--text-light);">Tuesday, April 21, 2026</span>
            <div style="width:8px;height:8px;border-radius:50%;background:var(--success);"></div>
            <span style="font-size:12px;font-weight:600;color:var(--success);">System Online</span>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid-4" style="margin-bottom:28px;">
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;">
              <span class="stat-label">Total Bookings</span>
              <div class="stat-icon" style="background:#EEF4FF;color:var(--primary);">📦</div>
            </div>
            <div class="stat-value">248</div>
            <div class="stat-delta">↑ 12% this month</div>
          </div>
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;">
              <span class="stat-label">In Transit</span>
              <div class="stat-icon" style="background:#DBEAFE;color:var(--info);">🚚</div>
            </div>
            <div class="stat-value">14</div>
            <div class="stat-delta" style="color:var(--info);">Active right now</div>
          </div>
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;">
              <span class="stat-label">Completed</span>
              <div class="stat-icon" style="background:#DCFCE7;color:var(--success);">✅</div>
            </div>
            <div class="stat-value">221</div>
            <div class="stat-delta">98.2% on-time rate</div>
          </div>
          <div class="stat-card">
            <div style="display:flex;justify-content:space-between;">
              <span class="stat-label">Total Revenue</span>
              <div class="stat-icon" style="background:#FEF3C7;color:var(--warning);">💰</div>
            </div>
            <div class="stat-value" style="font-size:22px;">₹18.4L</div>
            <div class="stat-delta">↑ ₹2.1L vs last month</div>
          </div>
        </div>

        <!-- Recent Bookings Table -->
        <div class="card" style="padding:0;overflow:hidden;">
          <div style="padding:18px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h2 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;">Latest Bookings</h2>
            <div style="display:flex;gap:10px;">
              <input class="form-control" style="padding:7px 12px;font-size:12.5px;width:200px;" placeholder="🔍 Search..." />
              <button class="btn btn-accent btn-sm" onclick="window._nav('assign')">+ Assign Driver</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead><tr>
                <th>Booking ID</th><th>Customer</th><th>Service</th>
                <th>Route</th><th>Date</th><th>Amount</th>
                <th>Status</th><th>Driver</th><th>Actions</th>
              </tr></thead>
              <tbody>
                ${bookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary);">${b.id}</strong></td>
                  <td>${b.customer}</td>
                  <td style="font-size:12px;">${b.service}</td>
                  <td style="font-size:12px;color:var(--text-light);">${b.from} → ${b.to}</td>
                  <td style="font-size:12px;color:var(--text-light);">${b.date}</td>
                  <td><strong>${b.amount}</strong></td>
                  <td>${badge(b.status)}</td>
                  <td style="font-size:12.5px;color:${b.driver==='Unassigned'?'var(--danger)':'inherit'};font-weight:${b.driver==='Unassigned'?'600':'400'};">${b.driver}</td>
                  <td>
                    <div style="display:flex;gap:5px;">
                      ${b.status==='pending' ? `<button class="btn btn-sm btn-primary" onclick="window._nav('assign')" style="font-size:11px;padding:4px 10px;">Assign</button>` : ''}
                      <button class="btn btn-sm btn-ghost" onclick="window._nav('invoice')" style="font-size:11px;padding:4px 10px;">🧾</button>
                      <button class="btn btn-sm btn-ghost" onclick="window._nav('tracking')" style="font-size:11px;padding:4px 10px;">📍</button>
                    </div>
                  </td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick action cards at bottom -->
        <div class="grid-3" style="margin-top:20px;">
          <div class="card" style="cursor:pointer;" onclick="window._nav('fleet')">
            <div style="font-size:28px;margin-bottom:10px;">🚛</div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:4px;">Fleet Management</div>
            <div style="font-size:12.5px;color:var(--text-light);">Manage drivers & vehicles</div>
          </div>
          <div class="card" style="cursor:pointer;" onclick="window._nav('analytics')">
            <div style="font-size:28px;margin-bottom:10px;">📈</div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:4px;">Analytics</div>
            <div style="font-size:12.5px;color:var(--text-light);">Revenue & performance charts</div>
          </div>
          <div class="card" style="cursor:pointer;" onclick="window._nav('invoice')">
            <div style="font-size:28px;margin-bottom:10px;">🧾</div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:4px;">Invoice Manager</div>
            <div style="font-size:12.5px;color:var(--text-light);">Generate & send PDFs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  window._nav = navigate;
}
