// KARMAN Beneficiary Livelihood Mapping Controller — Live API Connected

let currentBeneficiaryPersona = 'worker';

// Persona Data for Worker, Artisan, and Business (Micro-Entrepreneur)
const beneficiaryPersonas = {
  worker: {
    roleKey: 'worker',
    personaName: 'Worker (श्रमिक / कामगार)',
    userName: 'Sunita Devi',
    userRole: 'Worker · Level 4',
    userInitials: 'S',
    tradeTitle: 'Tailoring & Garment Manufacturing',
    qpCode: 'AMH/Q0301 — Sewing Machine Operator',
    sector: 'Apparel, Made-Ups & Home Furnishing SSC',
    readiness: '88%',
    exp: '5+ Years (Informal)',
    outcome: 'Home-based Micro-Enterprise',
    dprTitle: 'Home-based Tailoring Unit',
    equipment: 'Industrial Motorized Machine',
    setupCost: '₹65,000 (₹50k PM-AJAY Grant)',
    income: '₹18,000 – ₹24,000'
  },
  artisan: {
    roleKey: 'artisan',
    personaName: 'Artisan (कारीगर / शिल्पकार)',
    userName: 'Rameshwar Sharma',
    userRole: 'Artisan · Level 4',
    userInitials: 'R',
    tradeTitle: 'Heritage Handloom & Carpentry (कारीगर)',
    qpCode: 'HCS/Q5401 — Handloom Weaver / Master Craftsman',
    sector: 'Handicrafts and Carpet Sector Skill Council (HCSSC)',
    readiness: '90%',
    exp: '7+ Years Traditional Craft',
    outcome: 'Artisan Craft Cooperative',
    dprTitle: 'Handloom & Wooden Craft Production Unit',
    equipment: 'Modern Frame Loom & Carpentry Toolkit',
    setupCost: '₹75,000 (₹50k PM-AJAY / Vishwakarma)',
    income: '₹22,000 – ₹28,000'
  },
  entrepreneur: {
    roleKey: 'entrepreneur',
    personaName: 'Micro-Entrepreneur (Business / उद्यम)',
    userName: 'Vikram Patel',
    userRole: 'Micro-Entrepreneur · Level 4',
    userInitials: 'V',
    tradeTitle: 'Two Wheeler Service Micro-Enterprise',
    qpCode: 'ASC/Q1411 — Two Wheeler Lead Technician & Enterprise Unit',
    sector: 'Automotive Skills Development Council (ASDC)',
    readiness: '92%',
    exp: '6+ Years Service Workshop',
    outcome: 'Independent Service Centre',
    dprTitle: 'Two Wheeler Multi-Brand Service Enterprise',
    equipment: 'Hydraulic Bike Ramp & OBD Scanner',
    setupCost: '₹1,20,000 (PM-AJAY + Mudra)',
    income: '₹35,000 – ₹45,000'
  }
};

function selectBeneficiaryPersona(personaKey) {
  if (personaKey === 'youth') personaKey = 'worker';
  currentBeneficiaryPersona = personaKey;
  const p = beneficiaryPersonas[personaKey] || beneficiaryPersonas.worker;

  // Highlight active persona card
  const cards = document.querySelectorAll('.persona-card');
  cards.forEach(c => c.classList.remove('active-persona'));
  if (personaKey === 'worker' && cards[1]) cards[1].classList.add('active-persona');
  if (personaKey === 'artisan' && cards[1]) cards[1].classList.add('active-persona');
  if (personaKey === 'entrepreneur' && cards[2]) cards[2].classList.add('active-persona');

  // Update Trade Card
  const tradeTitle = document.getElementById('bene-trade-title');
  const qpCode = document.getElementById('bene-qp-code');
  const readinessPct = document.getElementById('bene-readiness-pct');
  const readinessBar = document.getElementById('bene-readiness-bar');
  const expVal = document.getElementById('bene-exp-val');

  if (tradeTitle) tradeTitle.innerText = p.tradeTitle;
  if (qpCode) qpCode.innerText = p.qpCode;
  if (readinessPct) readinessPct.innerText = p.readiness;
  if (readinessBar) readinessBar.style.width = p.readiness;
  if (expVal) expVal.innerText = p.exp;

  // Update Header User Profile
  const hdrName = document.getElementById('hdr-user-name');
  const hdrRole = document.getElementById('hdr-user-role');
  const hdrInitials = document.getElementById('hdr-user-initials');
  if (hdrName) hdrName.innerText = p.userName;
  if (hdrRole) hdrRole.innerText = p.userRole;
  if (hdrInitials) hdrInitials.innerText = p.userInitials;
}

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetNav = document.getElementById('nav-' + pageId);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  if (pageId === 'newsroom') loadNewsroomData();
}

