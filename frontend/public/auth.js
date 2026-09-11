// Authentication Handlers for Login and Registration
let currentLoginRole = 'student';

function getPortalTarget(role) {
  if (role === 'worker' || role === 'artisan' || role === 'entrepreneur' || role === 'business') {
    return 'beneficiary-dashboard.html';
  }
  return 'student-dashboard.html';
}

function setLoginRole(role) {
  currentLoginRole = role;
  const tabStudent = document.getElementById('tab-btn-student');
  const tabWorker = document.getElementById('tab-btn-worker');

  const isStudent = role === 'student';
  if (tabStudent) tabStudent.classList.toggle('active', isStudent);
  if (tabWorker) tabWorker.classList.toggle('active', !isStudent);

  const title = document.getElementById('login-title');
  const subtitle = document.getElementById('login-subtitle');
  const socialBlock = document.getElementById('student-social-block');
  const workerQuickBlock = document.getElementById('worker-quick-block');
  const lblIdentifier = document.getElementById('lbl-identifier');
  const inputEmail = document.getElementById('login-email');
  const lblPass = document.getElementById('lbl-pass');
  const inputPass = document.getElementById('login-pass');
  const btnOtp = document.getElementById('btn-request-otp');
  const btnSubmit = document.getElementById('btn-login-submit');

  if (isStudent) {
    if (title) title.innerText = "Student & Youth Portal Login";
    if (subtitle) subtitle.innerText = "Access your original career roadmap, resume analyzer & tech lab";
    if (socialBlock) socialBlock.style.display = 'block';
    if (workerQuickBlock) workerQuickBlock.style.display = 'none';
    if (lblIdentifier) lblIdentifier.innerText = "Student Email Address";
    if (inputEmail) {
      inputEmail.placeholder = "e.g., arjun@karman.gov.in";
      inputEmail.value = "arjun@karman.gov.in";
    }
    if (lblPass) lblPass.innerText = "Password";
    if (inputPass) {
      inputPass.placeholder = "••••••••";
      inputPass.value = "password123";
    }
    if (btnOtp) btnOtp.style.display = 'none';
    if (btnSubmit) btnSubmit.innerText = "Continue to Student Workspace →";
  } else {
    // Worker / Artisan / Business
    if (title) title.innerText = "Beneficiary Portal Login (श्रमिक / शिल्पकार / उद्यम)";
    if (subtitle) subtitle.innerText = "Access your livelihood mapping, RPL certificate, PM-AJAY grants & enterprise plan";
    if (socialBlock) socialBlock.style.display = 'none';
    if (workerQuickBlock) workerQuickBlock.style.display = 'block';
    if (lblIdentifier) lblIdentifier.innerText = "Registered Mobile / ID (मोबाइल नंबर)";
    if (inputEmail) {
      inputEmail.placeholder = "e.g. 919876543210";
      inputEmail.value = "919876543210";
    }
    if (lblPass) lblPass.innerText = "SMS OTP / Password (ओटीपी)";
    if (inputPass) {
      inputPass.placeholder = "Enter 4-digit OTP or password";
      inputPass.value = "1234";
    }
    if (btnOtp) btnOtp.style.display = 'inline-block';
    if (btnSubmit) btnSubmit.innerText = "Continue to Beneficiary Portal →";
  }
}

function requestWorkerOtp() {
  const phone = (document.getElementById('login-email') || {}).value || '919876543210';
  alert(`ओटीपी भेजा गया (OTP Sent)! A 4-digit code (1234) has been sent to +${phone}.`);
  const pass = document.getElementById('login-pass');
  if (pass) {
    pass.value = '1234';
    pass.focus();
  }
}

function handleSocialLogin(role) {
  if (role === 'worker' || role === 'artisan' || role === 'entrepreneur') {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Sunita Devi', identifier: '919876543210', role: 'worker', trade: 'Tailoring & Sewing' }));
    localStorage.setItem('karman_user_id', 'sunita@karman.gov.in');
    localStorage.setItem('karman_role', 'worker');
    localStorage.setItem('karman_token', 'token_worker_' + Date.now());
    window.location.href = 'beneficiary-dashboard.html';
  } else {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Arjun Mehta', identifier: 'arjun@karman.gov.in', role: 'student', trade: 'AI / ML Engineer' }));
    localStorage.setItem('karman_user_id', 'arjun@karman.gov.in');
    localStorage.setItem('karman_role', 'student');
    localStorage.setItem('karman_token', 'token_student_' + Date.now());
    window.location.href = 'student-dashboard.html';
  }
}

// Check URL param on page load (e.g. login.html?role=worker)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = (urlParams.get('role') || '').toLowerCase();
  if (roleParam === 'worker' || roleParam === 'artisan' || roleParam === 'entrepreneur' || roleParam === 'business') {
    setLoginRole('worker');
  } else {
    setLoginRole('student');
  }
});

async function handleLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Authenticating…";
  }

  try {
    const res = await KarmanAPI.login(identifier, pass, currentLoginRole);
    if (res && res.status === "authenticated") {
      localStorage.setItem('karman_user', JSON.stringify(res.user_profile));
      localStorage.setItem('karman_token', res.token);
      localStorage.setItem('karman_user_id', identifier);
      localStorage.setItem('karman_role', currentLoginRole);
      window.location.href = getPortalTarget(currentLoginRole);
      return false;
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (err) {
    console.error(err);
    // Fallback login
    let defaultName = 'Arjun Mehta';
    let defaultTrade = 'AI / ML Engineer';
    if (currentLoginRole === 'worker' || currentLoginRole === 'artisan' || currentLoginRole === 'entrepreneur') {
      defaultName = 'Sunita Devi';
      defaultTrade = 'Tailoring & Sewing';
    } else if (identifier.includes('@')) {
      defaultName = identifier.split('@')[0];
    } else {
      defaultName = identifier;
    }
    localStorage.setItem('karman_user', JSON.stringify({ name: defaultName, identifier, role: currentLoginRole, trade: defaultTrade }));
    localStorage.setItem('karman_token', 'token_' + Date.now());
    localStorage.setItem('karman_user_id', identifier);
    localStorage.setItem('karman_role', currentLoginRole);
    window.location.href = getPortalTarget(currentLoginRole);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = currentLoginRole === 'student' ? "Continue to Student Workspace →" : "Continue to Beneficiary Portal →";
    }
  }
  return false;
}

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const roleSelect = document.getElementById('signup-role');
  const role = roleSelect ? roleSelect.value.toLowerCase() : "student";
  const pass = document.getElementById('signup-pass').value;
  const confirm = document.getElementById('signup-confirm').value;
  const errorEl = document.getElementById('signup-error');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (pass !== confirm) {
    if (errorEl) errorEl.style.display = 'block';
    return false;
  }
  if (errorEl) errorEl.style.display = 'none';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Creating Account…";
  }

  try {
    const res = await KarmanAPI.register(name, email, pass, role);
    if (res && res.status === "registered") {
      localStorage.setItem('karman_user', JSON.stringify(res.user_profile));
      localStorage.setItem('karman_token', res.token);
      localStorage.setItem('karman_user_id', email);
      localStorage.setItem('karman_role', role);
      window.location.href = getPortalTarget(role);
      return false;
    }
  } catch (err) {
    console.error(err);
    localStorage.setItem('karman_user', JSON.stringify({ name, identifier: email, role }));
    localStorage.setItem('karman_token', 'token_' + Date.now());
    localStorage.setItem('karman_user_id', email);
    localStorage.setItem('karman_role', role);
    window.location.href = getPortalTarget(role);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Create Account →";
    }
  }
  return false;
}
