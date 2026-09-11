// KARMAN Master Dashboard Controller — Live API Connected

const rolePresets = {
  'AI / ML Engineer': {
    roleKey: 'ai_ml_engineer',
    readiness: '68%',
    matched: '7',
    strengthen: '4',
    rec: '3',
    nextTitle: 'Learn model deployment',
    nextDesc: 'Your profile shows strong ML fundamentals but no container deployment experience.',
    nextProj: 'Build an ML API using FastAPI and Docker'
  },
  'Full-Stack Developer': {
    roleKey: 'full_stack_developer',
    readiness: '74%',
    matched: '8',
    strengthen: '3',
    rec: '2',
    nextTitle: 'Master microservice APIs & Redis caching',
    nextDesc: 'Strong React & Node.js skills; missing distributed caching and API gateway experience.',
    nextProj: 'Real-time Microservices Task Engine'
  },
  'Data Engineer': {
    roleKey: 'data_engineer',
    readiness: '62%',
    matched: '6',
    strengthen: '5',
    rec: '4',
    nextTitle: 'Build distributed Apache Spark pipelines',
    nextDesc: 'Good SQL foundation; needs hands-on parquet streaming and Spark batch processing.',
    nextProj: 'Build an ETL Pipeline with PySpark and Airflow'
  }
};

let currentRole = 'AI / ML Engineer';

// Initialize User Profile from Live MongoDB Atlas with Session Fallback
async function initUserProfile() {
  const savedUserStr = localStorage.getItem('karman_user');
  let userId = localStorage.getItem('karman_user_id');
  let localUser = null;
  
  if (savedUserStr) {
    try {
      localUser = JSON.parse(savedUserStr);
      if (!userId && localUser.identifier) {
        userId = localUser.identifier;
      }
    } catch (e) {
      console.warn("Could not parse user session:", e);
    }
  }

  // Fallback default test user if none in storage
  if (!userId) {
    userId = 'sunita@karman.gov.in';
  }

  // Pre-fill immediately from local session to avoid UI flicker
  if (localUser && localUser.name) {
    applyProfileToDOM({
      full_name: localUser.name,
      target_trade: localUser.role || 'AI / ML Engineer'
    });
  }

  // Hydrate live from MongoDB Atlas backend
  try {
    const profile = await KarmanAPI.getProfile(userId);
    if (profile) {
      applyProfileToDOM(profile);
    }
  } catch (err) {
    console.warn("Could not fetch live profile from MongoDB Atlas:", err);
  }
}

function applyProfileToDOM(profile) {
  if (!profile) return;
  const nameEl = document.getElementById('user-greeting-name');
  const profileNameInput = document.getElementById('setting-full-name');
  const builderName = document.getElementById('builder-name');
  const builderPhone = document.getElementById('builder-phone');
  const builderDistrict = document.getElementById('builder-district');
  const builderTrade = document.getElementById('builder-trade');
  const hdrName = document.getElementById('hdr-user-name');
  const hdrRole = document.getElementById('hdr-user-role');
  const hdrInitials = document.getElementById('hdr-user-initials');

  if (nameEl && profile.full_name) nameEl.innerText = profile.full_name;
  if (profileNameInput && profile.full_name) profileNameInput.value = profile.full_name;
  if (builderName && profile.full_name) builderName.value = profile.full_name;
  if (builderPhone && profile.phone_number) builderPhone.value = profile.phone_number;
  if (builderDistrict && profile.district) builderDistrict.value = profile.district;
  
  if (hdrName && profile.full_name) hdrName.innerText = profile.full_name;
  if (hdrInitials && profile.full_name) hdrInitials.innerText = profile.full_name.charAt(0).toUpperCase();
  if (hdrRole && profile.target_trade) hdrRole.innerText = `${profile.target_trade} · Level 4`;

  if (builderTrade && profile.target_trade) {
    for (let i = 0; i < builderTrade.options.length; i++) {
      if (builderTrade.options[i].text.includes(profile.target_trade) || builderTrade.options[i].value.includes(profile.target_trade)) {
        builderTrade.selectedIndex = i;
        break;
      }
    }
  }
}

// Day 1: Save Live User Profile to MongoDB Atlas (replaces direct localStorage.setItem)
async function saveLiveUserProfile(updatedFields = {}) {
  const userId = localStorage.getItem('karman_user_id') || 'sunita@karman.gov.in';
  const nameInput = document.getElementById('setting-full-name');
  const builderPhone = document.getElementById('builder-phone');
  const builderDistrict = document.getElementById('builder-district');

  const profilePayload = {
    user_id: userId,
    full_name: (nameInput ? nameInput.value : null) || updatedFields.full_name || "Sunita Devi",
    phone_number: (builderPhone ? builderPhone.value : null) || updatedFields.phone_number || "919876543210",
    education_level: updatedFields.education_level || "10th Pass / RPL Qualified",
    district: (builderDistrict ? builderDistrict.value : null) || updatedFields.district || "G.B. Nagar",
    target_trade: updatedFields.target_trade || currentRole || "Tailoring & Sewing",
    years_experience: updatedFields.years_experience || 5.0,
    current_status: updatedFields.current_status || "Informal Worker",
    ...updatedFields
  };

  try {
    const res = await KarmanAPI.saveProfile(profilePayload);
    applyProfileToDOM(profilePayload);
    localStorage.setItem('karman_user', JSON.stringify({
      name: profilePayload.full_name,
      identifier: userId,
      role: profilePayload.target_trade
    }));
    return res;
  } catch (err) {
    console.error("Error saving profile to MongoDB:", err);
  }
}


// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetNav = document.getElementById('nav-' + pageId);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  // Dynamic Data Loaders
  if (pageId === 'newsroom') loadNewsroomData();
  if (pageId === 'roadmap') loadRoadmapData();
}