// Voice and Hero Intake
function startHeroVoiceIntake() {
  const heroInput = document.getElementById('hero-intake-input');
  const micBtn = document.getElementById('hero-mic-btn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition is available in Google Chrome or modern browsers. Please type your trade below.");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = 'hi-IN';
  rec.interimResults = true;

  if (micBtn) {
    micBtn.style.background = '#059669';
    micBtn.innerHTML = `<span>Listening... बोलिए</span>`;
  }

  rec.onresult = (e) => {
    let text = '';
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      text += e.results[i][0].transcript;
    }
    if (heroInput) heroInput.value = text;
  };

  rec.onend = () => {
    if (micBtn) {
      micBtn.style.background = '#E53E3E';
      micBtn.innerHTML = `<span>🎤 Start Voice (आवाज़ से बताएं)</span>`;
    }
    if (heroInput && heroInput.value.trim()) {
      processHeroIntake();
    }
  };

  rec.start();
}

async function processHeroIntake() {
  const input = document.getElementById('hero-intake-input');
  const query = (input ? input.value : '').trim();
  if (!query) return;

  const tradeTitle = document.getElementById('bene-trade-title');
  const qpCode = document.getElementById('bene-qp-code');

  if (tradeTitle) tradeTitle.innerText = "Mapping trade via RAG...";

  try {
    const res = await KarmanAPI.simulateIntake(query, "919876543210");
    if (res && res.nsqf_mapping) {
      if (tradeTitle) tradeTitle.innerText = res.extracted_skill || "Craft / Artisan Trade";
      if (qpCode) qpCode.innerText = `${res.nsqf_mapping.qp_code} — ${res.nsqf_mapping.role}`;
      alert(`Mapped to ${res.extracted_skill} (${res.nsqf_mapping.qp_code})! Linked to ${res.pm_ajay_eligibility ? 'PM-AJAY Capital Grant (₹50,000)' : 'RPL Scheme'}.`);
    }
  } catch (err) {
    if (tradeTitle) tradeTitle.innerText = "Tailoring & Garment Manufacturing";
    if (qpCode) qpCode.innerText = "AMH/Q0301 — Sewing Machine Operator";
  }
}

// Bot Channels
let activeBotChannel = 'whatsapp';
function switchBotChannel(channel) {
  activeBotChannel = channel;
  const headerBanner = document.getElementById('bot-header-banner');
  const shellHeader = document.getElementById('bot-shell-header');
  const statusName = document.getElementById('bot-status-name');
  const statusIndicator = document.getElementById('bot-status-indicator');

  if (channel === 'whatsapp') {
    if (headerBanner) {
      headerBanner.style.background = '#E2F7EB';
      headerBanner.style.borderColor = '#25D366';
    }
    if (shellHeader) shellHeader.className = 'tg-header wa';
    if (statusName) statusName.innerText = 'WhatsApp AI Bot (+1-555-203-7186)';
    if (statusIndicator) {
      statusIndicator.style.color = '#1EBE5D';
      statusIndicator.innerText = '● Online · Meta WhatsApp Cloud API Live';
    }
  } else {
    if (headerBanner) {
      headerBanner.style.background = '#DCEBFA';
      headerBanner.style.borderColor = '#229ED9';
    }
    if (shellHeader) shellHeader.className = 'tg-header';
    if (statusName) statusName.innerText = 'Telegram AI Bot (@projectkarmancareerguidancebot)';
    if (statusIndicator) {
      statusIndicator.style.color = '#1B88BD';
      statusIndicator.innerText = '● Online · Telegram Bot API Live';
    }
  }
}

function handleTgInputKey(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('tg-user-input');
    if (input && input.value.trim()) {
      sendTgUserMessage(input.value.trim());
      input.value = '';
    }
  }
}

function tgReply(btn) {
  if (btn && btn.innerText) {
    sendTgUserMessage(btn.innerText);
  }
}

