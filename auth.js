// Authentication Handlers for Login and Registration
let currentLoginRole = 'student';

function setLoginRole(role) {
  currentLoginRole = role;
  const tabStudent = document.getElementById('tab-btn-student');
  const tabWorker = document.getElementById('tab-btn-worker');
  const tabArtisan = document.getElementById('tab-btn-artisan');
  const tabEntrepreneur = document.getElementById('tab-btn-entrepreneur');

  if (tabStudent) tabStudent.classList.toggle('active', role === 'student');
  if (tabWorker) tabWorker.classList.toggle('active', role === 'worker');
  if (tabArtisan) tabArtisan.classList.toggle('active', role === 'artisan');
  if (tabEntrepreneur) tabEntrepreneur.classList.toggle('active', role === 'entrepreneur');

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

  if (role === 'student') {
    if (title) title.innerText = "Log into your account";
    if (subtitle) subtitle.innerText = "Access your career workspace, schemes & skills";
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
  } else if (role === 'artisan') {
    if (title) title.innerText = "Artisan & Craftsman Login (कारीगर लॉगिन)";
    if (subtitle) subtitle.innerText = "Access craft RPL certification, PM Vishwakarma & toolkit linkages";
    if (socialBlock) socialBlock.style.display = 'none';
    if (workerQuickBlock) workerQuickBlock.style.display = 'block';
    if (lblIdentifier) lblIdentifier.innerText = "Artisan Mobile / ID (कारीगर मोबाइल)";
    if (inputEmail) {
      inputEmail.placeholder = "e.g. 919876543222";
      inputEmail.value = "919876543222";
    }
    if (lblPass) lblPass.innerText = "SMS OTP / Password (ओटीपी)";
    if (inputPass) {
      inputPass.placeholder = "Enter 4-digit OTP or password";
      inputPass.value = "1234";
    }
    if (btnOtp) btnOtp.style.display = 'inline-block';
    if (btnSubmit) btnSubmit.innerText = "Continue to Artisan Portal →";
  } else if (role === 'entrepreneur') {
    if (title) title.innerText = "Micro-Enterprise Login (उद्यम लॉगिन)";
    if (subtitle) subtitle.innerText = "Access enterprise plans, capital subsidies & equipment checklists";
    if (socialBlock) socialBlock.style.display = 'none';
    if (workerQuickBlock) workerQuickBlock.style.display = 'block';
    if (lblIdentifier) lblIdentifier.innerText = "Udyam Mobile / Reg No (मोबाइल नंबर)";
    if (inputEmail) {
      inputEmail.placeholder = "e.g. 919876543333";
      inputEmail.value = "919876543333";
    }
    if (lblPass) lblPass.innerText = "SMS OTP / Password (ओटीपी)";
    if (inputPass) {
      inputPass.placeholder = "Enter 4-digit OTP or password";
      inputPass.value = "1234";
    }
    if (btnOtp) btnOtp.style.display = 'inline-block';
    if (btnSubmit) btnSubmit.innerText = "Continue to Enterprise Portal →";
  } else {
    // worker
    if (title) title.innerText = "Worker Login (श्रमिक / कामगार)";
    if (subtitle) subtitle.innerText = "Access your livelihood skill mapping, RPL certificate & schemes";
    if (socialBlock) socialBlock.style.display = 'none';
    if (workerQuickBlock) workerQuickBlock.style.display = 'block';
    if (lblIdentifier) lblIdentifier.innerText = "Registered Mobile Number (मोबाइल नंबर)";
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
    if (btnSubmit) btnSubmit.innerText = "Continue to Worker Portal →";
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
  if (role === 'worker') {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Sunita Devi', identifier: '919876543210', role: 'worker', trade: 'Tailoring & Sewing' }));
    localStorage.setItem('karman_user_id', 'sunita@karman.gov.in');
    localStorage.setItem('karman_role', 'worker');
    localStorage.setItem('karman_token', 'token_worker_' + Date.now());
  } else if (role === 'artisan') {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Rameshwar Sharma', identifier: '919876543222', role: 'artisan', trade: 'Heritage Handloom & Carpentry' }));
    localStorage.setItem('karman_user_id', 'rameshwar@karman.gov.in');
    localStorage.setItem('karman_role', 'artisan');
    localStorage.setItem('karman_token', 'token_artisan_' + Date.now());
  } else if (role === 'entrepreneur') {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Vikram Patel', identifier: '919876543333', role: 'entrepreneur', trade: 'Two Wheeler Service Micro-Enterprise' }));
    localStorage.setItem('karman_user_id', 'vikram@karman.gov.in');
    localStorage.setItem('karman_role', 'entrepreneur');
    localStorage.setItem('karman_token', 'token_entrepreneur_' + Date.now());
  } else {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Arjun Mehta', identifier: 'arjun@karman.gov.in', role: 'student', trade: 'AI / ML Engineer' }));
    localStorage.setItem('karman_user_id', 'arjun@karman.gov.in');
    localStorage.setItem('karman_role', 'student');
    localStorage.setItem('karman_token', 'token_student_' + Date.now());
  }
  window.location.href = 'dashboard.html';
}

// Check URL param on page load (e.g. login.html?role=worker)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = (urlParams.get('role') || '').toLowerCase();
  if (roleParam === 'worker') {
    setLoginRole('worker');
  } else if (roleParam === 'artisan') {
    setLoginRole('artisan');
  } else if (roleParam === 'entrepreneur' || roleParam === 'business') {
    setLoginRole('entrepreneur');
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
      window.location.href = 'dashboard.html';
      return false;
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (err) {
    console.error(err);
    // Fallback login
    let defaultName = 'Arjun Mehta';
    let defaultTrade = 'AI / ML Engineer';
    if (currentLoginRole === 'worker') {
      defaultName = 'Sunita Devi';
      defaultTrade = 'Tailoring & Sewing';
    } else if (currentLoginRole === 'artisan') {
      defaultName = 'Rameshwar Sharma';
      defaultTrade = 'Heritage Handloom & Carpentry';
    } else if (currentLoginRole === 'entrepreneur') {
      defaultName = 'Vikram Patel';
      defaultTrade = 'Two Wheeler Service Micro-Enterprise';
    } else if (identifier.includes('@')) {
      defaultName = identifier.split('@')[0];
    } else {
      defaultName = identifier;
    }
    localStorage.setItem('karman_user', JSON.stringify({ name: defaultName, identifier, role: currentLoginRole, trade: defaultTrade }));
    localStorage.setItem('karman_token', 'token_' + Date.now());
    localStorage.setItem('karman_user_id', identifier);
    localStorage.setItem('karman_role', currentLoginRole);
    window.location.href = 'dashboard.html';
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = currentLoginRole === 'student' ? "Continue to Student Workspace →" : "Continue to Portal →";
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
      window.location.href = 'dashboard.html';
      return false;
    }
  } catch (err) {
    console.error(err);
    localStorage.setItem('karman_user', JSON.stringify({ name, identifier: email, role }));
    localStorage.setItem('karman_token', 'token_' + Date.now());
    localStorage.setItem('karman_user_id', email);
    localStorage.setItem('karman_role', role);
    window.location.href = 'dashboard.html';
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Create Account →";
    }
  }
  return false;
}
