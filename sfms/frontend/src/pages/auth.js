// Screen 2 – Customer Registration & Login
export function renderAuth(container, navigate) {
  let tab = 'login';

  // ── localStorage helpers ───────────────────────────────────────
  function getUsers() {
    return JSON.parse(localStorage.getItem('sfms_users') || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem('sfms_users', JSON.stringify(users));
  }
  function initDemoUser() {
    const users = getUsers();
    if (!users.find(u => u.email === 'admin@sfms.com')) {
      users.push({ firstName: 'Admin', lastName: 'SFMS', email: 'admin@sfms.com', phone: '9081882281', password: 'admin123' });
      saveUsers(users);
    }
  }

  // ── Toast ──────────────────────────────────────────────────────
  function showToast(msg, type = 'success') {
    let t = document.getElementById('sfms-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'sfms-toast';
      document.body.appendChild(t);
    }
    t.style.cssText = `
      position:fixed;bottom:28px;right:28px;padding:13px 20px;border-radius:12px;
      font-size:14px;font-weight:600;color:white;z-index:9999;max-width:300px;
      background:${type === 'success' ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#ef4444,#dc2626)'};
      box-shadow:0 4px 20px rgba(0,0,0,0.15);animation:toastIn 0.3s ease;
    `;
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.display = 'none'; }, 3500);
  }

  // ── Google Popup ───────────────────────────────────────────────
  function openGooglePopup() {
    let overlay = document.getElementById('google-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'google-overlay';
      document.body.appendChild(overlay);
    }
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;
      display:flex;align-items:center;justify-content:center;
    `;
    overlay.innerHTML = `
      <div style="background:white;border-radius:20px;width:370px;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,0.2);">
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="44" style="margin-bottom:8px;"/>
          <h3 style="font-size:18px;font-weight:800;margin:0;">Sign in with Google</h3>
          <p style="font-size:13px;color:#6b7280;margin-top:4px;">Choose an account to continue to SFMS</p>
        </div>
        ${[
          { name: 'Ajay Chahar',   email: 'ajay.chahar@gmail.com',  color: '#4285f4', letter: 'A' },
          { name: 'Rahul Sharma',  email: 'rahul.sharma@gmail.com',  color: '#ea4335', letter: 'R' },
          { name: 'Use another account', email: '', color: '#34a853', letter: '+' }
        ].map(acc => `
          <div data-gemail="${acc.email}" data-gname="${acc.name}" data-gcolor="${acc.color}"
               style="display:flex;align-items:center;gap:14px;padding:13px;border:1.5px solid #dde3f0;
                      border-radius:12px;cursor:pointer;margin-bottom:8px;transition:all 0.2s;"
               onmouseover="this.style.borderColor='#4285f4';this.style.background='#f8f9ff';"
               onmouseout="this.style.borderColor='#dde3f0';this.style.background='white';">
            <div style="width:40px;height:40px;border-radius:50%;background:${acc.color};display:flex;
                        align-items:center;justify-content:center;color:white;font-weight:700;font-size:17px;">
              ${acc.letter}
            </div>
            <div>
              <div style="font-weight:600;font-size:14px;">${acc.name}</div>
              ${acc.email ? `<div style="font-size:12px;color:#6b7280;">${acc.email}</div>` : ''}
            </div>
            <div style="margin-left:auto;color:#6b7280;font-size:18px;">›</div>
          </div>
        `).join('')}
        <button id="google-cancel-btn" style="width:100%;padding:10px;border:1.5px solid #dde3f0;border-radius:10px;
                background:transparent;font-size:14px;color:#6b7280;cursor:pointer;margin-top:4px;">
          Cancel
        </button>
      </div>
    `;

    // Account click
    overlay.querySelectorAll('[data-gname]').forEach(el => {
      el.addEventListener('click', () => {
        const name  = el.dataset.gname;
        const email = el.dataset.gemail || `${name.split(' ')[0].toLowerCase()}@gmail.com`;
        const color = el.dataset.gcolor;
        closeGooglePopup();
        // Save if new
        const users = getUsers();
        if (!users.find(u => u.email === email)) {
          users.push({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] || '', email, phone: '', password: '', google: true });
          saveUsers(users);
        }
        localStorage.setItem('sfms_current', JSON.stringify({ name, email, color }));
        showSuccess(name.split(' ')[0], name, color, false);
      });
    });

    document.getElementById('google-cancel-btn').addEventListener('click', closeGooglePopup);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeGooglePopup(); });
  }

  function closeGooglePopup() {
    const o = document.getElementById('google-overlay');
    if (o) o.style.display = 'none';
  }

  // ── Show Success screen ────────────────────────────────────────
  function showSuccess(firstName, fullName, color, isNew) {
    const avatarLetter = firstName[0].toUpperCase();
    container.innerHTML = `
      <div class="page-wrap">
        <div class="auth-wrap">
          <div class="auth-box" style="text-align:center;padding:40px 36px;">
            <div style="width:72px;height:72px;background:linear-gradient(135deg,#10b981,#059669);
                        border-radius:50%;display:flex;align-items:center;justify-content:center;
                        font-size:36px;margin:0 auto 20px;box-shadow:0 8px 24px rgba(16,185,129,0.3);">✓</div>
            <h2 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:8px;">
              ${isNew ? `Welcome, ${firstName}! 🎉` : `Welcome back, ${firstName}!`}
            </h2>
            <p style="color:var(--text-light);font-size:14px;margin-bottom:20px;">
              ${isNew ? 'Account created successfully' : 'You have successfully logged in'}
            </p>
            <div style="display:inline-flex;align-items:center;gap:10px;background:#f0fdf4;
                        border:1px solid #bbf7d0;border-radius:100px;padding:8px 18px 8px 8px;margin-bottom:24px;">
              <div style="width:34px;height:34px;border-radius:50%;background:${color};display:flex;
                          align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;">
                ${avatarLetter}
              </div>
              <span style="font-size:14px;font-weight:600;color:#065f46;">${fullName}</span>
            </div>

            <div id="loading-section">
              <div style="height:4px;background:#e5e7eb;border-radius:4px;overflow:hidden;margin-bottom:8px;">
                <div id="load-fill" style="height:100%;border-radius:4px;
                     background:linear-gradient(90deg,var(--primary,#1a56db),#0ea5e9);
                     animation:sfmsLoad 1.5s ease forwards;width:0%;"></div>
              </div>
              <p style="font-size:12px;color:var(--text-light);">Redirecting to dashboard...</p>
            </div>

            <div id="portal-grid" style="display:none;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
              ${[
                { icon: '👤', name: 'Customer',  role: 'Book & Track',  route: 'customer-dash' },
                { icon: '🛠️', name: 'Admin',     role: 'Manage All',    route: 'admin-dash' },
                { icon: '🚛', name: 'Driver',    role: 'My Jobs',       route: 'driver-dash' }
              ].map(p => `
                <div data-route="${p.route}" style="background:#f8faff;border:1.5px solid #dde3f0;border-radius:12px;
                      padding:14px 10px;cursor:pointer;text-align:center;transition:all 0.2s;"
                     onmouseover="this.style.borderColor='#1a56db';this.style.background='#eff4ff';this.style.transform='translateY(-2px)';"
                     onmouseout="this.style.borderColor='#dde3f0';this.style.background='#f8faff';this.style.transform='none';">
                  <div style="font-size:24px;margin-bottom:6px;">${p.icon}</div>
                  <div style="font-size:12px;font-weight:600;">${p.name}</div>
                  <div style="font-size:11px;color:var(--text-light,#6b7280);margin-top:2px;">${p.role}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      <style>
        @keyframes sfmsLoad { from{width:0%} to{width:100%} }
      </style>
    `;

    // Portal click → navigate
    container.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.route));
    });

    // After 1.7s show portal grid
    setTimeout(() => {
      const ls = document.getElementById('loading-section');
      const pg = document.getElementById('portal-grid');
      if (ls) ls.style.display = 'none';
      if (pg) pg.style.display = 'grid';
    }, 1700);

    showToast(`Logged in as ${fullName} ✓`);
  }

  // ── Validation helpers ─────────────────────────────────────────
  function setError(inputId, errId, show, msg) {
    const inp = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (!inp || !err) return;
    if (show) {
      inp.style.borderColor = '#ef4444';
      if (msg) err.textContent = msg;
      err.style.display = 'block';
    } else {
      inp.style.borderColor = '';
      err.style.display = 'none';
    }
  }
  function clearErrors() {
    container.querySelectorAll('.sfms-input').forEach(i => i.style.borderColor = '');
    container.querySelectorAll('.sfms-err').forEach(e => e.style.display = 'none');
  }

  // ── Login handler ──────────────────────────────────────────────
  function doLogin() {
    clearErrors();
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPassword').value;
    let valid = true;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('loginEmail', 'loginEmailErr', true, 'Please enter a valid email'); valid = false;
    }
    if (!pass) {
      setError('loginPassword', 'loginPassErr', true, 'Password is required'); valid = false;
    }
    if (!valid) return;

    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Logging in...';

    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === pass);
      if (user) {
        const colors = ['#4285f4','#ea4335','#0ea5e9','#10b981','#8b5cf6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const name = `${user.firstName} ${user.lastName}`.trim();
        localStorage.setItem('sfms_current', JSON.stringify({ name, email, color }));
        showSuccess(user.firstName, name, color, false);
      } else {
        btn.disabled = false;
        btn.textContent = '🔐 Login to Portal';
        showToast('Invalid email or password', 'error');
        setError('loginPassword', 'loginPassErr', true, 'Wrong email or password. Try admin@sfms.com / admin123');
      }
    }, 900);
  }

  // ── Register handler ───────────────────────────────────────────
  function doRegister() {
    clearErrors();
    const first   = document.getElementById('regFirst').value.trim();
    const last    = document.getElementById('regLast').value.trim();
    const email   = document.getElementById('regEmail').value.trim();
    const phone   = document.getElementById('regPhone').value.trim();
    const pass    = document.getElementById('regPass').value;
    const confirm = document.getElementById('regConfirm').value;
    const terms   = document.getElementById('regTerms').checked;
    let valid = true;

    if (!first) { setError('regFirst','regFirstErr',true,'First name required'); valid = false; }
    if (!last)  { setError('regLast','regLastErr',true,'Last name required');    valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('regEmail','regEmailErr',true,'Enter a valid email'); valid = false;
    }
    if (!phone || phone.replace(/\D/g,'').length < 10) {
      setError('regPhone','regPhoneErr',true,'Enter a valid 10-digit number'); valid = false;
    }
    if (!pass || pass.length < 6) {
      setError('regPass','regPassErr',true,'Password must be at least 6 characters'); valid = false;
    }
    if (pass !== confirm) {
      setError('regConfirm','regConfirmErr',true,'Passwords do not match'); valid = false;
    }
    if (!terms) {
      const te = document.getElementById('termsErr');
      if (te) { te.style.display = 'block'; }
      valid = false;
    }
    if (!valid) return;

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      setError('regEmail','regEmailErr',true,'Email already registered'); return;
    }

    const btn = document.getElementById('registerBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Creating account...';

    setTimeout(() => {
      users.push({ firstName: first, lastName: last, email, phone, password: pass });
      saveUsers(users);
      const colors = ['#4285f4','#ea4335','#0ea5e9','#10b981','#8b5cf6'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const name = `${first} ${last}`;
      localStorage.setItem('sfms_current', JSON.stringify({ name, email, color }));
      showSuccess(first, name, color, true);
    }, 1000);
  }

  // ── Forgot Password ────────────────────────────────────────────
  function forgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) {
      showToast('Enter your email first', 'error');
      document.getElementById('loginEmail').focus();
      return;
    }
    showToast(`Reset link sent to ${email} 📧`);
  }

  // ── Main render ────────────────────────────────────────────────
  function render() {
    initDemoUser();

    const inputStyle = `
      width:100%;padding:11px 14px;border:1.5px solid var(--border,#dde3f0);border-radius:10px;
      font-family:'DM Sans',sans-serif;font-size:14px;color:var(--text,#111827);
      background:#fafbff;outline:none;box-sizing:border-box;transition:border-color 0.2s;
    `;
    const errStyle = `font-size:12px;color:#ef4444;margin-top:4px;display:none;`;
    const labelStyle = `display:block;font-size:13px;font-weight:600;color:var(--text,#111827);margin-bottom:6px;`;
    const googleBtnStyle = `
      width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px;
      border:1.5px solid var(--border,#dde3f0);border-radius:12px;background:white;
      font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:var(--text,#111827);
      cursor:pointer;margin-bottom:20px;transition:all 0.2s;
    `;

    container.innerHTML = `
      <div class="page-wrap">
        <div class="auth-wrap">
          <div class="auth-box">

            <!-- Logo -->
            <div style="text-align:center;margin-bottom:24px;">
              <div style="font-size:36px;">🚚</div>
              <h2 style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-top:8px;">
                Chahar Packers &amp; Movers
              </h2>
              <p style="color:var(--text-light,#6b7280);font-size:13px;">Smart Fleet Management System</p>
            </div>

            <!-- Tabs -->
            <div style="display:flex;background:#f3f6ff;border-radius:12px;padding:4px;margin-bottom:28px;gap:4px;">
              <button id="tabLoginBtn" style="flex:1;padding:10px;border:none;border-radius:9px;
                font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;
                background:${tab==='login'?'white':'transparent'};
                color:${tab==='login'?'var(--primary,#1a56db)':'var(--text-light,#6b7280)'};
                box-shadow:${tab==='login'?'0 2px 8px rgba(26,86,219,0.12)':'none'};">
                Login
              </button>
              <button id="tabRegisterBtn" style="flex:1;padding:10px;border:none;border-radius:9px;
                font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;
                background:${tab==='register'?'white':'transparent'};
                color:${tab==='register'?'var(--primary,#1a56db)':'var(--text-light,#6b7280)'};
                box-shadow:${tab==='register'?'0 2px 8px rgba(26,86,219,0.12)':'none'};">
                Register
              </button>
            </div>

            <!-- LOGIN -->
            <div id="loginForm" style="display:${tab==='login'?'block':'none'};">
              <button id="googleLoginBtn" style="${googleBtnStyle}">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" height="18"/>
                Continue with Google
              </button>
              <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:var(--text-light,#6b7280);margin-bottom:20px;">
                <div style="flex:1;height:1px;background:var(--border,#dde3f0);"></div>
                or login with email
                <div style="flex:1;height:1px;background:var(--border,#dde3f0);"></div>
              </div>

              <div style="margin-bottom:16px;">
                <label style="${labelStyle}">Email Address</label>
                <input id="loginEmail" class="sfms-input" type="email" placeholder="you@example.com" style="${inputStyle}"/>
                <div id="loginEmailErr" class="sfms-err" style="${errStyle}">Please enter a valid email</div>
              </div>
              <div style="margin-bottom:8px;">
                <label style="${labelStyle}">Password</label>
                <input id="loginPassword" class="sfms-input" type="password" placeholder="••••••••" style="${inputStyle}"/>
                <div id="loginPassErr" class="sfms-err" style="${errStyle}">Password is required</div>
              </div>
              <div style="display:flex;justify-content:flex-end;margin-bottom:20px;">
                <a id="forgotLink" href="#" style="font-size:12.5px;color:var(--primary,#1a56db);text-decoration:none;font-weight:500;">
                  Forgot Password?
                </a>
              </div>
              <button id="loginBtn" style="
                width:100%;padding:13px;border:none;border-radius:12px;
                font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;
                background:linear-gradient(135deg,#1a56db,#1341b0);color:white;
                box-shadow:0 4px 16px rgba(26,86,219,0.3);transition:all 0.2s;">
                🔐 Login to Portal
              </button>
              <div style="text-align:center;margin-top:14px;font-size:12px;color:var(--text-light,#6b7280);">
                Demo: <span style="font-family:monospace;background:#f3f6ff;padding:3px 10px;border-radius:6px;font-size:11.5px;">
                  admin@sfms.com / admin123
                </span>
              </div>
            </div>

            <!-- REGISTER -->
            <div id="registerForm" style="display:${tab==='register'?'block':'none'};">
              <button id="googleRegisterBtn" style="${googleBtnStyle}">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" height="18"/>
                Sign up with Google
              </button>
              <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:var(--text-light,#6b7280);margin-bottom:20px;">
                <div style="flex:1;height:1px;background:var(--border,#dde3f0);"></div>
                or register with email
                <div style="flex:1;height:1px;background:var(--border,#dde3f0);"></div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <div>
                  <label style="${labelStyle}">First Name</label>
                  <input id="regFirst" class="sfms-input" type="text" placeholder="Rahul" style="${inputStyle}"/>
                  <div id="regFirstErr" class="sfms-err" style="${errStyle}">Required</div>
                </div>
                <div>
                  <label style="${labelStyle}">Last Name</label>
                  <input id="regLast" class="sfms-input" type="text" placeholder="Sharma" style="${inputStyle}"/>
                  <div id="regLastErr" class="sfms-err" style="${errStyle}">Required</div>
                </div>
              </div>
              <div style="margin-bottom:16px;">
                <label style="${labelStyle}">Email Address</label>
                <input id="regEmail" class="sfms-input" type="email" placeholder="rahul@example.com" style="${inputStyle}"/>
                <div id="regEmailErr" class="sfms-err" style="${errStyle}">Please enter a valid email</div>
              </div>
              <div style="margin-bottom:16px;">
                <label style="${labelStyle}">Phone Number</label>
                <input id="regPhone" class="sfms-input" type="tel" placeholder="+91 98765 43210" style="${inputStyle}"/>
                <div id="regPhoneErr" class="sfms-err" style="${errStyle}">Enter a valid 10-digit number</div>
              </div>
              <div style="margin-bottom:16px;">
                <label style="${labelStyle}">Password</label>
                <input id="regPass" class="sfms-input" type="password" placeholder="••••••••" style="${inputStyle}"/>
                <div id="regPassErr" class="sfms-err" style="${errStyle}">Password must be at least 6 characters</div>
              </div>
              <div style="margin-bottom:16px;">
                <label style="${labelStyle}">Confirm Password</label>
                <input id="regConfirm" class="sfms-input" type="password" placeholder="••••••••" style="${inputStyle}"/>
                <div id="regConfirmErr" class="sfms-err" style="${errStyle}">Passwords do not match</div>
              </div>
              <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:6px;">
                <input type="checkbox" id="regTerms" style="margin-top:3px;accent-color:var(--primary,#1a56db);"/>
                <label for="regTerms" style="font-size:12.5px;color:var(--text-light,#6b7280);font-weight:400;margin:0;">
                  I agree to the <a href="#" style="color:var(--primary,#1a56db);">Terms of Service</a>
                  and <a href="#" style="color:var(--primary,#1a56db);">Privacy Policy</a>
                </label>
              </div>
              <div id="termsErr" style="${errStyle}margin-bottom:12px;">Please accept the terms to continue</div>
              <button id="registerBtn" style="
                width:100%;padding:13px;border:none;border-radius:12px;
                font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;
                background:linear-gradient(135deg,#0ea5e9,#0284c7);color:white;
                box-shadow:0 4px 16px rgba(14,165,233,0.3);transition:all 0.2s;">
                ✨ Create Account
              </button>
            </div>

          </div>
        </div>
      </div>
      <style>
        .sfms-input:focus { border-color: var(--primary,#1a56db) !important; outline:none;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.08); background: white !important; }
      </style>
    `;

    // ── Wire up events ───────────────────────────────────────────
    window._nav = navigate;

    document.getElementById('tabLoginBtn').addEventListener('click', () => { tab = 'login'; render(); });
    document.getElementById('tabRegisterBtn').addEventListener('click', () => { tab = 'register'; render(); });

    document.getElementById('googleLoginBtn').addEventListener('click', openGooglePopup);
    document.getElementById('googleRegisterBtn').addEventListener('click', openGooglePopup);

    document.getElementById('loginBtn').addEventListener('click', doLogin);
    document.getElementById('registerBtn').addEventListener('click', doRegister);
    document.getElementById('forgotLink').addEventListener('click', forgotPassword);

    // Focus styling
    container.querySelectorAll('.sfms-input').forEach(inp => {
      inp.addEventListener('focus', () => { inp.style.borderColor = 'var(--primary,#1a56db)'; inp.style.background = 'white'; });
      inp.addEventListener('blur',  () => { if (!inp.classList.contains('error-field')) inp.style.borderColor = ''; });
    });

    // Enter key
    container.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        if (tab === 'login') doLogin();
        else doRegister();
      }
    });
  }

  render();
}