// Screen 8 – Admin Booking Assignment Modal
export function renderAssignModal(container, navigate) {
  let selected = null;

  const drivers = [
    { id:1, name:'Ramesh Kumar',   vehicle:'Tata Ace',    reg:'MH-12-AB-4321', rating:4.9, trips:186, avail:true },
    { id:2, name:'Suresh Bhati',   vehicle:'Ashok Leyland',reg:'GJ-05-CD-7890',rating:4.7, trips:142, avail:true },
    { id:3, name:'Arun Verma',     vehicle:'Eicher 2114', reg:'DL-08-EF-3211', rating:4.8, trips:210, avail:false },
    { id:4, name:'Manish Yadav',   vehicle:'Tata 407',    reg:'MH-04-GH-9900', rating:4.6, trips:98,  avail:true },
    { id:5, name:'Deepak Singh',   vehicle:'Mini Truck',  reg:'RJ-14-IJ-5566', rating:4.5, trips:73,  avail:true },
  ];

  function renderPage() {
    container.innerHTML = `
    <div class="page-wrap">
      <div class="layout-sidebar">
        <nav class="sidebar">
          <button class="sidebar-item" onclick="window._nav('admin-dash')"><span class="icon">📊</span> Dashboard</button>
          <button class="sidebar-item active"><span class="icon">🚚</span> Assign Drivers</button>
          <button class="sidebar-item" onclick="window._nav('fleet')"><span class="icon">🚛</span> Fleet &amp; Drivers</button>
          <button class="sidebar-item" onclick="window._nav('analytics')"><span class="icon">📈</span> Analytics</button>
          <div style="flex:1;"></div>
          <button class="sidebar-item" onclick="window._nav('landing')"><span class="icon">🌐</span> View Site</button>
        </nav>

        <div class="main-content">
          <div class="page-header-row">
            <div>
              <h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;">🚚 Driver Assignment</h1>
              <p style="color:var(--text-light);font-size:13px;">Assign an available driver &amp; vehicle to a pending booking</p>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="window._nav('admin-dash')">← Back to Dashboard</button>
          </div>

          <div style="display:grid;grid-template-columns:1fr 400px;gap:20px;">

            <!-- Left: Booking info + drivers -->
            <div>
              <!-- Booking card -->
              <div class="card" style="margin-bottom:20px;border-left:4px solid var(--accent);">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <h3 style="font-family:'Syne',sans-serif;font-size:15px;font-weight:700;">Booking BK-2026-0420</h3>
                  <span class="badge badge-warning">⏳ Pending Assignment</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
                  <div><span style="color:var(--text-light);">Customer:</span> <strong>Sneha Patil</strong></div>
                  <div><span style="color:var(--text-light);">Service:</span> <strong>Office Relocation</strong></div>
                  <div><span style="color:var(--text-light);">From:</span> <strong>Surat, Gujarat</strong></div>
                  <div><span style="color:var(--text-light);">To:</span> <strong>Vadodara, Gujarat</strong></div>
                  <div><span style="color:var(--text-light);">Date:</span> <strong>April 30, 2026</strong></div>
                  <div><span style="color:var(--text-light);">Amount:</span> <strong style="color:var(--primary);">₹19,200</strong></div>
                </div>
              </div>

              <!-- Driver list -->
              <div class="card" style="padding:0;overflow:hidden;">
                <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
                  <h3 style="font-family:'Syne',sans-serif;font-size:14px;font-weight:700;">Available Drivers</h3>
                  <select class="form-control" style="padding:6px 12px;font-size:12.5px;width:160px;">
                    <option>All Availability</option>
                    <option>Available Only</option>
                  </select>
                </div>
                <div style="padding:16px 20px;">
                  ${drivers.map(d => `
                    <div class="driver-row ${!d.avail?'':''}  ${selected===d.id?'selected':''} ${!d.avail?'opacity-50':''}"
                         onclick="${d.avail ? `window._selectDriver(${d.id})` : ''}"
                         style="${!d.avail ? 'opacity:.45;cursor:not-allowed;' : ''}">
                      <div class="driver-avatar">${d.name.split(' ').map(n=>n[0]).join('')}</div>
                      <div style="flex:1;">
                        <div style="font-weight:600;font-size:13.5px;">${d.name}</div>
                        <div style="font-size:11.5px;color:var(--text-light);">${d.vehicle} · ${d.reg}</div>
                        <div class="stars">${'★'.repeat(Math.floor(d.rating))}${'☆'.repeat(5-Math.floor(d.rating))}</div>
                      </div>
                      <div style="text-align:right;">
                        <span class="badge ${d.avail?'badge-success':'badge-danger'}" style="font-size:10px;">
                          ${d.avail ? '● Available' : '● On Trip'}
                        </span>
                        <div style="font-size:11px;color:var(--text-light);margin-top:4px;">${d.trips} trips · ${d.rating}★</div>
                        ${selected===d.id ? '<div style="font-size:11px;color:var(--primary);font-weight:700;margin-top:2px;">✓ Selected</div>' : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Right: Assignment form -->
            <div class="card" style="height:fit-content;position:sticky;top:80px;">
              <h3 style="font-family:'Syne',sans-serif;font-size:15px;font-weight:700;margin-bottom:18px;">Assignment Details</h3>
              <div style="display:flex;flex-direction:column;gap:14px;">
                <div class="form-group">
                  <label>Selected Driver</label>
                  <div style="padding:11px 14px;border-radius:8px;border:2px solid ${selected?'var(--primary)':'var(--border)'};background:${selected?'#EEF4FF':'var(--surface)'};font-size:13.5px;font-weight:600;min-height:44px;">
                    ${selected ? drivers.find(d=>d.id===selected).name + ' · ' + drivers.find(d=>d.id===selected).reg : '<span style="color:var(--muted);font-weight:400;">Select a driver from the list →</span>'}
                  </div>
                </div>
                <div class="form-group">
                  <label>Confirmed Pickup Time</label>
                  <input class="form-control" type="time" value="09:00" />
                </div>
                <div class="form-group">
                  <label>Pickup Date</label>
                  <input class="form-control" type="date" value="2026-04-30" />
                </div>
                <div class="form-group">
                  <label>Admin Notes</label>
                  <textarea class="form-control" rows="3" placeholder="e.g. Customer prefers morning pickup. Handle fragile items carefully."></textarea>
                </div>
                <div style="display:flex;align-items:center;gap:8px;padding:12px;background:var(--surface);border-radius:8px;">
                  <input type="checkbox" id="notify" checked />
                  <label for="notify" style="font-size:12.5px;">Send confirmation email to customer</label>
                </div>
                <button class="btn btn-primary" style="width:100%;justify-content:center;padding:13px;" ${!selected?'disabled style="opacity:.5;"':''} onclick="window._nav('admin-dash')">
                  ✅ Save Assignment
                </button>
                <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="window._nav('admin-dash')">Cancel</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    `;
    window._nav = navigate;
    window._selectDriver = (id) => { selected = id; renderPage(); };
  }

  renderPage();
}