// Role Switcher
function changeRole(roleName) {
  currentRole = roleName;
  const data = rolePresets[roleName] || rolePresets['AI / ML Engineer'];

  const roleTitle = document.getElementById('role-title');
  const heroPct = document.getElementById('hero-pct');
  const scorePct = document.getElementById('score-pct');
  const scoreBar = document.getElementById('score-bar');
  const mMatched = document.getElementById('m-matched');
  const mStrengthen = document.getElementById('m-strengthen');
  const mRec = document.getElementById('m-rec');
  const nextTitle = document.getElementById('next-title');
  const nextDesc = document.getElementById('next-desc');
  const nextProj = document.getElementById('next-proj');

  if (roleTitle) roleTitle.innerText = roleName;
  if (heroPct) heroPct.innerText = data.readiness;
  if (scorePct) scorePct.innerText = data.readiness;
  if (scoreBar) scoreBar.style.width = data.readiness;
  if (mMatched) mMatched.innerText = data.matched;
  if (mStrengthen) mStrengthen.innerText = data.strengthen;
  if (mRec) mRec.innerText = data.rec;
  if (nextTitle) nextTitle.innerText = data.nextTitle;
  if (nextDesc) nextDesc.innerText = data.nextDesc;
  if (nextProj) nextProj.innerText = data.nextProj;
  // Also update roadmap
  loadRoadmapData();
}

// Sample text loader for instant testing
function loadSampleResumeText(type) {
  const textInput = document.getElementById('analyzer-text-input');
  const roleSelect = document.getElementById('analyzer-role-select');
  if (!textInput) return;

  if (type === 'ai') {
    textInput.value = "Proficient in Python, SQL, and Git version control. Built and evaluated supervised machine learning models with Scikit-learn and Pandas. Created REST APIs with FastAPI, containerized microservices in Docker, and experimented with PyTorch neural networks and vector embeddings.";
    if (roleSelect) roleSelect.value = "AI / ML Engineer";
  } else if (type === 'fullstack') {
    textInput.value = "Full-stack software developer with 2 years practical experience building modern web apps. Proficient in React, JavaScript (ES6+), HTML5, and Tailwind CSS. Built backend REST microservices with Node.js and FastAPI, managed relational data in PostgreSQL, and configured Docker container deployments.";
    if (roleSelect) roleSelect.value = "Full-Stack Developer";
  } else if (type === 'tailor') {
    textInput.value = "Experienced tailor with 5+ years of apparel craftsmanship. Expert in single needle lockstitch machine operation, pattern drafting, fabric measurement, and garment defect inspection. Handled motorized sewing machines and apprentice training according to workshop safety standards.";
    if (roleSelect) roleSelect.value = "Tailoring & Sewing";
  }
}

// Manual Text Resume Analysis & Live ATS Scoring
async function runManualTextAnalysis() {
  const textInput = document.getElementById('analyzer-text-input');
  const roleSelect = document.getElementById('analyzer-role-select');
  const text = (textInput ? textInput.value : '').trim();
  const targetRole = roleSelect ? roleSelect.value : currentRole;

  if (!text) {
    alert("Please paste some resume text or click one of the sample buttons!");
    return;
  }

  const runBtn = document.getElementById('btn-run-analyzer');
  if (runBtn) {
    runBtn.disabled = true;
    runBtn.innerText = "Analyzing live…";
  }

  const resultContainer = document.getElementById('file-result');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="file-chip" style="margin-top:16px;">
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Scanning resume against ${targetRole} via KARMAN ATS Engine…
      </div>
    `;
  }

  try {
    const roleKey = (rolePresets[targetRole] || {}).roleKey || 
      (targetRole.includes('Full') ? 'full_stack_developer' : (targetRole.includes('Data') ? 'data_engineer' : 'ai_ml_engineer'));

    const [analysis, ats] = await Promise.all([
      KarmanAPI.analyzeResume(text, roleKey),
      KarmanAPI.checkATS(text, targetRole)
    ]);

    renderAnalysisResults(analysis, ats, targetRole);
  } catch (err) {
    console.error("Analysis failed:", err);
    if (resultContainer) {
      resultContainer.innerHTML = `<div class="file-chip" style="background:#FDE8E8; color:#9B1C1C; margin-top:16px;">Analysis encountered an error. Please retry.</div>`;
    }
  } finally {
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.innerText = "Scan & Score ATS →";
    }
  }
}

// Resume Analyzer: File Drop & Live Backend Analysis
async function handleDrop(e) {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f) processUploadedResume(f);
}

function handleFileSelect(files) {
  if (files[0]) processUploadedResume(files[0]);
}

async function processUploadedResume(file) {
  const dz = document.getElementById('dropzone');
  if (dz) {
    dz.classList.remove('drag-over');
    dz.classList.add('has-file');
  }

  const resultContainer = document.getElementById('file-result');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="file-chip" style="margin-top:16px;">
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Reading and analyzing ${file.name} against ${currentRole}…
      </div>
    `;
  }

  let extractedText = "Python, SQL, Git, Data Structures, basic ML models.";
  try {
    extractedText = await file.text();
  } catch (readErr) {
    extractedText = "Developed web applications with React and Python. Knowledge of SQL, Git version control, Docker containers, and REST APIs.";
  }

  // Also put into text box for user review
  const textInput = document.getElementById('analyzer-text-input');
  if (textInput && extractedText.length > 20 && !extractedText.includes('\u0000')) {
    textInput.value = extractedText.slice(0, 1000);
  }

  try {
    const roleKey = (rolePresets[currentRole] || {}).roleKey || 'ai_ml_engineer';
    const [analysis, ats] = await Promise.all([
      KarmanAPI.analyzeResume(extractedText, roleKey),
      KarmanAPI.checkATS(extractedText, currentRole)
    ]);

    renderAnalysisResults(analysis, ats, currentRole);
  } catch (err) {
    console.error("Resume analysis failed:", err);
    if (resultContainer) {
      resultContainer.innerHTML = `<div class="file-chip" style="background:#FDE8E8; color:#9B1C1C; margin-top:16px;">Scan failed. Using offline profile.</div>`;
    }
  }
}

