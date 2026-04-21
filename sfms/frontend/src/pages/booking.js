// Screen 3 – New Booking Form (Multi-Step Wizard)
export function renderBookingWizard(container, navigate) {
  let step = 0;
  const data = { service: 'Household Shifting', from: '', to: '', date: '', time: '', weight: '500', distance: '320' };

  const steps = ['Service Type', 'Locations', 'Schedule & Price', 'Review & Confirm'];

  function fare() {
    const base = { 'Household Shifting': 2500, 'Office Relocation': 4500, 'Vehicle Transport': 3200, 'Warehousing': 1800 };
    const b = base[data.service] || 2500;
    const dist = parseFloat(data.distance) || 320;
    const wt   = parseFloat(data.weight)   || 500;
    const distCharge = (dist * 4.5).toFixed(0);
    const labour     = (wt * 2.2).toFixed(0);
    const packing    = 800;
    const insurance  = (b * 0.03).toFixed(0);
    const subtotal   = b + parseInt(distCharge) + parseInt(labour) + packing + parseInt(insurance);
    const gst        = (subtotal * 0.18).toFixed(0);
    const total      = subtotal + parseInt(gst);
    return { b, distCharge, labour, packing, insurance, subtotal, gst, total };
  }

  function renderStep() {
    const f = fare();
    const stepContent = [
      // Step 1
      `<div>
        <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:18px;">Select Service Type</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          ${['Household Shifting','Office Relocation','Vehicle Transport','Warehousing'].map(s => `
            <div onclick="window._selectService('${s}')" style="padding:20px;border-radius:12px;border:2px solid ${data.service===s?'var(--primary)':'var(--border)'};background:${data.service===s?'#EEF4FF':'#fff'};cursor:pointer;text-align:center;transition:all .18s;">
              <div style="font-size:30px;margin-bottom:8px;">${{Hs:'🏠','Office Relocation':'🏢','Vehicle Transport':'🚗','Warehousing':'🏭','Household Shifting':'🏠'}[s]||'📦'}</div>
              <div style="font-weight:600;font-size:13.5px;">${s}</div>
              <div style="font-size:11px;color:var(--text-light);margin-top:4px;">${{
                'Household Shifting':'Safe home relocation',
                'Office Relocation':'Commercial moves',
                'Vehicle Transport':'Car & bike transport',
                'Warehousing':'Short & long-term storage'
              }[s]}</div>
              ${data.service===s?'<div style="margin-top:8px;"><span class="badge badge-info">Selected ✓</span></div>':''}
            </div>
          `).join('')}
        </div>
      </div>`,

      // Step 2
      `<div style="display:flex;flex-direction:column;gap:18px;">
        <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;">Pickup &amp; Delivery Locations</h3>
        <div class="form-group">
          <label>Pickup Address</label>
          <input class="form-control" id="fromAddr" placeholder="Flat 4B, Rose Apartments, Koregaon Park, Pune" value="${data.from}" />
        </div>
        <div class="form-group">
          <label>Pickup City &amp; PIN</label>
          <div class="form-row">
            <input class="form-control" placeholder="Pune" />
            <input class="form-control" placeholder="411001" />
          </div>
        </div>
        <div style="display:flex;justify-content:center;"><span style="font-size:24px;">⬇️</span></div>
        <div class="form-group">
          <label>Delivery Address</label>
          <input class="form-control" id="toAddr" placeholder="204, Sunrise Towers, Borivali West, Mumbai" value="${data.to}" />
        </div>
        <div class="form-group">
          <label>Delivery City &amp; PIN</label>
          <div class="form-row">
            <input class="form-control" placeholder="Mumbai" />
            <input class="form-control" placeholder="400092" />
          </div>
        </div>
        <div class="form-group">
          <label>Estimated Total Weight (kg)</label>
          <input class="form-control" id="wt" type="number" value="${data.weight}" min="50" max="5000" />
        </div>
      </div>`,

      // Step 3
      `<div>
        <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:18px;">Schedule &amp; Price Estimate</h3>
        <div class="form-row" style="margin-bottom:18px;">
          <div class="form-group">
            <label>Pickup Date</label>
            <input class="form-control" id="pickDate" type="date" value="${data.date}" min="${new Date().toISOString().split('T')[0]}" />
          </div>
          <div class="form-group">
            <label>Preferred Time Slot</label>
            <select class="form-control">
              <option>Morning (8AM – 12PM)</option>
              <option>Afternoon (12PM – 4PM)</option>
              <option>Evening (4PM – 7PM)</option>
            </select>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#E8F0FE,#FFF0EB);border-radius:14px;padding:22px;margin-top:4px;">
          <div style="font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:14px;">💰 Price Estimate</div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13.5px;">
            <div style="display:flex;justify-content:space-between;"><span>Base Fare (${data.service})</span><span>₹${f.b.toLocaleString()}</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Distance Charge (${data.distance} km × ₹4.5)</span><span>₹${parseInt(f.distCharge).toLocaleString()}</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Labour &amp; Packing (${data.weight} kg)</span><span>₹${parseInt(f.labour).toLocaleString()}</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Packing Material</span><span>₹${f.packing}</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Transit Insurance (3%)</span><span>₹${parseInt(f.insurance).toLocaleString()}</span></div>
            <div style="border-top:1px dashed rgba(0,0,0,.15);margin:4px 0;"></div>
            <div style="display:flex;justify-content:space-between;"><span>Subtotal</span><span>₹${f.subtotal.toLocaleString()}</span></div>
            <div style="display:flex;justify-content:space-between;"><span>GST (18%)</span><span>₹${parseInt(f.gst).toLocaleString()}</span></div>
            <div style="display:flex;justify-content:space-between;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;margin-top:6px;">
              <span>Total Estimate</span><span style="color:var(--primary)">₹${f.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <p style="font-size:11.5px;color:var(--text-light);margin-top:10px;">* Final amount may vary slightly based on actual weight and distance measurement.</p>
      </div>`,

      // Step 4
      `<div>
        <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:18px;">Review &amp; Confirm Booking</h3>
        <div style="background:var(--surface);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:10px;font-size:13.5px;margin-bottom:18px;">
          <div style="display:flex;justify-content:space-between;"><span class="text-muted">Service Type</span><strong>${data.service}</strong></div>
          <div style="display:flex;justify-content:space-between;"><span class="text-muted">From</span><strong>Koregaon Park, Pune</strong></div>
          <div style="display:flex;justify-content:space-between;"><span class="text-muted">To</span><strong>Borivali West, Mumbai</strong></div>
          <div style="display:flex;justify-content:space-between;"><span class="text-muted">Schedule</span><strong>April 28, 2026 · Morning</strong></div>
          <div style="display:flex;justify-content:space-between;"><span class="text-muted">Estimated Amount</span><strong style="color:var(--primary);">₹${f.total.toLocaleString()}</strong></div>
        </div>
        <div class="form-group" style="margin-bottom:16px;">
          <label>Special Instructions (optional)</label>
          <textarea class="form-control" rows="3" placeholder="e.g. Please handle the piano with extra care..."></textarea>
        </div>
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:16px;">
          <input type="checkbox" id="confirmTerms" checked style="margin-top:3px;" />
          <label for="confirmTerms" style="font-size:12.5px;color:var(--text-light);">
            I agree to the <a href="#" style="color:var(--primary);">Terms &amp; Conditions</a> and authorise Chahar Packers &amp; Movers to process this booking.
          </label>
        </div>
        <button class="btn btn-accent" style="width:100%;justify-content:center;padding:14px;font-size:15px;" onclick="window._nav('email')">
          ✅ Confirm Booking
        </button>
      </div>`
    ];

    container.innerHTML = `
    <div class="page-wrap" style="max-width:680px;margin:0 auto;padding:28px 20px;">
      <div class="page-header-row">
        <div>
          <h1 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;">New Booking</h1>
          <p style="color:var(--text-light);font-size:13px;">Step ${step+1} of 4 — ${steps[step]}</p>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="window._nav('landing')">← Back to Home</button>
      </div>

      <!-- Steps -->
      <div class="steps">
        ${steps.map((s,i) => `
          <div class="step ${i<step?'done':''} ${i===step?'active':''}">
            <div class="step-circle">${i<step?'✓':(i+1)}</div>
            <div class="step-label">${s}</div>
          </div>
        `).join('')}
      </div>

      <div class="card">
        ${stepContent[step]}
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:20px;">
        <button class="btn btn-ghost" ${step===0?'disabled style="opacity:.4;"':''} onclick="window._bookStep(${step-1})">
          ← Previous
        </button>
        ${step < 3 ? `<button class="btn btn-primary" onclick="window._bookStep(${step+1})">
          Next Step →
        </button>` : ''}
      </div>
    </div>
    `;

    window._nav = navigate;
    window._bookStep = (s) => { step = Math.max(0, Math.min(3, s)); renderStep(); };
    window._selectService = (s) => { data.service = s; renderStep(); };
  }

  renderStep();
}
