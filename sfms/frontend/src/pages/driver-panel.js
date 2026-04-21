// Screen 9 – Driver Panel – My Jobs
export function renderDriverPanel(container, navigate) {
  const jobs = [
    {
      id: 'BK-2026-0419', customer: 'Vikas Mehta', service: 'Household Shifting',
      from: 'Koregaon Park, Pune', to: 'Borivali West, Mumbai',
      date: 'Apr 28, 2026', time: '9:00 AM', amount: '₹13,600',
      status: 'transit', active: true,
      items: 'Furniture (12 pcs), Electronics (4 boxes), Clothing (8 bags)',
    },
    {
      id: 'BK-2026-0415', customer: 'Karan Joshi', service: 'Office Relocation',
      from: 'Shivaji Nagar, Pune', to: 'Andheri East, Mumbai',
      date: 'Apr 30, 2026', time: '10:00 AM', amount: '₹18,500',
      status: 'assigned', active: false,
      items: 'Office desks (8), Computers (5 units), Filing cabinets (3)',
    },
    {
      id: 'BK-2026-0410', customer: 'Meera Iyer', service: 'Household Shifting',
      from: 'Viman Nagar, Pune', to: 'Thane West, Mumbai',
      date: 'May 2, 2026', time: '8:30 AM', amount: '₹10,200',
      status: 'assigned', active: false,
      items: 'Full household (3BHK)',
    },
  ];

  const statusMap = {
    transit:   { badge: '<span class="badge badge-info">🚚 In Transit</span>',     label: 'Active Trip' },
    assigned:  { badge: '<span class="badge badge-warning">📋 Upcoming</span>',    label: 'Upcoming' },
    delivered: { badge: '<span class="badge badge-success">✅ Delivered</span>',   label: 'Completed' },
  };

  container.innerHTML = `
  <div class="page-wrap">
    <div class="layout-sidebar">
      <nav class="sidebar">
        <div style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;padding:10px 14px;margin-bottom:4px;opacity:.4;text-transform:uppercase;letter-spacing:.8px;">Driver Portal</div>
        <button class="sidebar-item active"><span class="icon">📋</span> My Jobs</button>
        <button class="sidebar-item"><span class="icon">📍</span> Navigation</button>
        <button class="sidebar-item"><span class="icon">📊</span> My Stats</button>
        <button class="sidebar-item"><span class="icon">🔔</span> Notifications <span style="background:var(--accent);color:#fff;padding:1px 7px;border-radius:100px;font-size:10px;margin-left:4px;">2</span></button>
        <div style="flex:1;"></div>
        <button class="sidebar-item" onclick="window._nav('landing')"><span class="icon">🌐</span> Home</button>
        <button class="sidebar-item"><span class="icon">🚪</span> Logout</button>
      </nav>

      <div class="main-content">
        <!-- Driver profile card -->
        <div style="display:flex;gap:20px;margin-bottom:24px;align-items:flex-start;">
          <div class="card" style="display:flex;align-items:center;gap:16px;flex:1;">
            <div class="driver-avatar" style="width:60px;height:60px;font-size:22px;">RK</div>
            <div style="flex:1;">
              <h2 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;">Ramesh Kumar</h2>
              <div style="font-size:12.5px;color:var(--text-light);">Driver ID: DRV-2022-0018 · Tata Ace · MH-12-AB-4321</div>
              <div style="display:flex;align-items:center;gap:14px;margin-top:6px;">
                <div class="stars" style="font-size:14px;">★★★★★ 4.9</div>
                <span class="badge badge-success">● On Duty</span>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--primary);">186</div>
              <div style="font-size:11px;color:var(--text-light);text-transform:uppercase;letter-spacing:.5px;">Total Trips</div>
            </div>
          </div>
        </div>

        <!-- Active job card -->
        <div style="margin-bottom:20px;">
          <h2 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:12px;">🔴 Active Job</h2>
          <div class="card" style="border-left:4px solid var(--info);background:linear-gradient(135deg,#F0F7FF,#fff);">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;">
              <div>
                <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:var(--primary);">${jobs[0].id}</div>
                <div style="font-size:13px;color:var(--text-light);">${jobs[0].service} · ${jobs[0].customer}</div>
              </div>
              ${statusMap[jobs[0].status].badge}
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;font-size:13px;">
              <div>
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--text-light);margin-bottom:3px;">Pickup</div>
                <div style="font-weight:600;">${jobs[0].from}</div>
              </div>
              <div>
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--text-light);margin-bottom:3px;">Delivery</div>
                <div style="font-weight:600;">${jobs[0].to}</div>
              </div>
              <div>
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--text-light);margin-bottom:3px;">Date &amp; Time</div>
                <div style="font-weight:600;">${jobs[0].date} · ${jobs[0].time}</div>
              </div>
              <div>
                <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--text-light);margin-bottom:3px;">Amount</div>
                <div style="font-weight:700;font-size:15px;color:var(--primary);">${jobs[0].amount}</div>
              </div>
            </div>

            <div style="background:var(--surface);border-radius:8px;padding:12px;font-size:12.5px;margin-bottom:16px;">
              <strong>Items:</strong> ${jobs[0].items}
            </div>

            <!-- Status update buttons -->
            <div>
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--text-light);margin-bottom:10px;font-weight:700;">Update Trip Status</div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="btn btn-ghost" style="border:2px solid var(--success);color:var(--success);font-size:12.5px;">✅ Picked Up</button>
                <button class="btn btn-info" style="background:var(--info);color:#fff;font-size:12.5px;">🚚 Mark In Transit</button>
                <button class="btn btn-success" style="font-size:12.5px;" onclick="alert('Job BK-2026-0419 marked as Delivered!')">📦 Mark Delivered</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming jobs -->
        <h2 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:12px;">📅 Upcoming Jobs</h2>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${jobs.slice(1).map(j => `
          <div class="card" style="display:flex;align-items:center;gap:16px;">
            <div style="background:var(--surface);border-radius:10px;padding:12px 16px;text-align:center;min-width:60px;">
              <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--primary);">${j.date.split(' ')[1].replace(',','')}</div>
              <div style="font-size:10px;color:var(--text-light);text-transform:uppercase;">${j.date.split(' ')[0]}</div>
            </div>
            <div style="flex:1;">
              <div style="font-weight:700;font-size:13.5px;">${j.id} · ${j.customer}</div>
              <div style="font-size:12px;color:var(--text-light);">${j.service}</div>
              <div style="font-size:12px;color:var(--text-light);">${j.from} → ${j.to}</div>
            </div>
            <div style="text-align:right;">
              ${statusMap[j.status].badge}
              <div style="font-size:13px;font-weight:700;color:var(--primary);margin-top:6px;">${j.amount}</div>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
  window._nav = navigate;
}