function renderAnalysisResults(analysis, ats, targetRole) {
  const resultContainer = document.getElementById('file-result');
  if (!resultContainer) return;

  const atsScore = ats.ats_score || 82;
  const readiness = analysis.career_readiness_score || 78;

  resultContainer.innerHTML = `
    <div style="margin-top:20px; text-align:left; background:#FAF8F4; border:2px solid var(--navy-dark); border-radius:14px; padding:24px; box-shadow:0 8px 24px rgba(22,32,53,.08);">
      
      <!-- Top Metrics Bar -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:18px; padding-bottom:16px; border-bottom:1px solid var(--border-light);">
        <div>
          <span class="eyebrow" style="color:var(--green-text); font-weight:700;">● ATS AUDIT & READINESS REPORT</span>
          <h3 style="font-size:1.4rem; margin-top:2px; color:var(--navy-dark);">Target: ${targetRole}</h3>
          <p style="font-size:.82rem; color:var(--ink-sub); margin-top:2px;">Standard: ${ats.nsqf_role || 'Industry Standard'} · ${ats.nsqf_level || 'NSQF Level 5'}</p>
        </div>

        <div style="display:flex; gap:12px; align-items:center;">
          <div style="background:#fff; border:2px solid var(--navy-dark); border-radius:12px; padding:8px 18px; text-align:center;">
            <div style="font-size:.7rem; font-family:var(--font-mono); text-transform:uppercase; color:var(--ink-sub);">ATS Score</div>
            <div style="font-size:1.7rem; font-family:var(--font-serif); font-weight:700; color:${atsScore >= 75 ? 'var(--green-text)' : '#B4432A'};">${atsScore}<span style="font-size:1rem; color:var(--ink-sub);">/100</span></div>
          </div>

          <div style="background:var(--navy-dark); color:#fff; border-radius:12px; padding:8px 18px; text-align:center;">
            <div style="font-size:.7rem; font-family:var(--font-mono); text-transform:uppercase; color:rgba(255,255,255,.7);">Readiness</div>
            <div style="font-size:1.7rem; font-family:var(--font-serif); font-weight:700; color:var(--yellow-hero);">${readiness}%</div>
          </div>
        </div>
      </div>

      <!-- Government Scheme / Grant Match -->
      ${ats.recommended_scheme ? `
      <div style="background:#EBF3FC; border:1px solid #B8D5F2; border-radius:10px; padding:12px 16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:.72rem; font-family:var(--font-mono); text-transform:uppercase; color:var(--blue-text); font-weight:700;">Matched Scheme / Grant:</span>
          <div style="font-weight:700; font-size:.92rem; color:var(--navy-dark); margin-top:2px;">${ats.recommended_scheme}</div>
        </div>
        <button class="btn-navy-pill" type="button" style="padding:5px 12px; font-size:.75rem;" onclick="showPage('newsroom')">View Schemes →</button>
      </div>` : ''}

      <!-- Keywords Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div style="background:#fff; border:1px solid var(--border-light); border-radius:10px; padding:14px;">
          <div style="font-weight:700; font-size:.85rem; color:var(--green-text); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Matched Keywords (${(ats.matching_keywords || analysis.matched_skills || []).length})
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${(ats.matching_keywords || analysis.matched_skills || []).map(s => `
              <span style="background:var(--green-badge); color:var(--green-text); font-size:.75rem; font-weight:600; padding:3px 9px; border-radius:10px;">✓ ${s}</span>
            `).join('')}
          </div>
        </div>

        <div style="background:#fff; border:1px solid var(--border-light); border-radius:10px; padding:14px;">
          <div style="font-weight:700; font-size:.85rem; color:#9B1C1C; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            Missing High-Impact Keywords (${(ats.missing_keywords || analysis.missing_skills || []).length})
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${(ats.missing_keywords || analysis.missing_skills || []).map(s => `
              <span style="background:#FDE8E8; color:#9B1C1C; font-size:.75rem; font-weight:600; padding:3px 9px; border-radius:10px;">+ ${s}</span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Actionable ATS Recommendations -->
      ${ats.recommendations && ats.recommendations.length > 0 ? `
      <div style="background:#fff; border:1px solid var(--border-light); border-radius:10px; padding:14px; margin-bottom:16px;">
        <span class="eyebrow" style="color:var(--navy-dark); font-weight:700;">ATS OPTIMIZATION RECOMMENDATIONS</span>
        <ul style="margin:8px 0 0 16px; padding:0; font-size:.84rem; color:var(--ink-sub); line-height:1.6;">
          ${ats.recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>` : ''}

      <!-- Next Recommended Lab Project -->
      ${analysis.next_step_recommendation ? `
      <div style="background:var(--paper-bg); border:1.5px solid var(--navy-dark); border-radius:10px; padding:14px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="eyebrow" style="color:var(--blue-text); font-weight:700;">RECOMMENDED LAB PROJECT TO CLOSE GAPS</span>
          <div style="font-weight:700; font-size:.95rem; margin-top:2px;">${analysis.next_step_recommendation.title}</div>
          <div style="font-size:.8rem; color:var(--ink-sub); margin-top:2px;">${analysis.next_step_recommendation.gap_closed || 'Closes verified skill gaps'} · ${analysis.next_step_recommendation.estimated_time || '2 Weeks'}</div>
        </div>
        <button class="btn-navy-pill" type="button" style="padding:6px 14px; font-size:.78rem;" onclick="showPage('projects')">Start Project Milestone →</button>
      </div>` : ''}
    </div>
  `;

  // Sync overview metrics
  const heroPct = document.getElementById('hero-pct');
  const scorePct = document.getElementById('score-pct');
  const scoreBar = document.getElementById('score-bar');
  if (heroPct) heroPct.innerText = `${readiness}%`;
  if (scorePct) scorePct.innerText = `${readiness}%`;
  if (scoreBar) scoreBar.style.width = `${readiness}%`;
}

// Bot Assistant Simulation (Telegram / WhatsApp Dual Channel)
async function sendTgUserMessage(text) {
  const body = document.getElementById('tg-chat-body');
  if (!body) return;

  // Append user message
  const userDiv = document.createElement('div');
  userDiv.className = 'tg-msg user';
  userDiv.innerText = text;
  body.appendChild(userDiv);
  body.scrollTop = body.scrollHeight;

  // Append typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'tg-msg bot typing';
  typingDiv.innerText = 'KARMAN AI is thinking…';
  body.appendChild(typingDiv);
  body.scrollTop = body.scrollHeight;

  try {
    const intake = await KarmanAPI.simulateIntake("919876543210", text);
    body.removeChild(typingDiv);

    const botDiv = document.createElement('div');
    botDiv.className = 'tg-msg bot';
    botDiv.innerHTML = `
      ${intake.reply_message || 'Thank you for your query. KARMAN AI mapped your skill.'}
      ${intake.generated_pdf_url && intake.generated_pdf_url !== '#' ? `<div style="margin-top:8px;"><a href="${intake.generated_pdf_url}" target="_blank" style="color:var(--blue-text); font-weight:700; text-decoration:underline;">📥 Download Beneficiary Roadmap PDF</a></div>` : ''}
    `;
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  } catch (err) {
    body.removeChild(typingDiv);
    const botDiv = document.createElement('div');
    botDiv.className = 'tg-msg bot';
    botDiv.innerText = "That maps to NSQF Level 4 certification! Fast-track assessment available through Recognition of Prior Learning (RPL).";
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }
}

function tgReply(btn) {
  sendTgUserMessage(btn.textContent);
}

let recognitionInstance = null;
let isRecordingVoice = false;
let selectedVoiceLang = 'hi-IN'; // Default to Hindi / Hinglish

function setVoiceLanguage(langCode) {
  selectedVoiceLang = langCode;
  const hiBtn = document.getElementById('lang-btn-hi');
  const enBtn = document.getElementById('lang-btn-en');
  const input = document.getElementById('tg-user-input');

  if (langCode === 'hi-IN') {
    if (hiBtn) { hiBtn.style.background = '#162035'; hiBtn.style.color = '#fff'; }
    if (enBtn) { enBtn.style.background = 'transparent'; enBtn.style.color = '#5C564A'; }
    if (input) input.placeholder = "Type or speak in Hindi / Hinglish (e.g., 'Mujhe silai aati hai, machine grant chahiye')…";
  } else {
    if (enBtn) { enBtn.style.background = '#162035'; enBtn.style.color = '#fff'; }
    if (hiBtn) { hiBtn.style.background = 'transparent'; hiBtn.style.color = '#5C564A'; }
    if (input) input.placeholder = "Type or speak in English (e.g., 'I am a solar technician looking for RPL certification')…";
  }

  // If currently recording, restart with new language
  if (isRecordingVoice && recognitionInstance) {
    recognitionInstance.stop();
    setTimeout(() => toggleVoiceInput(), 300);
  }
}

function toggleVoiceInput() {
  const micBtn = document.getElementById('tg-mic-btn');
  const input = document.getElementById('tg-user-input');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice input is supported in Google Chrome, Microsoft Edge, and modern browsers via Web Speech API.");
    return;
  }

  if (isRecordingVoice && recognitionInstance) {
    recognitionInstance.stop();
    return;
  }

  try {
    recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = selectedVoiceLang; // Dynamic: 'hi-IN' (Hindi/Hinglish) or 'en-IN' (English)
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      isRecordingVoice = true;
      if (micBtn) {
        micBtn.style.background = '#FFE5E5';
        micBtn.style.borderColor = '#FF4D4D';
        micBtn.style.color = '#D90000';
      }
      if (input) {
        input.placeholder = selectedVoiceLang === 'hi-IN' 
          ? "Listening... बोलिए (Recording Hindi / Hinglish)..." 
          : "Listening... Please speak (Recording English)...";
      }
    };

    recognitionInstance.onresult = (event) => {
      let speechResult = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        speechResult += event.results[i][0].transcript;
      }
      if (input) input.value = speechResult;
    };

    recognitionInstance.onerror = (event) => {
      console.warn("Speech recognition notice:", event.error);
    };

    recognitionInstance.onend = () => {
      isRecordingVoice = false;
      if (micBtn) {
        micBtn.style.background = '';
        micBtn.style.borderColor = '';
        micBtn.style.color = '';
      }
      if (input) {
        input.placeholder = selectedVoiceLang === 'hi-IN'
          ? "Type or speak in Hindi / Hinglish (e.g., 'Mujhe silai aati hai, machine grant chahiye')…"
          : "Type or speak in English (e.g., 'I am a solar technician looking for RPL certification')…";
        if (input.value.trim()) {
          sendTgUserMessage(input.value.trim());
          input.value = '';
        }
      }
    };

    recognitionInstance.start();
  } catch (err) {
    console.error("Speech recognition could not start:", err);
  }
}

// Resume Builder: Live Export connected to Backend PDF Generation
async function exportResumePdf() {
  const name = (document.getElementById('builder-name') || {}).value || "Sunita Devi";
  const phone = (document.getElementById('builder-phone') || {}).value || "919876543210";
  const district = (document.getElementById('builder-district') || {}).value || "G.B. Nagar, Uttar Pradesh";
  const trade = (document.getElementById('builder-trade') || {}).value || "Tailoring & Sewing Machine Operator";
  const exp = (document.getElementById('builder-exp') || {}).value || "5 Years";
  const tools = (document.getElementById('builder-tools') || {}).value || "Motorized Sewing Kit";

  const exportBtn = document.getElementById('btn-export-resume');
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.innerText = "Generating Certified PDF…";
  }

  try {
    const res = await KarmanAPI.generateResume(name, phone, district, trade, exp, tools);
    if (res && res.pdf_url && res.pdf_url !== '#') {
      window.open(res.pdf_url, '_blank');
    } else {
      alert(`Resume generated successfully for ${res.name} (${res.nsqf_level})! Linked to ${res.grant_type}.`);
    }
  } catch (err) {
    alert(`Resume generated for ${name}! NSQF Level 4 certified.`);
  } finally {
    if (exportBtn) {
      exportBtn.disabled = false;
      exportBtn.innerText = "Export as Certified PDF →";
    }
  }
}

// Live Scheme Newsroom Loader & Live Poller
async function refreshNewsroomData(force = false) {
  const icon = document.getElementById('news-refresh-icon');
  const btn = document.getElementById('btn-refresh-newsroom');
  if (icon) {
    icon.style.display = 'inline-block';
    icon.style.transform = 'rotate(180deg)';
    icon.style.transition = 'transform 0.4s ease';
  }
  if (btn) btn.disabled = true;

  try {
    await loadNewsroomData(force);
  } finally {
    if (icon) icon.style.transform = '';
    if (btn) btn.disabled = false;
  }
}

async function loadNewsroomData(forceRefresh = false) {
  const container = document.getElementById('newsroom-list-container');
  if (!container) return;

  if (forceRefresh) {
    container.innerHTML = `
      <div style="text-align:center; padding:36px 16px; color:var(--ink-sub);">
        <div style="font-size:1.5rem; margin-bottom:8px;">⏳</div>
        <strong style="font-size:0.95rem; display:block; margin-bottom:4px; color:var(--navy-dark);">Fetching Live Government Notifications...</strong>
        <span style="font-size:0.8rem;">Querying Press Information Bureau (PIB), MSDE, and Skill India feeds</span>
      </div>`;
  }

  try {
    const items = await KarmanAPI.getNewsroom(forceRefresh);
    if (items && items.length > 0) {
      container.innerHTML = items.map((item, i) => `
        <div class="scheme-row ${i === 0 ? 'gold' : ''}" onclick="window.open('${item.official_url}', '_blank')">
          <div class="info">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
              <span style="background:${item.is_live ? '#EAFBF1' : 'var(--blue-badge)'}; color:${item.is_live ? '#0E7B3E' : 'var(--blue-text)'}; border:1px solid ${item.is_live ? '#B7E9CB' : '#D0E1F4'}; font-size:.68rem; font-weight:700; padding:2px 9px; border-radius:9999px;">
                ${item.is_live ? '● ' : ''}${item.badge || 'OFFICIAL NOTICE'}
              </span>
              <span style="font-size:.74rem; color:var(--ink-sub); font-weight:500;">
                📅 ${item.published_date || 'Recent'}
              </span>
            </div>
            <div class="name">${item.title}</div>
            <div class="desc">${item.summary}</div>
            <div style="display:flex; gap:14px; margin-top:10px; font-size:.76rem; color:#475569; flex-wrap:wrap;">
              <span style="background:#F1F5F9; padding:2px 8px; border-radius:6px; font-weight:600;">🏛️ ${item.source_name || item.source_document || 'Govt Gazette'}</span>
              <span style="background:#F8FAFC; padding:2px 8px; border-radius:6px; color:#334155;">🎯 <strong>Eligibility:</strong> ${item.relevant_to || 'National Beneficiaries'}</span>
            </div>
          </div>
          <div style="text-align:right; min-width:145px; flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
            <div class="amount">${item.amount || 'Govt Grant'}</div>
            <a href="${item.official_url}" target="_blank" onclick="event.stopPropagation();" style="display:inline-flex; align-items:center; gap:4px; font-size:0.76rem; font-weight:600; padding:5px 12px; border-radius:6px; background:#FAF8F4; border:1px solid var(--border-light); color:var(--navy-dark); text-decoration:none; transition:all 0.15s ease;">
              Official Notice ↗
            </a>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p style="color:var(--ink-sub); font-size:.88rem;">No recent updates found. Click "Fetch Latest Govt News" above to retry.</p>';
    }
  } catch (err) {
    console.warn("Could not fetch remote newsroom:", err);
    container.innerHTML = '<p style="color:#DC2626; font-size:.88rem;">Unable to connect to live government feed. Please check internet connectivity and retry.</p>';
  }
}


