// Screen 11 – Analytics Dashboard
export function renderAnalytics(container, navigate) {
  container.innerHTML = `
  <div class="page-wrap">
    <div class="layout-sidebar">
      <nav class="sidebar">
        <button class="sidebar-item" onclick="window._nav('admin-dash')"><span class="icon">📊</span> Dashboard</button>
        <button class="sidebar-item" onclick="window._nav('assign')"><span class="icon">🚚</span> Assign Drivers</button>
        <button class="sidebar-item" onclick="window._nav('fleet')"><span class="icon">🚛</span> Fleet &amp; Drivers</button>
        <button class="sidebar-item active"><span class="icon">📈</span> Analytics</button>
        <button class="sidebar-item" onclick="window._nav('invoice')"><span class="icon">🧾</span> Invoices</button>
        <div style="flex:1;"></div>
        <button class="sidebar-item" onclick="window._nav('landing')"><span class="icon">🌐</span> View Site</button>
      </nav>

      <div class="main-content">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <div>
            <h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;">📊 Analytics Dashboard</h1>
            <p style="color:var(--text-light);font-size:13px;">Q1 2026 — Revenue, Service Mix &amp; Driver Performance</p>
          </div>
          <select class="form-control" style="width:160px;padding:8px 12px;font-size:13px;">
            <option>Q1 2026 (Jan–Mar)</option>
            <option selected>Q2 2026 (Apr–Jun)</option>
            <option>All Time</option>
          </select>
        </div>

        <!-- KPI summary -->
        <div class="grid-4" style="margin-bottom:28px;">
          <div class="stat-card">
            <span class="stat-label">Total Revenue</span>
            <div class="stat-value" style="font-size:24px;">₹18.4L</div>
            <div class="stat-delta">↑ 18% vs Q1</div>
          </div>
          <div class="stat-card">
            <span class="stat-label">Avg Order Value</span>
            <div class="stat-value" style="font-size:24px;">₹11,200</div>
            <div class="stat-delta">↑ ₹850 vs Q1</div>
          </div>
          <div class="stat-card">
            <span class="stat-label">Deliveries</span>
            <div class="stat-value">221</div>
            <div class="stat-delta">↑ 34 vs Q1</div>
          </div>
          <div class="stat-card">
            <span class="stat-label">Customer Satisfaction</span>
            <div class="stat-value">4.8★</div>
            <div class="stat-delta">Based on 196 reviews</div>
          </div>
        </div>

        <!-- Charts row -->
        <div class="grid-2" style="margin-bottom:24px;">

          <!-- Monthly Revenue Bar Chart -->
          <div class="card">
            <h3 style="font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:16px;">Monthly Revenue — Q2 2026</h3>
            <div class="chart-wrap">
              <canvas id="revenueChart"></canvas>
            </div>
          </div>

          <!-- Service Distribution Pie -->
          <div class="card">
            <h3 style="font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:16px;">Service Type Distribution</h3>
            <div style="display:flex;align-items:center;gap:20px;">
              <div class="chart-wrap" style="height:200px;width:200px;flex-shrink:0;">
                <canvas id="pieChart"></canvas>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;">
                ${[
                  ['#0F4C81', 'Household Shifting', '55%'],
                  ['#FF6B35', 'Office Relocation',  '20%'],
                  ['#22C55E', 'Vehicle Transport',  '15%'],
                  ['#F59E0B', 'Warehousing',        '10%'],
                ].map(([c,l,p]) => `
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div style="width:10px;height:10px;border-radius:2px;background:${c};flex-shrink:0;"></div>
                    <span>${l}</span>
                    <strong style="margin-left:auto;">${p}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Driver Leaderboard -->
        <div class="card" style="padding:0;overflow:hidden;">
          <div style="padding:18px 24px;border-bottom:1px solid var(--border);">
            <h3 style="font-family:'Syne',sans-serif;font-size:15px;font-weight:700;">🏆 Driver Performance Leaderboard</h3>
          </div>
          <div class="table-wrapper">
            <table>
              <thead><tr>
                <th>Rank</th><th>Driver</th><th>Total Trips</th>
                <th>On-Time %</th><th>Rating</th><th>Revenue Generated</th><th>Status</th>
              </tr></thead>
              <tbody>
                ${[
                  [1, 'Arun Verma',     210, '99.1%', 4.8, '₹4.2L', 'available'],
                  [2, 'Ramesh Kumar',   186, '98.4%', 4.9, '₹3.8L', 'transit'],
                  [3, 'Suresh Bhati',   142, '97.2%', 4.7, '₹2.9L', 'available'],
                  [4, 'Manish Yadav',    98, '96.8%', 4.6, '₹1.9L', 'leave'],
                  [5, 'Deepak Singh',    73, '95.6%', 4.5, '₹1.4L', 'available'],
                ].map(([rank, name, trips, ot, rating, rev, status]) => `
                  <tr>
                    <td>
                      <div style="width:28px;height:28px;border-radius:50%;background:${rank<=3?'var(--warning)':'var(--surface)'};color:${rank<=3?'#fff':'var(--text)'};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;">
                        ${rank<=3 ? ['🥇','🥈','🥉'][rank-1] : rank}
                      </div>
                    </td>
                    <td>
                      <div style="display:flex;align-items:center;gap:10px;">
                        <div class="driver-avatar" style="width:34px;height:34px;font-size:12px;">${name.split(' ').map(n=>n[0]).join('')}</div>
                        <strong>${name}</strong>
                      </div>
                    </td>
                    <td><strong>${trips}</strong></td>
                    <td><strong style="color:var(--success);">${ot}</strong></td>
                    <td><span class="stars">${'★'.repeat(Math.floor(rating))}</span> <strong>${rating}</strong></td>
                    <td><strong style="color:var(--primary);">${rev}</strong></td>
                    <td>
                      <span class="badge ${{'available':'badge-success','transit':'badge-info','leave':'badge-muted'}[status]}">
                        ${{available:'● Available', transit:'🚚 On Trip', leave:'🏖 On Leave'}[status]}
                      </span>
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

  // Initialize charts after DOM is ready
  setTimeout(() => {
    // Revenue Bar Chart
    const ctx1 = document.getElementById('revenueChart');
    if (ctx1) {
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['April', 'May', 'June'],
          datasets: [{
            label: 'Revenue (₹)',
            data: [580000, 620000, 640000],
            backgroundColor: ['#0F4C81', '#1B3A5C', '#0F4C81'],
            borderRadius: 8,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              ticks: { callback: v => '₹' + (v/100000).toFixed(1) + 'L', font: { size: 11 } },
              grid: { color: '#E2E8F0' }
            },
            x: { grid: { display: false }, ticks: { font: { size: 12 } } }
          }
        }
      });
    }

    // Pie Chart
    const ctx2 = document.getElementById('pieChart');
    if (ctx2) {
      new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Household Shifting', 'Office Relocation', 'Vehicle Transport', 'Warehousing'],
          datasets: [{
            data: [55, 20, 15, 10],
            backgroundColor: ['#0F4C81', '#FF6B35', '#22C55E', '#F59E0B'],
            borderWidth: 0,
            hoverOffset: 6,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          cutout: '65%',
          plugins: { legend: { display: false } }
        }
      });
    }
  }, 100);
}
