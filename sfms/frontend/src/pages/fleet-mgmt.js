// Screen 12 – Vehicle & Driver Management (Admin CRUD)
export function renderFleetMgmt(container, navigate) {
  let showModal = false;
  let editDriver = null;

  const drivers = [
    { id:'DRV-001', name:'Ramesh Kumar',   license:'MH-0120-1234567', exp:8, rating:4.9, phone:'+91 98765 43210', vehicle:'Tata Ace',        reg:'MH-12-AB-4321', trips:186, status:'available' },
    { id:'DRV-002', name:'Suresh Bhati',   license:'GJ-0219-9876543', exp:5, rating:4.7, phone:'+91 97654 32109', vehicle:'Ashok Leyland',   reg:'GJ-05-CD-7890', trips:142, status:'transit' },
    { id:'DRV-003', name:'Arun Verma',     license:'DL-0118-1122334', exp:11,rating:4.8, phone:'+91 96543 21098', vehicle:'Eicher 2114',     reg:'DL-08-EF-3211', trips:210, status:'transit' },
    { id:'DRV-004', name:'Manish Yadav',   license:'MH-0422-2233445', exp:4, rating:4.6, phone:'+91 95432 10987', vehicle:'Tata 407',        reg:'MH-04-GH-9900', trips:98,  status:'leave' },
    { id:'DRV-005', name:'Deepak Singh',   license:'RJ-0320-3344556', exp:3, rating:4.5, phone:'+91 94321 09876', vehicle:'Mini Truck',      reg:'RJ-14-IJ-5566', trips:73,  status:'available' },
    { id:'DRV-006', name:'Ravi Patel',     license:'GJ-0615-4455667', exp:7, rating:4.7, phone:'+91 93210 98765', vehicle:'Tata Ace',        reg:'GJ-07-KL-7788', trips:155, status:'available' },
  ];

  const statusBadge = {
    available: '<span class="badge badge-success">● Available</span>',
    transit:   '<span class="badge badge-info">🚚 On Trip</span>',
    leave:     '<span class="badge badge-muted">🏖 On Leave</span>',
  };

  function render() {
    container.innerHTML = `
    <div class="page-wrap">
      <div class="layout-sidebar">
        <nav class="sidebar">
          <button class="sidebar-item" onclick="window._nav('admin-dash')"><span class="icon">📊</span> Dashboard</button>
          <button class="sidebar-item" onclick="window._nav('assign')"><span class="icon">🚚</span> Assign Drivers</button>
          <button class="sidebar-item active"><span class="icon">🚛</span> Fleet &amp; Drivers</button>
          <button class="sidebar-item" onclick="window._nav('analytics')"><span class="icon">📈</span> Analytics</button>
          <button class="sidebar-item" onclick="window._nav('invoice')"><span class="icon">🧾</span> Invoices</button>
          <div style="flex:1;"></div>
          <button class="sidebar-item" onclick="window._nav('landing')"><span class="icon">🌐</span> View Site</button>
        </nav>

        <div class="main-content">
          <!-- Header -->
          <div class="page-header-row">
            <div>
              <h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;">🚛 Fleet &amp; Driver Management</h1>
              <p style="color:var(--text-light);font-size:13px;">Manage your driver roster and vehicle assignments</p>
            </div>
            <button class="btn btn-accent" onclick="window._showModal()">+ Add Driver</button>
          </div>

          <!-- Summary strip -->
          <div class="grid-4" style="margin-bottom:24px;">
            <div class="stat-card">
              <span class="stat-label">Total Drivers</span>
              <div class="stat-value">${drivers.length}</div>
            </div>
            <div class="stat-card">
              <span class="stat-label">Available</span>
              <div class="stat-value" style="color:var(--success);">${drivers.filter(d=>d.status==='available').length}</div>
            </div>
            <div class="stat-card">
              <span class="stat-label">On Trip</span>
              <div class="stat-value" style="color:var(--info);">${drivers.filter(d=>d.status==='transit').length}</div>
            </div>
            <div class="stat-card">
              <span class="stat-label">On Leave</span>
              <div class="stat-value" style="color:var(--muted);">${drivers.filter(d=>d.status==='leave').length}</div>
            </div>
          </div>

          <!-- Search + filter -->
          <div style="display:flex;gap:12px;margin-bottom:16px;">
            <input class="form-control" style="flex:1;padding:9px 14px;font-size:13px;" placeholder="🔍 Search driver by name, license, or vehicle..." />
            <select class="form-control" style="width:160px;font-size:13px;">
              <option>All Status</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>On Leave</option>
            </select>
          </div>

          <!-- Driver Table -->
          <div class="card" style="padding:0;overflow:hidden;">
            <div class="table-wrapper">
              <table>
                <thead><tr>
                  <th>Driver</th><th>License No.</th><th>Experience</th>
                  <th>Vehicle</th><th>Reg. No.</th><th>Rating</th>
                  <th>Total Trips</th><th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  ${drivers.map(d => `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:10px;">
                        <div class="driver-avatar" style="width:38px;height:38px;font-size:13px;">${d.name.split(' ').map(n=>n[0]).join('')}</div>
                        <div>
                          <div style="font-weight:600;font-size:13.5px;">${d.name}</div>
                          <div style="font-size:11px;color:var(--text-light);">${d.id} · ${d.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style="font-size:12.5px;font-family:monospace;">${d.license}</td>
                    <td><span class="chip chip-blue">${d.exp} yrs</span></td>
                    <td style="font-size:13px;">${d.vehicle}</td>
                    <td style="font-size:12.5px;font-family:monospace;font-weight:600;">${d.reg}</td>
                    <td>
                      <div class="stars" style="font-size:11px;">${'★'.repeat(Math.floor(d.rating))}</div>
                      <div style="font-size:11px;font-weight:600;">${d.rating}</div>
                    </td>
                    <td><strong>${d.trips}</strong></td>
                    <td>${statusBadge[d.status]}</td>
                    <td>
                      <div style="display:flex;gap:5px;">
                        <button class="btn btn-sm btn-outline" style="font-size:11px;padding:4px 10px;" onclick="window._showModal()">✏️ Edit</button>
                        <button class="btn btn-sm" style="background:#FEE2E2;color:var(--danger);font-size:11px;padding:4px 10px;border:none;border-radius:6px;cursor:pointer;" onclick="confirm('Delete ${d.name}?')">🗑️</button>
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

    <!-- Add/Edit Modal -->
    <div class="modal-overlay ${showModal ? 'open' : ''}" id="driverModal" onclick="window._closeModal(event)">
      <div class="modal">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
          <h2 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;">Add New Driver</h2>
          <button onclick="window._closeModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-light);">✕</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input class="form-control" placeholder="Ramesh" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input class="form-control" placeholder="Kumar" />
            </div>
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input class="form-control" type="tel" placeholder="+91 98765 43210" />
          </div>
          <div class="form-group">
            <label>Driving License Number</label>
            <input class="form-control" placeholder="MH-0120-1234567" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Vehicle Type</label>
              <select class="form-control">
                <option>Tata Ace</option>
                <option>Tata 407</option>
                <option>Ashok Leyland</option>
                <option>Eicher 2114</option>
                <option>Mini Truck</option>
              </select>
            </div>
            <div class="form-group">
              <label>Vehicle Registration</label>
              <input class="form-control" placeholder="MH-12-AB-1234" />
            </div>
          </div>
          <div class="form-group">
            <label>Years of Experience</label>
            <input class="form-control" type="number" placeholder="5" min="0" max="40" />
          </div>
          <div style="display:flex;gap:12px;margin-top:8px;">
            <button class="btn btn-accent" style="flex:1;justify-content:center;" onclick="window._closeModal()">✅ Save Driver</button>
            <button class="btn btn-ghost" onclick="window._closeModal()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    `;

    window._nav = navigate;
    window._showModal  = () => { showModal = true;  render(); };
    window._closeModal = (e) => {
      if (!e || e.target.id === 'driverModal') { showModal = false; render(); }
    };
  }

  render();
}
