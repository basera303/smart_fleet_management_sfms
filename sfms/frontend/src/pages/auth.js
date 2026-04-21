// Screen 2 – Customer Registration & Login
export function renderAuth(container, navigate) {
  let tab = 'login';

  function render() {
    container.innerHTML = `
    <div class="page-wrap">
      <div class="auth-wrap">
        <div class="auth-box">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="font-size:36px;">🚚</div>
            <h2 style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-top:8px;">Chahar Packers &amp; Movers</h2>
            <p style="color:var(--text-light);font-size:13px;">Smart Fleet Management System</p>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab ${tab==='login'?'active':''}" onclick="window._authTab('login')">Login</button>
            <button class="auth-tab ${tab==='register'?'active':''}" onclick="window._authTab('register')">Register</button>
          </div>

          ${tab === 'login' ? `
          <div style="display:flex;flex-direction:column;gap:16px;">
            <button class="social-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" height="18"> Continue with Google
            </button>
            <div class="divider">or login with email</div>
            <div class="form-group">
              <label>Email Address</label>
              <input class="form-control" type="email" placeholder="you@example.com" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input class="form-control" type="password" placeholder="••••••••" />
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:-8px;">
              <a href="#" style="font-size:12px;color:var(--primary);text-decoration:none;">Forgot Password?</a>
            </div>
            <button class="btn btn-primary" style="width:100%;justify-content:center;padding:13px;" onclick="window._nav('customer-dash')">
              Login to Portal
            </button>
            <div style="text-align:center;font-size:13px;color:var(--text-light);">
              <span style="font-size:11px;padding:3px 10px;background:var(--surface);border-radius:6px;">
                Demo: admin@sfms.com / admin123
              </span>
            </div>
          </div>
          ` : `
          <div style="display:flex;flex-direction:column;gap:14px;">
            <button class="social-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" height="18"> Sign up with Google
            </button>
            <div class="divider">or register with email</div>
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input class="form-control" type="text" placeholder="Rahul" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input class="form-control" type="text" placeholder="Sharma" />
              </div>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input class="form-control" type="email" placeholder="rahul@example.com" />
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input class="form-control" type="tel" placeholder="+91 98765 43210" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input class="form-control" type="password" placeholder="••••••••" />
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <input class="form-control" type="password" placeholder="••••••••" />
            </div>
            <div style="display:flex;align-items:flex-start;gap:10px;margin-top:-4px;">
              <input type="checkbox" id="terms" style="margin-top:3px;" />
              <label for="terms" style="font-size:12.5px;color:var(--text-light);">
                I agree to the <a href="#" style="color:var(--primary)">Terms of Service</a> and <a href="#" style="color:var(--primary)">Privacy Policy</a>
              </label>
            </div>
            <button class="btn btn-accent" style="width:100%;justify-content:center;padding:13px;" onclick="window._nav('booking')">
              Create Account
            </button>
          </div>
          `}
        </div>
      </div>
    </div>
    `;
    window._nav = navigate;
    window._authTab = (t) => { tab = t; render(); };
  }

  render();
}
