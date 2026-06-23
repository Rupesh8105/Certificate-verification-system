// Certificate Database
const certDB = {
  'CERT-2026-001': { title: 'Full Stack Web Development',      issued: '15 Jan 2026' },
  'CERT-2026-042': { title: 'Data Science & Machine Learning', issued: '20 Mar 2026' },
  'CERT-2025-118': { title: 'Cybersecurity Fundamentals',      issued: '10 Aug 2025' },
};

// In-memory users storage
let users = {};

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Register Function
function doRegister() {
  const fn = document.getElementById('r-fname').value.trim();
  const ln = document.getElementById('r-lname').value.trim();
  const em = document.getElementById('r-email').value.trim();
  const db = document.getElementById('r-dob').value;
  const cn = document.getElementById('r-certno').value.trim().toUpperCase();
  const ph = document.getElementById('r-phone').value.trim();
  const pw = document.getElementById('r-pass').value;
  const cp = document.getElementById('r-cpass').value;
  const er = document.getElementById('reg-err');

  er.classList.remove('show');

  if (!fn || !ln || !em || !db || !cn || !pw) {
    er.textContent = 'Please fill in all required fields.';
    er.classList.add('show');
    return;
  }
  if (!certDB[cn]) {
    er.textContent = 'Invalid Certificate Number. Try: CERT-2024-001';
    er.classList.add('show');
    return;
  }
  if (pw !== cp) {
    er.textContent = 'Passwords do not match.';
    er.classList.add('show');
    return;
  }
  if (pw.length < 6) {
    er.textContent = 'Password must be at least 6 characters.';
    er.classList.add('show');
    return;
  }
  if (users[em]) {
    er.textContent = 'This email is already registered.';
    er.classList.add('show');
    return;
  }

  const today = new Date();
  users[em] = {
    fn, ln, em, db, cn, ph, pw,
    joined: today.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  };

  const ok = document.getElementById('reg-ok');
  ok.classList.add('show');
  setTimeout(() => {
    ok.classList.remove('show');
    document.getElementById('l-email').value = em;
    showPage('login');
  }, 1500);
}

// Login Function
function doLogin() {
  const em = document.getElementById('l-email').value.trim();
  const pw = document.getElementById('l-pass').value;
  const er = document.getElementById('login-err');

  er.classList.remove('show');

  if (!em || !pw) {
    er.textContent = 'Please enter your email and password.';
    er.classList.add('show');
    return;
  }

  const user = users[em];
  if (!user || user.pw !== pw) {
    er.textContent = 'Incorrect email or password.';
    er.classList.add('show');
    return;
  }

  loadDash(user);
  showPage('dashboard');
}

// Load Dashboard
function loadDash(u) {
  document.getElementById('d-av').textContent     = (u.fn[0] + u.ln[0]).toUpperCase();
  document.getElementById('d-name').textContent   = u.fn + ' ' + u.ln;
  document.getElementById('d-cno').textContent    = u.cn;
  document.getElementById('d-email').textContent  = u.em;
  document.getElementById('d-phone').textContent  = u.ph || 'Not provided';
  document.getElementById('d-joined').textContent = u.joined;

  const dp = u.db.split('-');
  document.getElementById('d-dob').textContent = dp[2] + '/' + dp[1] + '/' + dp[0];

  const cert = certDB[u.cn];
  document.getElementById('d-ctitle').textContent = cert.title;
  document.getElementById('d-cid').textContent    = u.cn;
  document.getElementById('d-cissue').textContent = cert.issued;
}

// Logout Function
function doLogout() {
  document.getElementById('l-pass').value  = '';
  document.getElementById('l-email').value = '';
  showPage('hero');
}

// Enter key on login
document.getElementById('l-pass').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') doLogin();
});