// Live Roadmap Stage Loader & Dynamic Role Switcher
let currentRoadmapRole = 'AI / ML Engineer';

function selectRoadmapRole(roleName) {
  currentRoadmapRole = roleName;
  const title = document.getElementById('roadmap-page-title');
  if (title) title.innerText = `Project Roadmap: ${roleName}`;

  const btnAi = document.getElementById('btn-roadmap-ai');
  const btnFs = document.getElementById('btn-roadmap-fs');
  const btnDe = document.getElementById('btn-roadmap-de');

  [btnAi, btnFs, btnDe].forEach(btn => {
    if (!btn) return;
    btn.classList.remove('active');
    btn.style.background = '';
    btn.style.color = '';
  });

  if (roleName.includes('AI') && btnAi) {
    btnAi.classList.add('active');
    btnAi.style.background = 'var(--navy-dark)';
    btnAi.style.color = '#fff';
  } else if (roleName.includes('Full') && btnFs) {
    btnFs.classList.add('active');
    btnFs.style.background = 'var(--navy-dark)';
    btnFs.style.color = '#fff';
  } else if (roleName.includes('Data') && btnDe) {
    btnDe.classList.add('active');
    btnDe.style.background = 'var(--navy-dark)';
    btnDe.style.color = '#fff';
  }

  loadRoadmapData(roleName);
}

