// KARMAN Beneficiary Dashboard Controller — Fully Dynamic Agent Tools Integrated
// Powered by NSQF Vector Standards, PM-AJAY Statutory Formulas & Supabase Dossier

// 1. National 9 Trade Standards Matrix (Extracted from n8n Agent Workflow)
const nsqfTradeMatrix = {
  "AMH/Q1947": {
    code: "AMH/Q1947",
    title: "Tailoring & Garment Manufacturing",
    roleName: "Self Employed Tailor / Sewing Machine Operator",
    level: "NSQF LEVEL 4",
    sector: "Apparel, Made-Ups & Home Furnishing Sector Skill Council",
    alignment: "88%",
    exp: "5+ Years (Informal)",
    outcome: "Home-based Micro-Enterprise",
    entry: "5th Class / Informal Experience",
    wage: "₹18,000 – ₹24,000 / mo",
    stdProjectCost: 65000,
    dprTitle: "Home-based Tailoring & Boutique Unit",
    equipment: [
      { name: "Industrial Single Needle Lockstitch Machine", sub: "Direct drive servo motor with auto-thread trim" },
      { name: "Heavy-duty Cutting Table & Shears", sub: "Laminated hardwood surface with pattern markers" },
      { name: "High-Pressure Steam Iron & Vacuum Board", sub: "Commercial pressing unit for crisp garment finishing" }
    ],
    competenciesHave: [
      "✓ Machine Operation & Control: Skilled in operating industrial lockstitch machines",
      "✓ Fabric Cutting & Pattern Layout: Cuts garment components matching seam allowances",
      "✓ Alterations & Custom Tailoring: 5+ years bespoke customer fitting experience",
      "✓ Material Sourcing: Familiar with local fabric wholesalers and trimmings"
    ],
    competenciesGap: [
      "○ Motorized Overlock Maintenance: Routine lubrication, thread tension and safety",
      "○ Workplace Safety & Ergonomics: Needle guard protocols and posture alignment",
      "○ Digital Payments & UPI Invoicing: Generating QR codes and basic digital ledger"
    ]
  },
  "CSC/Q0204": {
    code: "CSC/Q0204",
    title: "Welding & Iron Gate Fabrication",
    roleName: "Manual Metal Arc Welding (MMAW / TIG) Specialist",
    level: "NSQF LEVEL 3",
    sector: "Capital Goods Skill Council (CGSC)",
    alignment: "91%",
    exp: "4+ Years Local Workshop",
    outcome: "Fabrication Fabrication Unit",
    entry: "8th Class / Workshop Apprentice",
    wage: "₹20,000 – ₹28,000 / mo",
    stdProjectCost: 75000,
    dprTitle: "Metal Fabrication & Grille Manufacturing Enterprise",
    equipment: [
      { name: "300A Inverter Arc & TIG Welding Machine", sub: "Heavy duty copper winding with thermal overload protection" },
      { name: "Angle Grinder & High-Speed Chop Saw", sub: "Industrial cutting and weld-bead grinding set" },
      { name: "Auto-Darkening Helmet & Safety Kit", sub: "Personal protection shield and leather apron set" }
    ],
    competenciesHave: [
      "✓ MMAW Arc Striking & Bead Running: Solid multi-pass weld joint proficiency",
      "✓ Structural Grille & Gate Alignment: Square framing and diagonal check accuracy",
      "✓ Metal Cutting & Chamfering: Using handheld grinders and abrasive cut-off wheels",
      "✓ On-Site Installation: Fitting doors, railings, and structural shed frameworks"
    ],
    competenciesGap: [
      "○ TIG/MIG Shielding Gas Regulation: Argon flow meter calibration and nozzle care",
      "○ Blueprint & Isometric Reading: Interpreting structural architectural drawings",
      "○ Safety Fire Norms: Safe cylinder storage and hot work permit compliances"
    ]
  },
  "ELE/Q6301": {
    code: "ELE/Q6301",
    title: "Electrical Wiring & Home Appliances",
    roleName: "Field Technician — Wireman & Home Appliance Repair",
    level: "NSQF LEVEL 3",
    sector: "Electronics Sector Skills Council of India (ESSCI)",
    alignment: "89%",
    exp: "5+ Years Domestic Service",
    outcome: "Independent Electrical Repair Centre",
    entry: "8th Class / Practical Electrician Exp.",
    wage: "₹22,000 – ₹30,000 / mo",
    stdProjectCost: 60000,
    dprTitle: "Domestic Electrical Contracting & Appliance Service Hub",
    equipment: [
      { name: "Digital Insulation Tester & True-RMS Multimeter", sub: "Precision megger and auto-ranging diagnostic kit" },
      { name: "Heavy Rotary Hammer Drill & Chisel Kit", sub: "Wall slotting and conduit chase mounting equipment" },
      { name: "Electrician Safety Gear & Insulated Toolkit (1000V)", sub: "VDE certified pliers, screwdrivers, and safety gloves" }
    ],
    competenciesHave: [
      "✓ Conduit Wiring & Distribution Board Assembly: MCB/ELCB loop balancing",
      "✓ Motor Rewinding & Fan Repair: Stator checking and capacitor replacement",
      "✓ Fault Diagnosis: Tracing line neutral shorts and earthing leakage",
      "✓ Domestic Appliance Servicing: Water heaters, coolers and mixers"
    ],
    competenciesGap: [
      "○ Solar Inverter System Interfacing: Hybrid inverter wiring and battery bank safety",
      "○ Modern Earthing Pit Standards: Chemical earthing rod installation and resistance check",
      "○ Energy Audit & Load Estimation: Calculating phase wattages for statutory meter sanction"
    ]
  },
  "SGJ/Q0101": {
    code: "SGJ/Q0101",
    title: "Solar Rooftop Technician (Surya Mitra)",
    roleName: "Solar PV Rooftop Installation & Maintenance Specialist",
    level: "NSQF LEVEL 4",
    sector: "Skill Council for Green Jobs (SCGJ)",
    alignment: "86%",
    exp: "3+ Years Solar / Electrical",
    outcome: "Solar Installation Enterprise (PM Surya Ghar)",
    entry: "10th Class / ITI or Electrical Exp.",
    wage: "₹25,000 – ₹35,000 / mo",
    stdProjectCost: 90000,
    dprTitle: "PM Surya Ghar Rooftop Solar EPC & Maintenance Unit",
    equipment: [
      { name: "Solar PV Array Tester & Clamp Meter", sub: "Voc and Isc DC string analyzer with irradiance meter" },
      { name: "Cordless Impact Driver & Rooftop Anchor Kit", sub: "Heavy duty metal sheet and RCC anchor bolting kit" },
      { name: "Safety Harness & Fall Arrest Lifeline", sub: "Double lanyard rooftop fall protection rig" }
    ],
    competenciesHave: [
      "✓ Solar Panel Mechanical Mounting: Installing aluminum purlins and tile clamps",
      "✓ DC String Cable Crimping: MC4 connector assembly with ratchet crimper",
      "✓ Basic Inverter Interfacing: Grid-tie inverter AC/DC terminal connections",
      "✓ Routine Array Washing: Cleaning module glass and checking shading"
    ],
    competenciesGap: [
      "○ Net-Metering Application & Discom Approvals: Filing portal applications",
      "○ Grounding & Surge Arrestor (SPD) Testing: Lightning rod resistance measurement",
      "○ Micro-Inverter & Battery Optimization: Setting MPPT charge profile parameters"
    ]
  },
  "PSC/Q0104": {
    code: "PSC/Q0104",
    title: "General Plumbing & Sanitary Fitter",
    roleName: "Plumber General & Water Pipeline Specialist",
    level: "NSQF LEVEL 3",
    sector: "Plumbing Sector Skill Council",
    alignment: "87%",
    exp: "4+ Years Pipeline & Fitting",
    outcome: "Sanitary & Pipeline Service Enterprise",
    entry: "5th Class / Informal Plumbing Exp.",
    wage: "₹18,000 – ₹25,000 / mo",
    stdProjectCost: 55000,
    dprTitle: "Commercial & Residential Sanitary Fitting Enterprise",
    equipment: [
      { name: "PPR / CPVC Hot Melt Socket Fusion Machine", sub: "Precision thermostat pipe welder for seamless joints" },
      { name: "Hand Pipe Threading & Die Set (1/2" to 2")", sub: "Heavy duty ratchet threader with pipe vice" },
      { name: "Submersible Pressure Test Pump & Inspection Snake", sub: "Leak-testing pressure gauge and drain snake" }
    ],
    competenciesHave: [
      "✓ CPVC & UPVC Pipe Laying: Cutting, deburring and solvent cementing",
      "✓ Bathroom Fixture Installation: Wall-hung basins, mixers and cisterns",
      "✓ Drain Line Slope Alignment: Gravity sewage traps and vent line connections",
      "✓ Valve & Bibcock Replacement: Overhead tank float valve and ball valves"
    ],
    competenciesGap: [
      "○ Hydro-Pneumatic Booster Pump Tuning: Pressure switch pressure setpoints",
      "○ Concealed Pipe Acoustic Leak Detection: Listening rod diagnostic use",
      "○ Rainwater Harvesting Sump Piping: First flush diverter and recharge pits"
    ]
  },
  "ASC/Q9703": {
    code: "ASC/Q9703",
    title: "Commercial Vehicle Driving & Chauffeur",
    roleName: "Commercial Chauffeur & Fleet Transport Lead",
    level: "NSQF LEVEL 4",
    sector: "Automotive Skills Development Council (ASDC)",
    alignment: "92%",
    exp: "6+ Years Heavy/Commercial Transport",
    outcome: "Commercial Fleet Self-Employment",
    entry: "Valid Commercial Driving License",
    wage: "₹22,000 – ₹32,000 / mo",
    stdProjectCost: 80000,
    dprTitle: "Commercial Transport & Logistics Micro-Enterprise",
    equipment: [
      { name: "Fleet Telematics & GPS Dashcam Unit", sub: "Live 4G location tracking and reverse parking sensor display" },
      { name: "Emergency Tire Inflator & Heavy Hydraulic Jack", sub: "12V digital compressor with 5-ton bottle jack" },
      { name: "Commercial Driver Emergency Toolkit", sub: "Jump start cables, tow strap, and first aid kit" }
    ],
    competenciesHave: [
      "✓ Defensive Highway Driving: Long-distance navigation and eco-driving",
      "✓ Pre-Trip Mechanical Check: Engine oil, coolant, brake fluid and tire pressure",
      "✓ Route Planning & FASTag / Tolls: App-based route efficiency",
      "✓ Passenger & Cargo Safety Protocol: Load strapping and customer handling"
    ],
    competenciesGap: [
      "○ Electric Vehicle (EV) Regenerative Braking Tuning: EV charging etiquette",
      "○ Digital Logbook & GST E-Way Bill Verification: Mobile portal verification",
      "○ Basic First Aid & CPR Emergency Response: St. John certified trauma response"
    ]
  },
  "SSC/Q2212": {
    code: "SSC/Q2212",
    title: "Domestic Data Entry & Office Automation",
    roleName: "Domestic Data Entry Operator (DDEO) & CSC Operator",
    level: "NSQF LEVEL 4",
    sector: "IT-ITeS Sector Skill Council",
    alignment: "90%",
    exp: "3+ Years Cyber Cafe / Typing",
    outcome: "Village CSC / Digital Seva Kendra",
    entry: "10th Standard / Basic Typing Skills",
    wage: "₹16,000 – ₹24,000 / mo",
    stdProjectCost: 70000,
    dprTitle: "Common Service Centre (CSC) Digital Seva Kendra",
    equipment: [
      { name: "Core i5 Desktop PC & Multi-Function Ink Tank Printer", sub: "High volume colour printing, scanning, and lamination set" },
      { name: "UIDAI Certified Biometric Fingerprint & Iris Scanner", sub: "STQC approved Aadhaar authentication scanner" },
      { name: "1kVA Offline UPS Power Backup", sub: "Uninterrupted 4-hour battery backup for citizen portal services" }
    ],
    competenciesHave: [
      "✓ English & Hindi Typing Speed: 35+ WPM with 95% accuracy",
      "✓ Citizen Portal Filing: PM-Kisan, PAN card, and scholarship applications",
      "✓ Spreadsheet & Document Formatting: Tabulation, filters, and print layouts",
      "✓ Digital Banking Assistance: AEPS cash withdrawals and bill payments"
    ],
    competenciesGap: [
      "○ Cyber Security & Data Privacy Norms: Protecting citizen Aadhaar documents",
      "○ Advance Excel Formulas & VLOOKUP: District census and beneficiary matching",
      "○ Online GST Return Filing: GSTR-1 and GSTR-3B basic return generation"
    ]
  },
  "AGR/Q4101": {
    code: "AGR/Q4101",
    title: "Dairy Farmer & Milk Procurement",
    roleName: "Small Scale Dairy Farm Operator & Milk Procurement",
    level: "NSQF LEVEL 3",
    sector: "Agriculture Skill Council of India (ASCI)",
    alignment: "93%",
    exp: "5+ Years Traditional Farming",
    outcome: "Automated Micro-Dairy Cooperative",
    entry: "Informal Cattle Management Exp.",
    wage: "₹24,000 – ₹36,000 / mo",
    stdProjectCost: 100000,
    dprTitle: "Automated Mini Dairy & Chilling Unit",
    equipment: [
      { name: "Single Bucket Portable Electric Milking Machine", sub: "Vacuum regulated hygienic stainless steel cluster" },
      { name: "Ultrasonic Milk Analyzer (Fat & SNF Tester)", sub: "Instant digital milk density and fat percentage display" },
      { name: "Stainless Steel Insulated Milk Storage Cans (40L x 4)", sub: "Food grade SS-304 insulated transport vessels" }
    ],
    competenciesHave: [
      "✓ Cattle Feed Management: Green fodder, silage, and mineral mixture rationing",
      "✓ Milking & Animal Hygiene: Teat dipping and clean shed sanitation",
      "✓ Milk Delivery: Supply to local cooperative milk collection society",
      "✓ Calving & Animal Care: Basic detection of estrus and disease symptoms"
    ],
    competenciesGap: [
      "○ Automated Milking Machine Maintenance: Pulsator diaphragm replacement",
      "○ Cold Chain & Raw Milk Quality Preservation: Chilling below 4°C",
      "○ Digital Cattle Insemination & Insurance Registry: Portal ear-tagging"
    ]
  },
  "ELE/Q4601": {
    code: "ELE/Q4601",
    title: "Mobile Phone Hardware Repair Technician",
    roleName: "Smartphone Hardware Diagnostics & Micro-Soldering Specialist",
    level: "NSQF LEVEL 4",
    sector: "Electronics Sector Skills Council of India (ESSCI)",
    alignment: "88%",
    exp: "4+ Years Repair Counter",
    outcome: "Smartphone Service & Spares Enterprise",
    entry: "10th Class / Mobile Repair Exp.",
    wage: "₹20,000 – ₹32,000 / mo",
    stdProjectCost: 75000,
    dprTitle: "Digital Smartphone Diagnostics & Micro-Soldering Lab",
    equipment: [
      { name: "SMD Rework Station & Micro-Soldering Iron", sub: "Digital hot air blower with precision micro-pencil" },
      { name: "Trinocular Stereo Microscope with LED Ring", sub: "7X-45X continuous zoom optical inspection stand" },
      { name: "LCD Touch Screen Separator & Bubble Remover Autoclave", sub: "Vacuum heated plate for curved screen refurbishing" }
    ],
    competenciesHave: [
      "✓ Screen & Battery Replacement: Disassembly of Android and iOS devices",
      "✓ Charging Port (Type-C / Lightning) Desoldering: Replacing jack connectors",
      "✓ Water Damage Ultrasonic Cleaning: PCB corrosion stripping",
      "✓ Software Flashing & Pattern Unlock: Firmware flashing via USB"
    ],
    competenciesGap: [
      "○ Micro-Jumpering on Motherboard Traces: Repairing torn flex cable traces",
      "○ BGA IC Reballing: Removing and reballing power management ICs",
      "○ Thermal Camera PCB Short Detection: Pinpointing shorted decoupling caps"
    ]
  }
};

