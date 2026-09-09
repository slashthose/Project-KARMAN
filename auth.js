// Authentication Handlers for Login and Registration with Profile Completion Check
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Authenticating…";
  }

  try {
    const res = await KarmanAPI.login(email, pass, "student");
    if (res && res.status === "authenticated") {
      localStorage.setItem('karman_user', JSON.stringify(res.user_profile));
      localStorage.setItem('karman_token', res.token);
      localStorage.setItem('karman_user_id', email);

      // Check if user already has a completed profile in MongoDB Atlas
      const profile = await KarmanAPI.getProfile(email);
      if (profile && profile.target_trade) {
        localStorage.setItem('karman_profile_completed', 'true');
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'welcome.html?step=profile';
      }
      return false;
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (err) {
    console.error(err);
    localStorage.setItem('karman_user', JSON.stringify({ name: email.split('@')[0], identifier: email, role: 'student' }));
    localStorage.setItem('karman_token', 'token_' + Date.now());
    localStorage.setItem('karman_user_id', email);
    window.location.href = 'welcome.html?step=profile';
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Sign In →";
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
      // Brand new registration requires profile completion
      window.location.href = 'welcome.html?step=profile';
      return false;
    }
  } catch (err) {
    console.error(err);
    localStorage.setItem('karman_user', JSON.stringify({ name, identifier: email, role }));
    localStorage.setItem('karman_token', 'token_' + Date.now());
    localStorage.setItem('karman_user_id', email);
    window.location.href = 'welcome.html?step=profile';
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Create Account →";
    }
  }
  return false;
}

function quickDemoAccess(type) {
  if (type === 'student') {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Arjun Mehta', identifier: 'arjun@karman.gov.in', role: 'student' }));
    localStorage.setItem('karman_token', 'demo_token_arjun');
    localStorage.setItem('karman_user_id', 'arjun@karman.gov.in');
    localStorage.setItem('karman_profile_completed', 'true');
    window.location.href = 'dashboard.html';
  } else {
    localStorage.setItem('karman_user', JSON.stringify({ name: 'Sunita Devi', identifier: 'sunita@karman.gov.in', role: 'worker' }));
    localStorage.setItem('karman_token', 'demo_token_sunita');
    localStorage.setItem('karman_user_id', 'sunita@karman.gov.in');
    localStorage.setItem('karman_profile_completed', 'true');
    window.location.href = 'dashboard.html';
  }
}