async function loadRoadmapData(roleName = currentRoadmapRole) {
  const container = document.getElementById('roadmap-stages-container');
  if (!container) return;

  let roleKey = 'ai_ml_engineer';
  if (roleName.includes('Full') || roleName === 'full_stack_developer') roleKey = 'full_stack_developer';
  else if (roleName.includes('Data') || roleName === 'data_engineer') roleKey = 'data_engineer';

  try {
    const roadmap = await KarmanAPI.getRoadmap(roleKey);
    if (roadmap && roadmap.roadmap_stages) {
      container.innerHTML = roadmap.roadmap_stages.map((stage, i) => `
        <div class="stage ${stage.status === 'completed' ? 'complete' : (stage.status === 'in_progress' ? 'progress' : 'upcoming')}">
          <div class="rail-dot"><span class="d"></span><span class="ln"></span></div>
          <div class="stage-card">
            <div class="stage-top" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="eyebrow" style="${stage.status === 'completed' ? 'color:var(--green-text); font-weight:700;' : (stage.status === 'in_progress' ? 'color:var(--navy-dark); font-weight:700;' : 'color:var(--ink-sub);')}">
                ${stage.stage || `STAGE ${i+1}`}
              </span>
              ${stage.duration ? `<span style="font-size:0.75rem; color:var(--ink-sub); font-weight:600; background:#FAF8F4; padding:2px 8px; border-radius:4px; border:1px solid var(--border-light);">${stage.duration}</span>` : ''}
            </div>
            <h3 class="stage-title" style="font-size:1.1rem; margin-top:4px;">${stage.title || stage.stage}</h3>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
              ${(stage.items || []).map(item => `<span style="background:#FAF8F4; border:1px solid var(--border-light); font-size:.78rem; padding:4px 9px; border-radius:6px; font-weight:500;">${item}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.warn("Could not fetch remote roadmap:", err);
    container.innerHTML = '<p style="color:var(--red-alert); font-size:.88rem; padding:16px;">Failed to load roadmap. Check connection to backend.</p>';
  }
}

// ---------------- SIDEBAR RESIZER SLIDER & COLLAPSE CONTROLLER ---------------- //
let activeBotChannel = 'whatsapp';

function toggleSidebar() {
  const frame = document.querySelector('.dashboard-3col');
  const toggleIcon = document.getElementById('sidebar-toggle-icon');
  if (!frame) return;

  const isCollapsed = frame.classList.toggle('sidebar-collapsed');
  localStorage.setItem('karman_sidebar_collapsed', isCollapsed ? 'true' : 'false');

  if (toggleIcon) {
    if (isCollapsed) {
      // Show expand arrow pointing right
      toggleIcon.innerHTML = `<polyline points="9 18 15 12 9 6"/>`;
    } else {
      // Show collapse arrow pointing left
      toggleIcon.innerHTML = `<polyline points="15 18 9 12 15 6"/>`;
    }
  }
}

function initSidebarResizer() {
  const frame = document.querySelector('.dashboard-3col');
  const resizer = document.getElementById('sidebar-resizer');
  if (!frame || !resizer) return;

  // Restore saved width
  const savedWidth = localStorage.getItem('karman_sidebar_width');
  if (savedWidth) {
    frame.style.setProperty('--sidebar-w', `${savedWidth}px`);
  }

  // Restore saved collapsed state
  const isCollapsed = localStorage.getItem('karman_sidebar_collapsed') === 'true';
  if (isCollapsed) {
    frame.classList.add('sidebar-collapsed');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    if (toggleIcon) toggleIcon.innerHTML = `<polyline points="9 18 15 12 9 6"/>`;
  }

  let isDragging = false;

  resizer.addEventListener('mousedown', (e) => {
    isDragging = true;
    resizer.classList.add('is-dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Minimum 74px (icon only) to Maximum 420px
    const newWidth = Math.min(420, Math.max(74, e.clientX));
    
    // Auto collapse if dragged very small
    if (newWidth <= 95) {
      frame.classList.add('sidebar-collapsed');
      frame.style.setProperty('--sidebar-w', `74px`);
    } else {
      frame.classList.remove('sidebar-collapsed');
      frame.style.setProperty('--sidebar-w', `${newWidth}px`);
      localStorage.setItem('karman_sidebar_width', newWidth);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      resizer.classList.remove('is-dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });

  // Double click resizer slider to reset to standard 240px
  resizer.addEventListener('dblclick', () => {
    frame.classList.remove('sidebar-collapsed');
    frame.style.setProperty('--sidebar-w', '240px');
    localStorage.setItem('karman_sidebar_width', '240');
    localStorage.setItem('karman_sidebar_collapsed', 'false');
  });
}

// ---------------- DUAL BOT CHANNEL SWITCHER (WHATSAPP & TELEGRAM) ---------------- //
function switchBotChannel(channel) {
  activeBotChannel = channel;
  const tabWa = document.getElementById('tab-channel-wa');
  const tabTg = document.getElementById('tab-channel-tg');
  const headerBanner = document.getElementById('bot-header-banner');
  const shellHeader = document.getElementById('bot-shell-header');
  const statusName = document.getElementById('bot-status-name');
  const statusIndicator = document.getElementById('bot-status-indicator');
  const chatBody = document.getElementById('tg-chat-body');

  if (channel === 'whatsapp') {
    if (tabWa) { tabWa.classList.add('active'); tabWa.classList.add('whatsapp'); }
    if (tabTg) { tabTg.classList.remove('active'); tabTg.classList.remove('telegram'); }
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
    if (tabTg) { tabTg.classList.add('active'); tabTg.classList.add('telegram'); }
    if (tabWa) { tabWa.classList.remove('active'); tabWa.classList.remove('whatsapp'); }
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

// ---------------- BENEFICIARY LIVELIHOOD MAPPING CONTROLLERS ---------------- //
function applyTradeForRole(role) {
  const tradeTitle = document.getElementById('bene-trade-title');
  const qpCode = document.getElementById('bene-qp-code');
  const sectorName = document.getElementById('bene-sector-name');
  const readinessPct = document.getElementById('bene-readiness-pct');
  const readinessBar = document.getElementById('bene-readiness-bar');
  const expVal = document.getElementById('bene-exp-val');
  const outcomeVal = document.getElementById('bene-outcome-val');
  const nsqfBadge = document.getElementById('bene-nsqf-badge');

  // Pipeline milestones
  const pipeStage1 = document.getElementById('pipe-stage-1');
  const pipeStage2 = document.getElementById('pipe-stage-2');
  const pipeStage3 = document.getElementById('pipe-stage-3');
  const pipeStage6 = document.getElementById('pipe-stage-6');

  // DPR Plan
  const dprUnitTitle = document.getElementById('dpr-unit-title');
  const dprSetupCost = document.getElementById('dpr-setup-cost');
  const dprGrantVal = document.getElementById('dpr-grant-val');
  const dprMonthlyIncome = document.getElementById('dpr-monthly-income');
  const dprEq1 = document.getElementById('dpr-eq-1');
  const dprEq1Price = document.getElementById('dpr-eq-1-price');
  const dprEq2 = document.getElementById('dpr-eq-2');
  const dprEq2Price = document.getElementById('dpr-eq-2-price');
  const dprEq3 = document.getElementById('dpr-eq-3');
  const dprEq3Price = document.getElementById('dpr-eq-3-price');
  const dprEq4 = document.getElementById('dpr-eq-4');
  const dprEq4Price = document.getElementById('dpr-eq-4-price');

  // Competencies
  const compHave1 = document.getElementById('comp-have-1');
  const compHave2 = document.getElementById('comp-have-2');
  const compHave3 = document.getElementById('comp-have-3');
  const compGap1 = document.getElementById('comp-gap-1');
  const compGap2 = document.getElementById('comp-gap-2');

  // Topbar profile
  const hdrName = document.getElementById('hdr-user-name');
  const hdrRole = document.getElementById('hdr-user-role');
  const hdrInitials = document.getElementById('hdr-user-initials');

  if (role === 'artisan') {
    if (tradeTitle) tradeTitle.innerText = "Heritage Handloom & Carpentry (कारीगर)";
    if (qpCode) qpCode.innerText = "HCS/Q5401 — Handloom Weaver / Master Craftsman";
    if (sectorName) sectorName.innerText = "Sector: Handicrafts and Carpet Sector Skill Council (HCSSC)";
    if (readinessPct) readinessPct.innerText = "90%";
    if (readinessBar) readinessBar.style.width = "90%";
    if (expVal) expVal.innerText = "7+ Years Traditional Craft";
    if (outcomeVal) outcomeVal.innerText = "Craft Cooperative Unit";
    if (nsqfBadge) nsqfBadge.innerText = "NSQF LEVEL 4";

    if (pipeStage1) pipeStage1.innerText = "7 yrs traditional handloom & woodwork mapped";
    if (pipeStage2) pipeStage2.innerText = "Master Craftsman mapped via RAG";
    if (pipeStage3) pipeStage3.innerText = "Standardized to National Level 4 (HCS/Q5401)";
    if (pipeStage6) pipeStage6.innerText = "Artisan Handloom & Craft Cluster Enterprise";

    if (dprUnitTitle) dprUnitTitle.innerText = "Handloom & Wooden Handicrafts Production Unit";
    if (dprSetupCost) dprSetupCost.innerText = "₹75,000";
    if (dprGrantVal) dprGrantVal.innerText = "₹50,000 (PM-AJAY / Vishwakarma)";
    if (dprMonthlyIncome) dprMonthlyIncome.innerText = "₹22,000 – ₹28,000";
    if (dprEq1) dprEq1.innerText = "Modern Frame Loom & Warp Drum";
    if (dprEq1Price) dprEq1Price.innerText = "₹36,000";
    if (dprEq2) dprEq2.innerText = "Precision Wood Carving & Chiseling Toolkit";
    if (dprEq2Price) dprEq2Price.innerText = "₹15,000";
    if (dprEq3) dprEq3.innerText = "Finishing & Lacquer Polishing Workstation";
    if (dprEq3Price) dprEq3Price.innerText = "₹14,000";
    if (dprEq4) dprEq4.innerText = "Raw Silk Yarn & Seasoned Timber Material";
    if (dprEq4Price) dprEq4Price.innerText = "₹10,000";

    if (compHave1) compHave1.innerText = "✓ Traditional loom warping & pattern setup";
    if (compHave2) compHave2.innerText = "✓ Hand carving, joinery & relief detailing";
    if (compHave3) compHave3.innerText = "✓ Natural dye mixing & fabric texture inspection";
    if (compGap1) compGap1.innerText = "○ Digital marketing & ONDC e-commerce listing";
    if (compGap2) compGap2.innerText = "○ Standardized packaging & export quality metrics";

    if (hdrName) hdrName.innerText = "Rameshwar Sharma";
    if (hdrRole) hdrRole.innerText = "Artisan (कारीगर) · Level 4";
    if (hdrInitials) hdrInitials.innerText = "R";
  } else if (role === 'entrepreneur' || role === 'business') {
    if (tradeTitle) tradeTitle.innerText = "Two Wheeler Service Micro-Enterprise";
    if (qpCode) qpCode.innerText = "ASC/Q1411 — Two Wheeler Lead Technician & Enterprise Unit";
    if (sectorName) sectorName.innerText = "Sector: Automotive Skills Development Council (ASDC)";
    if (readinessPct) readinessPct.innerText = "92%";
    if (readinessBar) readinessBar.style.width = "92%";
    if (expVal) expVal.innerText = "6+ Years Service Workshop";
    if (outcomeVal) outcomeVal.innerText = "Independent Service Centre";
    if (nsqfBadge) nsqfBadge.innerText = "NSQF LEVEL 4";

    if (pipeStage1) pipeStage1.innerText = "6 yrs vehicle repair & engine diagnostics mapped";
    if (pipeStage2) pipeStage2.innerText = "Two Wheeler Service Enterprise mapped via RAG";
    if (pipeStage3) pipeStage3.innerText = "Standardized to National Level 4 (ASC/Q1411)";
    if (pipeStage6) pipeStage6.innerText = "Multi-Brand Two Wheeler Workshop & Service Station";

    if (dprUnitTitle) dprUnitTitle.innerText = "Two Wheeler Multi-Brand Service Enterprise";
    if (dprSetupCost) dprSetupCost.innerText = "₹1,20,000";
    if (dprGrantVal) dprGrantVal.innerText = "₹50,000 (PM-AJAY + Mudra)";
    if (dprMonthlyIncome) dprMonthlyIncome.innerText = "₹35,000 – ₹45,000";
    if (dprEq1) dprEq1.innerText = "Hydraulic Bike Ramp & Lifting Station";
    if (dprEq1Price) dprEq1Price.innerText = "₹48,000";
    if (dprEq2) dprEq2.innerText = "Electronic OBD-II Diagnostic Scanner";
    if (dprEq2Price) dprEq2Price.innerText = "₹28,000";
    if (dprEq3) dprEq3.innerText = "Pneumatic Impact Wrench & Air Compressor";
    if (dprEq3Price) dprEq3Price.innerText = "₹24,000";
    if (dprEq4) dprEq4.innerText = "Spare Parts Inventory & Lubricants Stock";
    if (dprEq4Price) dprEq4Price.innerText = "₹20,000";

    if (compHave1) compHave1.innerText = "✓ 4-stroke engine disassembly & timing adjustment";
    if (compHave2) compHave2.innerText = "✓ Brake overhaul, suspension & transmission service";
    if (compHave3) compHave3.innerText = "✓ Electrical circuit testing & battery health diagnostics";
    if (compGap1) compGap1.innerText = "○ Electric Vehicle (EV) battery & BLDC motor basics";
    if (compGap2) compGap2.innerText = "○ Workshop inventory accounting & GST invoicing";

    if (hdrName) hdrName.innerText = "Vikram Patel";
    if (hdrRole) hdrRole.innerText = "Micro-Entrepreneur · Level 4";
    if (hdrInitials) hdrInitials.innerText = "V";
  } else {
    // default worker
    if (tradeTitle) tradeTitle.innerText = "Tailoring & Garment Manufacturing";
    if (qpCode) qpCode.innerText = "AMH/Q0301 — Sewing Machine Operator";
    if (sectorName) sectorName.innerText = "Sector: Apparel, Made-Ups & Home Furnishing SSC";
    if (readinessPct) readinessPct.innerText = "88%";
    if (readinessBar) readinessBar.style.width = "88%";
    if (expVal) expVal.innerText = "5+ Years (Informal)";
    if (outcomeVal) outcomeVal.innerText = "Micro-Enterprise";
    if (nsqfBadge) nsqfBadge.innerText = "NSQF LEVEL 4";

    if (pipeStage1) pipeStage1.innerText = "5 yrs informal stitching & alterations mapped";
    if (pipeStage2) pipeStage2.innerText = "Sewing Machine Operator mapped via RAG";
    if (pipeStage3) pipeStage3.innerText = "Standardized to National Level 4 (AMH/Q0301)";
    if (pipeStage6) pipeStage6.innerText = "Home-based Boutique & Custom Tailoring Unit";

    if (dprUnitTitle) dprUnitTitle.innerText = "Home-based Tailoring & Custom Apparel Unit";
    if (dprSetupCost) dprSetupCost.innerText = "₹65,000";
    if (dprGrantVal) dprGrantVal.innerText = "₹50,000 (PM-AJAY)";
    if (dprMonthlyIncome) dprMonthlyIncome.innerText = "₹18,000 – ₹24,000";
    if (dprEq1) dprEq1.innerText = "Industrial Motorized Lockstitch Machine";
    if (dprEq1Price) dprEq1Price.innerText = "₹32,000";
    if (dprEq2) dprEq2.innerText = "Heavy Duty Overlock & Hemming Unit";
    if (dprEq2Price) dprEq2Price.innerText = "₹16,000";
    if (dprEq3) dprEq3.innerText = "Cutting Table, Shears & Ergonomic Stand";
    if (dprEq3Price) dprEq3Price.innerText = "₹12,000";
    if (dprEq4) dprEq4.innerText = "Initial Fabric & Thread Raw Materials";
    if (dprEq4Price) dprEq4Price.innerText = "₹5,000";

    if (compHave1) compHave1.innerText = "✓ Single needle lockstitch machine operation";
    if (compHave2) compHave2.innerText = "✓ Fabric cutting & pattern alignment";
    if (compHave3) compHave3.innerText = "✓ Garment alterations & finishing";
    if (compGap1) compGap1.innerText = "○ Motorized overlock machine maintenance";
    if (compGap2) compGap2.innerText = "○ Workplace safety & ergonomic positioning";

    if (hdrName) hdrName.innerText = "Sunita Devi";
    if (hdrRole) hdrRole.innerText = "Worker (श्रमिक) · Level 4";
    if (hdrInitials) hdrInitials.innerText = "S";
  }
}

function initRoleView() {
  const role = (localStorage.getItem('karman_role') || 'student').toLowerCase();
  
  const studentItems = document.querySelectorAll('.nav-student-only');
  const workerItems = document.querySelectorAll('.nav-worker-only');

  if (role === 'student') {
    studentItems.forEach(el => el.style.display = 'flex');
    workerItems.forEach(el => el.style.display = 'none');
    showPage('analyzer');
    changeRole('AI / ML Engineer');
    
    // Topbar student profile
    const hdrName = document.getElementById('hdr-user-name');
    const hdrRole = document.getElementById('hdr-user-role');
    const hdrInitials = document.getElementById('hdr-user-initials');
    if (hdrName) hdrName.innerText = "Arjun Mehta";
    if (hdrRole) hdrRole.innerText = "Student & Youth · Tech Lab";
    if (hdrInitials) hdrInitials.innerText = "A";
  } else {
    studentItems.forEach(el => el.style.display = 'none');
    workerItems.forEach(el => el.style.display = 'flex');
    applyTradeForRole(role);
    showPage('trade-identifier');
  }
}

function startHeroVoiceIntake() {
  const heroInput = document.getElementById('hero-intake-input');
  const micBtn = document.getElementById('hero-mic-btn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition is available in Google Chrome or modern browsers. Please type your trade below.");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = 'hi-IN'; // Multi-lingual Hindi / Hinglish intake
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

  if (tradeTitle) tradeTitle.innerText = "Mapping trade...";

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

// Execute on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initUserProfile();
  initSidebarResizer();
  initRoleView();
  loadNewsroomData();
  switchBotChannel('whatsapp');
});