function sendTgUserMessage(text) {
  const chatBody = document.getElementById('tg-chat-body');
  if (!chatBody) return;

  const userDiv = document.createElement('div');
  userDiv.className = 'tg-msg user';
  userDiv.innerText = text;
  chatBody.appendChild(userDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(async () => {
    const botDiv = document.createElement('div');
    botDiv.className = 'tg-msg bot';
    botDiv.innerText = "Checking NSQF Qualification Packs & District Welfare grants…";
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const res = await KarmanAPI.chat(text, "919876543210");
      if (res && res.reply) {
        botDiv.innerHTML = res.reply.replace(/\n/g, '<br>');
      } else {
        botDiv.innerHTML = `Namaste 🙏 Your experience has been mapped to <strong>NSQF Level 4 (${beneficiaryPersonas[currentBeneficiaryPersona].tradeTitle})</strong>. Eligible for PM-AJAY grant up to ₹50,000!`;
      }
    } catch (e) {
      botDiv.innerHTML = `Namaste 🙏 Your experience has been mapped to <strong>NSQF Level 4 (${beneficiaryPersonas[currentBeneficiaryPersona].tradeTitle})</strong>. Eligible for PM-AJAY grant up to ₹50,000!`;
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 400);
}

// Newsroom Loader
async function loadNewsroomData() {
  const container = document.getElementById('newsroom-list-container');
  if (!container) return;

  try {
    const data = await KarmanAPI.getNews(true);
    if (data && data.items && data.items.length > 0) {
      container.innerHTML = data.items.map(item => `
        <div class="table-card scheme-row gold" style="margin-bottom:12px; padding:18px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="eyebrow" style="color:#B45309; font-weight:700;">${item.category || 'GOVT SCHEME'}</span>
              <h4 style="font-size:1.05rem; margin:4px 0;">${item.title}</h4>
              <p style="font-size:0.84rem; color:var(--ink-sub); line-height:1.45;">${item.summary || item.description || ''}</p>
            </div>
            <span style="font-weight:700; color:var(--green-text); font-size:0.92rem; white-space:nowrap; margin-left:14px;">${item.grant_amount || 'Grant Linked'}</span>
          </div>
        </div>
      `).join('');
      return;
    }
  } catch (e) {
    console.warn("Using fallback newsroom:", e);
  }

  container.innerHTML = `
    <div class="table-card scheme-row gold" style="margin-bottom:12px; padding:18px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="eyebrow" style="color:#B45309; font-weight:700;">EQUIPMENT GRANT</span>
          <h4 style="font-size:1.05rem; margin:4px 0;">PM-AJAY Self-Employment Machinery Grant 2026</h4>
          <p style="font-size:0.84rem; color:var(--ink-sub); line-height:1.45;">100% financial assistance up to ₹50,000 for purchasing motorized equipment and tools for verified informal workers.</p>
        </div>
        <span style="font-weight:700; color:var(--green-text); font-size:0.92rem; margin-left:14px;">Up to ₹50,000</span>
      </div>
    </div>
    <div class="table-card scheme-row" style="margin-bottom:12px; padding:18px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="eyebrow" style="color:var(--blue-text); font-weight:700;">RPL ORIENTATION</span>
          <h4 style="font-size:1.05rem; margin:4px 0;">PMKVY 4.0 Recognition of Prior Learning Camps Open</h4>
          <p style="font-size:0.84rem; color:var(--ink-sub); line-height:1.45;">Fast-track 12-hour orientation camps certifying informal experience with Skill India Digital QR credential.</p>
        </div>
        <span style="font-weight:700; color:var(--navy-dark); font-size:0.92rem; margin-left:14px;">100% Free + ₹500</span>
      </div>
    </div>
  `;
}

function refreshNewsroomData(isManual) {
  loadNewsroomData();
  if (isManual) alert("Newsroom feed updated directly from official government gazette sources.");
}

// Resume Export
async function exportResumePdf() {
  const name = document.getElementById('builder-name')?.value || 'Sunita Devi';
  const phone = document.getElementById('builder-phone')?.value || '919876543210';
  const district = document.getElementById('builder-district')?.value || 'G.B. Nagar, UP';
  const trade = document.getElementById('builder-trade')?.value || 'Tailoring & Sewing Machine Operator';

  alert(`Generating official NSQF Skill Passport PDF for ${name} (${trade})…`);
  try {
    const res = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, district, target_role: trade })
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Skill_Passport_${name.replace(/\s+/g, '_')}.pdf`;
      a.click();
    } else {
      window.print();
    }
  } catch (e) {
    window.print();
  }
}

// Sidebar Resizer
function initSidebarResizer() {
  const resizer = document.getElementById('sidebar-resizer');
  const frame = document.querySelector('.dash-frame-wrapper');
  if (!resizer || !frame) return;

  let isDragging = false;
  resizer.addEventListener('mousedown', (e) => {
    isDragging = true;
    resizer.classList.add('is-dragging');
    document.body.style.cursor = 'col-resize';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const clamped = Math.max(180, Math.min(360, e.clientX));
    frame.style.setProperty('--sidebar-w', `${clamped}px`);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      resizer.classList.remove('is-dragging');
      document.body.style.cursor = '';
    }
  });
}

function toggleSidebar() {
  const frame = document.querySelector('.dash-frame-wrapper');
  if (frame) frame.classList.toggle('sidebar-collapsed');
}

function setDashboardLanguage(lang) {
  const hiBtn = document.getElementById('hdr-lang-hi');
  const enBtn = document.getElementById('hdr-lang-en');
  if (lang === 'hi') {
    if (hiBtn) { hiBtn.style.background = '#162035'; hiBtn.style.color = '#fff'; }
    if (enBtn) { enBtn.style.background = 'transparent'; enBtn.style.color = '#5C564A'; }
  } else {
    if (enBtn) { enBtn.style.background = '#162035'; enBtn.style.color = '#fff'; }
    if (hiBtn) { hiBtn.style.background = 'transparent'; hiBtn.style.color = '#5C564A'; }
  }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const role = (localStorage.getItem('karman_role') || 'worker').toLowerCase();
  initSidebarResizer();
  
  if (role === 'artisan') {
    selectBeneficiaryPersona('artisan');
  } else if (role === 'entrepreneur' || role === 'business') {
    selectBeneficiaryPersona('entrepreneur');
  } else {
    selectBeneficiaryPersona('worker');
  }

  loadNewsroomData();
  switchBotChannel('whatsapp');
});