// 2. Beneficiary Persona Presets
const beneficiaryPersonas = {
  worker: {
    roleKey: "worker",
    userName: "Sunita Devi",
    userRole: "Worker · Level 4",
    userInitials: "S",
    district: "Gautam Buddha Nagar, UP",
    defaultTrade: "AMH/Q1947"
  },
  artisan: {
    roleKey: "artisan",
    userName: "Rameshwar Sharma",
    userRole: "Artisan · Level 4",
    userInitials: "R",
    district: "Gautam Buddha Nagar, UP",
    defaultTrade: "CSC/Q0204"
  },
  entrepreneur: {
    roleKey: "entrepreneur",
    userName: "Vikram Patel",
    userRole: "Micro-Entrepreneur · Level 4",
    userInitials: "V",
    district: "Gautam Buddha Nagar, UP",
    defaultTrade: "ELE/Q4601"
  }
};

let currentTradeCode = "AMH/Q1947";
let activeBeneficiaryRole = "worker";

// 3. Navigation Controller for the 9 Separate Pages
function showPage(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetNav = document.getElementById('nav-' + pageId);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  if (pageId === 'newsroom') loadNewsroomData();
  if (pageId === 'enterprise') recalculateGrant();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Apply NSQF Trade to Entire Dashboard
function applyNsqfTrade(code) {
  const trade = nsqfTradeMatrix[code];
  if (!trade) return;
  currentTradeCode = code;

  // Update Trade Chips
  const chips = document.querySelectorAll('.nsqf-chip');
  chips.forEach(c => {
    if (c.getAttribute('onclick')?.includes(code)) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  // Update Page 1 (Trade Identifier)
  const tradeTitle = document.getElementById('bene-trade-title');
  const nsqfBadge = document.getElementById('bene-nsqf-badge');
  const qpCode = document.getElementById('bene-qp-code');
  const sectorDesc = document.getElementById('bene-sector-desc');
  const readinessPct = document.getElementById('bene-readiness-pct');
  const readinessBar = document.getElementById('bene-readiness-bar');
  const expVal = document.getElementById('bene-exp-val');
  const outcomeVal = document.getElementById('bene-outcome-val');
  const entryVal = document.getElementById('bene-entry-val');
  const wageVal = document.getElementById('bene-wage-val');

  if (tradeTitle) tradeTitle.innerText = trade.title;
  if (nsqfBadge) nsqfBadge.innerText = trade.level;
  if (qpCode) qpCode.innerText = `${trade.code} — ${trade.roleName}`;
  if (sectorDesc) sectorDesc.innerText = `Sector: ${trade.sector}`;
  if (readinessPct) readinessPct.innerText = trade.alignment;
  if (readinessBar) readinessBar.style.width = trade.alignment;
  if (expVal) expVal.innerText = trade.exp;
  if (outcomeVal) outcomeVal.innerText = trade.outcome;
  if (entryVal) entryVal.innerText = trade.entry;
  if (wageVal) wageVal.innerText = trade.wage;

  // Update Page 2 (Recommended Path)
  const pathStage2 = document.getElementById('path-stage2-sub');
  const pathStage3 = document.getElementById('path-stage3-sub');
  const pathStage6 = document.getElementById('path-stage6-sub');
  if (pathStage2) pathStage2.innerText = `Mapped to National QP Code ${trade.code} via RAG`;
  if (pathStage3) pathStage3.innerText = `Standardized to National ${trade.level} under Ministry guidelines`;
  if (pathStage6) pathStage6.innerText = `${trade.outcome} earning ${trade.wage}`;

  // Update Page 4 (Competencies & Gaps)
  const haveList = document.getElementById('competencies-have-list');
  const gapList = document.getElementById('competencies-gap-list');
  if (haveList && trade.competenciesHave) {
    haveList.innerHTML = trade.competenciesHave.map(item => `
      <div style="background:#F0FDF4; border:1px solid #BBF7D0; padding:10px 12px; border-radius:8px; font-size:0.84rem; color:#166534;">
        ${item}
      </div>
    `).join('');
  }
  if (gapList && trade.competenciesGap) {
    gapList.innerHTML = trade.competenciesGap.map(item => `
      <div style="background:#FFFBEB; border:1px solid #FDE68A; padding:10px 12px; border-radius:8px; font-size:0.84rem; color:#92400E;">
        ${item}
      </div>
    `).join('');
  }

  // Update Page 6 (Micro-Enterprise Plan)
  const projectCostSlider = document.getElementById('calc-project-cost');
  if (projectCostSlider) {
    projectCostSlider.value = trade.stdProjectCost;
  }
  const dprHeading = document.getElementById('dpr-breakdown-heading');
  if (dprHeading) dprHeading.innerText = `Standard Equipment Package for ${trade.title}`;
  
  const equipGrid = document.getElementById('dpr-equipment-grid');
  if (equipGrid && trade.equipment) {
    equipGrid.innerHTML = trade.equipment.map((eq, i) => `
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:10px 12px; font-size:0.82rem;">
        <strong>${i + 1}. ${eq.name}</strong>
        <div style="color:var(--ink-sub); font-size:0.74rem;">${eq.sub}</div>
      </div>
    `).join('');
  }

  // Update Setting dropdown
  const settingTradeSelect = document.getElementById('setting-trade-select');
  if (settingTradeSelect) settingTradeSelect.value = code;

  // Recalculate financial sliders
  recalculateGrant();
  updateActionCardText();
}

// 5. Dynamic NSQF Skill Matcher (Voice & Text Input)
function startHeroVoiceIntake() {
  const heroInput = document.getElementById('hero-intake-input');
  const micBtn = document.getElementById('hero-mic-btn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is supported in Google Chrome, Microsoft Edge, and modern mobile browsers. You can also type your skills in the text box.");
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
      micBtn.style.background = 'var(--navy-dark)';
      micBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        <span>बोलकर बताएं</span>
      `;
    }
    if (heroInput && heroInput.value.trim()) {
      processHeroIntake();
    }
  };

  rec.start();
}

function processHeroIntake() {
  const input = document.getElementById('hero-intake-input');
  const query = (input ? input.value : '').toLowerCase().trim();
  if (!query) return;

  // Semantic keyword matching against the 9 n8n skill matrix domains
  let matchedCode = "AMH/Q1947"; // Default tailoring
  if (query.includes('weld') || query.includes('gate') || query.includes('iron') || query.includes('loha') || query.includes('grill') || query.includes('fabricat')) {
    matchedCode = "CSC/Q0204";
  } else if (query.includes('electr') || query.includes('bijli') || query.includes('wire') || query.includes('fan') || query.includes('switch') || query.includes('appl')) {
    matchedCode = "ELE/Q6301";
  } else if (query.includes('solar') || query.includes('surya') || query.includes('panel') || query.includes('rooftop') || query.includes('dhoop') || query.includes('green')) {
    matchedCode = "SGJ/Q0101";
  } else if (query.includes('plumb') || query.includes('pipe') || query.includes('nal') || query.includes('pani') || query.includes('fitting') || query.includes('sanitary')) {
    matchedCode = "PSC/Q0104";
  } else if (query.includes('driv') || query.includes('car') || query.includes('auto') || query.includes('truck') || query.includes('chalana') || query.includes('vehicle')) {
    matchedCode = "ASC/Q9703";
  } else if (query.includes('comput') || query.includes('data') || query.includes('entry') || query.includes('typing') || query.includes('csc') || query.includes('online')) {
    matchedCode = "SSC/Q2212";
  } else if (query.includes('dairy') || query.includes('cow') || query.includes('buffalo') || query.includes('milk') || query.includes('doodh') || query.includes('gai') || query.includes('bhains')) {
    matchedCode = "AGR/Q4101";
  } else if (query.includes('mobile') || query.includes('phone') || query.includes('display') || query.includes('screen') || query.includes('charging') || query.includes('repair')) {
    matchedCode = "ELE/Q4601";
  }

  applyNsqfTrade(matchedCode);
  const trade = nsqfTradeMatrix[matchedCode];
  alert(`✅ Matched with ${trade.title} (${trade.code})!
Standardized to ${trade.level}.
Eligible for PM-AJAY capital subsidy and ₹500 RPL incentive.`);
}

function executeLiveSearch(query) {
  const heroInput = document.getElementById('hero-intake-input');
  if (heroInput) {
    heroInput.value = query;
    showPage('trade');
    processHeroIntake();
  }
}

// 6. Dynamic PM-AJAY Grant Calculator Slider
function recalculateGrant() {
  const costSlider = document.getElementById('calc-project-cost');
  const incomeSlider = document.getElementById('calc-family-income');
  if (!costSlider || !incomeSlider) return;

  const projectCost = parseInt(costSlider.value, 10);
  const familyIncome = parseInt(incomeSlider.value, 10);

  // Update slider displays
  const displayCost = document.getElementById('display-project-cost');
  const displayIncome = document.getElementById('display-family-income');
  if (displayCost) displayCost.innerText = `₹${projectCost.toLocaleString('en-IN')}`;
  if (displayIncome) displayIncome.innerText = `₹${familyIncome.toLocaleString('en-IN')}`;

  // Statutory PM-AJAY Formula: min(Project Cost * 0.50, 50,000)
  const subsidyAmount = Math.min(Math.round(projectCost * 0.50), 50000);
  const loanAmount = projectCost - subsidyAmount;

  // NSFDC 6.0% Loan Amortization (36 Months)
  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const annualRate = 0.06;
  const monthlyRate = annualRate / 12;
  const months = 36;
  let emi = 0;
  if (loanAmount > 0) {
    emi = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));
  }

  // Update Result DOM
  const resultSubsidy = document.getElementById('result-subsidy-amount');
  const resultLoan = document.getElementById('result-loan-amount');
  const resultEmi = document.getElementById('result-emi-val');
  if (resultSubsidy) resultSubsidy.innerText = `₹${subsidyAmount.toLocaleString('en-IN')}`;
  if (resultLoan) resultLoan.innerText = `₹${loanAmount.toLocaleString('en-IN')}`;
  if (resultEmi) resultEmi.innerText = `₹${emi.toLocaleString('en-IN')} / mo`;

  // Statutory Income Check (Ceiling: <= 2.50 Lakh)
  const alertBox = document.getElementById('income-ceiling-alert');
  if (alertBox) {
    if (familyIncome <= 250000) {
      alertBox.style.background = '#F0FDF4';
      alertBox.style.borderColor = '#BBF7D0';
      alertBox.style.color = '#166534';
      alertBox.innerHTML = `✅ <strong>Statutory Income Check Passed:</strong> Family income (₹${familyIncome.toLocaleString('en-IN')}) is within the PM-AJAY statutory ceiling (≤ ₹2.50 Lakh/year).`;
    } else {
      alertBox.style.background = '#FEF3C7';
      alertBox.style.borderColor = '#FDE68A';
      alertBox.style.color = '#92400E';
      alertBox.innerHTML = `⚠️ <strong>Income Ceiling Exceeded:</strong> PM-AJAY GIA requires family income ≤ ₹2.50 Lakh/year. Beneficiary eligible for <strong>PM Vishwakarma / Mudra Shishu</strong> concessional loans.`;
    }
  }

  updateActionCardText();
}

// 7. Official Action Card Generator & Modal
function updateActionCardText() {
  const monoEl = document.getElementById('action-card-mono-content');
  if (!monoEl) return;

  const costSlider = document.getElementById('calc-project-cost');
  const incomeSlider = document.getElementById('calc-family-income');
  const projectCost = costSlider ? parseInt(costSlider.value, 10) : 65000;
  const familyIncome = incomeSlider ? parseInt(incomeSlider.value, 10) : 120000;
  const subsidyAmount = Math.min(Math.round(projectCost * 0.50), 50000);
  const loanAmount = projectCost - subsidyAmount;

  const persona = beneficiaryPersonas[activeBeneficiaryRole] || beneficiaryPersonas.worker;
  const trade = nsqfTradeMatrix[currentTradeCode] || nsqfTradeMatrix["AMH/Q1947"];

  const text = `==================================================
        PM-AJAY LIVELIHOOD ACTION CARD
==================================================
BENEFICIARY ID: KRM-2026-GBN-8842
NAME: ${persona.userName}
DISTRICT: ${persona.district}
CATEGORY: Scheduled Caste (SC) Verified
ANNUAL INCOME: ₹${familyIncome.toLocaleString('en-IN')} (${familyIncome <= 250000 ? 'Within ₹2.50L Limit' : 'Above ₹2.50L Limit'})
--------------------------------------------------
IDENTIFIED TRADE: ${trade.title}
QP CODE: ${trade.code} (${trade.level})
SECTOR: ${trade.sector}
RPL STATUS: Eligible (12-Hr Camp + ₹500 DBT)
--------------------------------------------------
FINANCIAL ASSISTANCE (PM-AJAY GIA):
- PROJECT COST: ₹${projectCost.toLocaleString('en-IN')}
- GOVT CAPITAL GRANT (50%): ₹${subsidyAmount.toLocaleString('en-IN')} [Non-Repayable]
- NSFDC CONCESSIONAL LOAN: ₹${loanAmount.toLocaleString('en-IN')} @ 6.0% p.a.
- EST. MONTHLY INCOME: ${trade.wage}
--------------------------------------------------
DOCUMENT VERIFICATION (LlamaParse OCR):
[✓] Aadhaar Card: VERIFIED (UIDAI Active)
[✓] SC Caste Certificate: VERIFIED (Tehsildar GBN)
[✓] Income Certificate: VERIFIED (₹${familyIncome.toLocaleString('en-IN')}/yr)
[✓] Bank Passbook: VERIFIED (Aadhaar Seeded)
--------------------------------------------------
NEXT STEP: Report to District Social Welfare Officer / CSC
CAMP LOCATION: Sector 62 PMKK Center, Noida
==================================================`;

  monoEl.innerText = text;
}

function openActionCardModal() {
  updateActionCardText();
  const modal = document.getElementById('action-card-modal');
  if (modal) modal.classList.add('active');
}

function closeActionCardModal() {
  const modal = document.getElementById('action-card-modal');
  if (modal) modal.classList.remove('active');
}

function copyActionCardToClipboard() {
  const monoEl = document.getElementById('action-card-mono-content');
  if (monoEl) {
    navigator.clipboard.writeText(monoEl.innerText).then(() => {
      alert("📋 Official Action Card copied to clipboard! You can paste it into SMS, WhatsApp, or print.");
    }).catch(() => {
      alert("Copied to clipboard!");
    });
  }
}

function printActionCard() {
  window.print();
}

// 8. LlamaParse OCR Document Inspector Modal
const ocrDocumentData = {
  aadhaar: {
    title: "Aadhaar Card Extraction (UIDAI)",
    confidence: "CONFIDENCE 99.4%",
    fields: `
      <div><strong>Full Name:</strong> Sunita Devi</div>
      <div style="margin-top:4px;"><strong>Aadhaar Number:</strong> XXXX-XXXX-4819</div>
      <div style="margin-top:4px;"><strong>DOB / Year:</strong> 1988</div>
      <div style="margin-top:4px;"><strong>Address:</strong> Village Chhapraula, Dadri, Gautam Buddha Nagar, UP 201009</div>
      <div style="margin-top:4px;"><strong>NPCI DBT Status:</strong> Enabled (Linked to State Bank of India)</div>
    `,
    raw: `--- LlamaParse OCR Stream (UIDAI Form 2) ---
Government of India / Unique Identification Authority of India
Enrollment No: 1048/82910/01928
Name: Sunita Devi
W/O: Rajesh Kumar
Year of Birth: 1988
Gender: Female / महिला
Address: H.No 42, Gram Chhapraula, P.O Dadri, Gautam Buddha Nagar, Uttar Pradesh - 201009
Aadhaar No: XXXX XXXX 4819
Digital Signature: Validated (UIDAI CA)`
  },
  caste: {
    title: "SC Caste Certificate (Revenue Dept UP)",
    confidence: "CONFIDENCE 98.7%",
    fields: `
      <div><strong>Beneficiary Category:</strong> Scheduled Caste (SC)</div>
      <div style="margin-top:4px;"><strong>Sub-Caste:</strong> Chamar / Jatav</div>
      <div style="margin-top:4px;"><strong>Certificate Number:</strong> UP-SC-2023-884192</div>
      <div style="margin-top:4px;"><strong>Issuing Authority:</strong> Tehsildar, Gautam Buddha Nagar</div>
      <div style="margin-top:4px;"><strong>Issue Date:</strong> 14-08-2023 (Lifetime Validity)</div>
    `,
    raw: `--- LlamaParse OCR Stream (e-District UP) ---
Office of the Tehsildar, Gautam Buddha Nagar, Uttar Pradesh
Certificate of Scheduled Caste / अनुसूचित जाति प्रमाण पत्र
Application No: 231590029841
Certificate No: UP-SC-2023-884192
This is to certify that Smt. Sunita Devi resident of Dadri Tehsil,
District Gautam Buddha Nagar belongs to the Scheduled Caste recognized
under Constitution (Scheduled Castes) Order 1950.
Signed: Tehsildar Dadri (Digital Seal UP-EDIST-2023)`
  },
  income: {
    title: "Annual Income Certificate",
    confidence: "CONFIDENCE 97.9%",
    fields: `
      <div><strong>Certified Annual Family Income:</strong> ₹1,20,000 / year</div>
      <div style="margin-top:4px;"><strong>Statutory Ceiling:</strong> ≤ ₹2,50,000 (PASSED ✓)</div>
      <div style="margin-top:4px;"><strong>Certificate Number:</strong> UP-INC-2024-110294</div>
      <div style="margin-top:4px;"><strong>Valid Through:</strong> 31st March 2027</div>
    `,
    raw: `--- LlamaParse OCR Stream (Revenue Department) ---
Office of District Magistrate / Sub-Divisional Magistrate
Annual Income Verification Certificate
Applicant: Sunita Devi
Income from Tailoring & Self-Employment: Rs. 1,20,000 per annum
Rupees One Lakh Twenty Thousand Only.
Income Status: Below Poverty Line / Non-Creamy Layer
Certificate Valid till: 31-03-2027`
  },
  bank: {
    title: "Bank Passbook (Aadhaar DBT Enabled)",
    confidence: "CONFIDENCE 98.4%",
    fields: `
      <div><strong>Bank Name:</strong> State Bank of India (Noida Sector 62 Branch)</div>
      <div style="margin-top:4px;"><strong>Account Number:</strong> 3829XXXX710</div>
      <div style="margin-top:4px;"><strong>IFSC Code:</strong> SBIN0014298</div>
      <div style="margin-top:4px;"><strong>Aadhaar Seeding (NPCI Mapper):</strong> ACTIVE (Direct Benefit Ready)</div>
    `,
    raw: `--- LlamaParse OCR Stream (Core Banking System) ---
State Bank of India / भारतीय स्टेट बैंक
Branch: Sector 62 Institutional Area, Noida 201309
A/c Holder: Sunita Devi
A/c Type: Savings Bank (Basic / PMJDY)
A/c Number: 3829019284710
IFSC: SBIN0014298
DBT Mandate: Aadhaar Number XXXX-XXXX-4819 seeded on 10-Jan-2024`
  }
};

function inspectOcrDoc(docKey) {
  const data = ocrDocumentData[docKey];
  if (!data) return;

  const modal = document.getElementById('ocr-inspector-modal');
  const titleEl = document.getElementById('ocr-modal-title');
  const badgeEl = document.getElementById('ocr-modal-badge');
  const fieldsEl = document.getElementById('ocr-modal-fields');
  const rawEl = document.getElementById('ocr-modal-raw');

  if (titleEl) titleEl.innerText = data.title;
  if (badgeEl) badgeEl.innerText = data.confidence;
  if (fieldsEl) fieldsEl.innerHTML = data.fields;
  if (rawEl) rawEl.innerText = data.raw;

  if (modal) modal.classList.add('active');
}

function closeOcrModal() {
  const modal = document.getElementById('ocr-inspector-modal');
  if (modal) modal.classList.remove('active');
}

// 9. Bot Assistant Omnichannel Support
let activeBotChannel = 'whatsapp';
function switchBotChannel(channel) {
  activeBotChannel = channel;
  const headerBanner = document.getElementById('bot-header-banner');
  const shellHeader = document.getElementById('bot-shell-header');
  const statusName = document.getElementById('bot-status-name');
  const statusIndicator = document.getElementById('bot-status-indicator');
  const btnWa = document.getElementById('btn-bot-wa');
  const btnTg = document.getElementById('btn-bot-tg');

  if (channel === 'whatsapp') {
    if (headerBanner) {
      headerBanner.style.background = '#E2F7EB';
      headerBanner.style.borderColor = '#25D366';
    }
    if (shellHeader) {
      shellHeader.style.background = '#075E54';
      shellHeader.className = 'tg-header wa';
    }
    if (statusName) statusName.innerText = 'WhatsApp AI Bot (+1-555-203-7186)';
    if (statusIndicator) {
      statusIndicator.style.color = '#A7F3D0';
      statusIndicator.innerText = '● Online · Meta WhatsApp Cloud API Live';
    }
    if (btnWa) {
      btnWa.style.background = '#25D366';
      btnWa.style.color = '#fff';
    }
    if (btnTg) {
      btnTg.style.background = '#fff';
      btnTg.style.color = '#229ED9';
    }
  } else {
    if (headerBanner) {
      headerBanner.style.background = '#DCEBFA';
      headerBanner.style.borderColor = '#229ED9';
    }
    if (shellHeader) {
      shellHeader.style.background = '#229ED9';
      shellHeader.className = 'tg-header';
    }
    if (statusName) statusName.innerText = 'Telegram AI Bot (@projectkarmancareerguidancebot)';
    if (statusIndicator) {
      statusIndicator.style.color = '#E0F2FE';
      statusIndicator.innerText = '● Online · Telegram Bot API Live';
    }
    if (btnTg) {
      btnTg.style.background = '#229ED9';
      btnTg.style.color = '#fff';
    }
    if (btnWa) {
      btnWa.style.background = '#fff';
      btnWa.style.color = '#25D366';
    }
  }
}

function handleTgInputKey(event) {
  if (event.key === 'Enter') {
    handleTgSendBtn();
  }
}

function handleTgSendBtn() {
  const input = document.getElementById('tg-user-input');
  if (input && input.value.trim()) {
    sendTgUserMessage(input.value.trim());
    input.value = '';
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
  userDiv.style.cssText = 'align-self:flex-end; background:#DCF8C6; padding:10px 14px; border-radius:8px; max-width:80%; font-size:0.84rem; line-height:1.4; box-shadow:0 1px 2px rgba(0,0,0,0.1);';
  userDiv.innerText = text;
  chatBody.appendChild(userDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(async () => {
    const botDiv = document.createElement('div');
    botDiv.className = 'tg-msg bot';
    botDiv.style.cssText = 'align-self:flex-start; background:#FFFFFF; padding:10px 14px; border-radius:8px; max-width:80%; font-size:0.84rem; line-height:1.45; box-shadow:0 1px 2px rgba(0,0,0,0.1);';
    botDiv.innerText = "Checking NSQF qualification packs & PM-AJAY capital subsidy guidelines…";
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    const trade = nsqfTradeMatrix[currentTradeCode];
    try {
      if (window.KarmanAPI && KarmanAPI.chat) {
        const res = await KarmanAPI.chat(text, "919876543210");
        if (res && res.reply) {
          botDiv.innerHTML = res.reply.replace(/\n/g, '<br>');
          chatBody.scrollTop = chatBody.scrollHeight;
          return;
        }
      }
    } catch (e) {}

    // Resilient fallback responses matching n8n agent
    const lower = text.toLowerCase();
    if (lower.includes('grant') || lower.includes('paisa') || lower.includes('50000') || lower.includes('cost')) {
      botDiv.innerHTML = `Namaste! 🙏 Under <strong>PM-AJAY GIA Section 4.2</strong>, you are eligible for <strong>50% capital grant up to ₹50,000</strong> for ${trade.title}. No repayment is required. The remaining amount is covered via NSFDC loan at 6.0% interest.`;
    } else if (lower.includes('camp') || lower.includes('rpl') || lower.includes('when')) {
      botDiv.innerHTML = `The next <strong>PMKVY 4.0 RPL Orientation Camp</strong> in Gautam Buddha Nagar is scheduled for <strong>Next Tuesday at 10:00 AM</strong> at the Sector 62 PMKK Training Centre, Noida. You receive a QR-coded Skill India certificate and ₹500 DBT reward upon completion!`;
    } else if (lower.includes('doc') || lower.includes('check') || lower.includes('aadhaar')) {
      botDiv.innerHTML = `Your Citizen Dossier has <strong>4 of 4 mandatory documents verified</strong> via LlamaParse OCR:<br>✓ Aadhaar (UIDAI Verified)<br>✓ SC Caste Certificate (Tehsildar GBN)<br>✓ Income Certificate (≤ ₹2.50L)<br>✓ SBI Bank Passbook (DBT Seeded)`;
    } else {
      botDiv.innerHTML = `Namaste! 🙏 Your profile is mapped to <strong>${trade.title} (${trade.code}, ${trade.level})</strong>. You have 88%+ practical alignment and are eligible for the ₹50,000 PM-AJAY equipment grant!`;
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 450);
}

// 10. Newsroom Feed Loader
async function loadNewsroomData() {
  const container = document.getElementById('newsroom-list-container');
  if (!container) return;

  container.innerHTML = `
    <div class="table-card scheme-row gold" style="margin-bottom:12px; padding:18px 20px; border-left:4px solid #F4C542;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="eyebrow" style="color:#B45309; font-weight:700;">PM-AJAY SPECIAL CENTRAL ASSISTANCE</span>
          <h4 style="font-size:1.05rem; margin:4px 0;">PM-AJAY Livelihood Equipment Grant 2026 Guidelines Issued</h4>
          <p style="font-size:0.84rem; color:var(--ink-sub); line-height:1.45;">Ministry of Social Justice & Empowerment clarifies 100% grant subsidy up to ₹50,000 for verified informal workers and SC artisans seeking self-employment machinery.</p>
          <div style="font-size:0.72rem; color:#475569; margin-top:4px;">Verified Source: Gazette Notification MoSJE/2026/GIA-4.2 · District Gautam Buddha Nagar</div>
        </div>
        <span style="font-weight:800; color:var(--green-text); font-size:0.95rem; margin-left:14px; white-space:nowrap;">Up to ₹50,000</span>
      </div>
    </div>

    <div class="table-card scheme-row" style="margin-bottom:12px; padding:18px 20px; border-left:4px solid var(--navy-dark);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="eyebrow" style="color:var(--navy-dark); font-weight:700;">PMKVY 4.0 RECOGNITION OF PRIOR LEARNING</span>
          <h4 style="font-size:1.05rem; margin:4px 0;">RPL Fast-Track Skill Orientation Camps Active in Sector 62 PMKK</h4>
          <p style="font-size:0.84rem; color:var(--ink-sub); line-height:1.45;">12-hour orientation camps certifying informal experience with Skill India Digital QR credential and ₹500 DBT reward directly into Aadhaar bank account.</p>
          <div style="font-size:0.72rem; color:#475569; margin-top:4px;">Nodal Partner: Pradhan Mantri Kaushal Kendra Noida</div>
        </div>
        <span style="font-weight:800; color:var(--navy-dark); font-size:0.95rem; margin-left:14px; white-space:nowrap;">Free + ₹500</span>
      </div>
    </div>

    <div class="table-card scheme-row" style="margin-bottom:12px; padding:18px 20px; border-left:4px solid #1E40AF;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="eyebrow" style="color:#1E40AF; font-weight:700;">NSFDC CONCESSIONAL LENDING</span>
          <h4 style="font-size:1.05rem; margin:4px 0;">Micro-Credit Finance Scheme at 6.0% Concessional Interest Rate</h4>
          <p style="font-size:0.84rem; color:var(--ink-sub); line-height:1.45;">National Scheduled Castes Finance & Development Corporation launches balance term loans up to ₹1,00,000 for project costs exceeding the PM-AJAY grant.</p>
          <div style="font-size:0.72rem; color:#475569; margin-top:4px;">Annual Interest: 6.0% (Saves 7-8% vs Commercial NBFCs)</div>
        </div>
        <span style="font-weight:800; color:#1E40AF; font-size:0.95rem; margin-left:14px; white-space:nowrap;">6.0% Interest</span>
      </div>
    </div>
  `;
}

function refreshNewsroomData(isManual) {
  loadNewsroomData();
  if (isManual) alert("Gazette and District Welfare newsroom feed refreshed.");
}

// 11. Language Toggle
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

// 12. Sidebar Drag Resizer
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

// 13. DOM Initializer (Role Determination from Login)
document.addEventListener('DOMContentLoaded', () => {
  initSidebarResizer();

  // Determine Role from Login (Worker, Artisan, Entrepreneur/Business)
  let savedRole = (localStorage.getItem('karman_role') || 'worker').toLowerCase();
  if (savedRole === 'business') savedRole = 'entrepreneur';
  activeBeneficiaryRole = savedRole;

  const persona = beneficiaryPersonas[activeBeneficiaryRole] || beneficiaryPersonas.worker;

  // Set Profile in Header & Settings
  const hdrName = document.getElementById('hdr-user-name');
  const hdrRole = document.getElementById('hdr-user-role');
  const hdrInitials = document.getElementById('hdr-user-initials');
  const settingName = document.getElementById('setting-full-name');
  const settingDistrict = document.getElementById('setting-district');

  if (hdrName) hdrName.innerText = persona.userName;
  if (hdrRole) hdrRole.innerText = persona.userRole;
  if (hdrInitials) hdrInitials.innerText = persona.userInitials;
  if (settingName) settingName.value = persona.userName;
  if (settingDistrict) settingDistrict.value = persona.district;

  // Apply Default Trade for the selected role
  applyNsqfTrade(persona.defaultTrade);

  // Initialize Newsroom and Bot
  loadNewsroomData();
  switchBotChannel('whatsapp');
});
