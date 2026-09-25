<div align="center">

# 🚀 Project KARMAN
### *Turn what you already know into an accredited career, not a guess.*

**India's First Dual-Journey AI Skill & Livelihood Intelligence Platform**  
*Built for Smart India Hackathon (SIH) 2026 · Gautam Buddha University (GBU) & AIC-GBU*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12%20%7C%203.13-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud_Cluster-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![ReportLab](https://img.shields.io/badge/ReportLab-2--Pass_PDF_Engine-E34F26?style=for-the-badge)](https://www.reportlab.com/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp_Bot-Voice_Intake-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/15552037186?text=Namaste%20Project%20KARMAN)
[![Telegram](https://img.shields.io/badge/Telegram_Bot-@KarmanSkillBot-229ED9?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/KarmanSkillBot)

[Live Demo](https://project-karman.onrender.com) · [API Documentation (Swagger)](https://project-karman.onrender.com/docs) · [Report Bug](https://github.com/SezarTheGreat/Project-KARMAN-SIH-project/issues)

</div>

---

## 📌 Table of Contents
1. [The Problem Statement](#-the-problem-statement)
2. [Solution Overview: The Dual-Journey Engine](#-solution-overview-the-dual-journey-engine)
3. [Key Features](#-key-features)
4. [Master System Architecture](#-master-system-architecture)
5. [Statutory Government Schemes Embedded](#-statutory-government-schemes-embedded)
6. [Data Privacy & DPDP Act 2023 Compliance](#-data-privacy--dpdp-act-2023-compliance)
7. [Repository Structure](#-repository-structure)
8. [Quick Start & Local Setup](#-quick-start--local-setup)
9. [API Endpoints Reference](#-api-endpoints-reference)
10. [Team & Acknowledgements](#-team--acknowledgements)

---

## 🛑 The Problem Statement

India faces a severe paradox in vocational and technical livelihood development:
- **The Rural / Informal Divide:** Over **90% of India's 500-million-strong workforce** operates in the unorganized informal sector. Skilled tailors, electricians, mechanics, and welders learn practically on the job, but have no accredited proof of competence. Consequently, they are disqualified from formal bank credit, institutional tenders, and life-changing welfare schemes like **PM-AJAY** and **PMKVY 4.0 RPL**.
- **The Urban / Academic Divide:** Millions of engineering and vocational students graduate every year with academic coursework, yet face high ATS (Applicant Tracking System) rejection rates due to unverified skill gaps and lack of structured industry capstone roadmaps.
- **The Information Asymmetry:** Official government gazettes and scheme guidelines are buried inside complex 60-page PDF circulars that rural citizens and students cannot easily comprehend or navigate.

---

## 💡 Solution Overview: The Dual-Journey Engine

**Project KARMAN** bridges this national credential gap through two synchronized, dedicated workspaces powered by a single async intelligence backend:

`	ext
                                  ┌─────────────────────────────┐
                                  │       PROJECT KARMAN        │
                                  └──────────────┬──────────────┘
                                                 │
                  ┌──────────────────────────────┴──────────────────────────────┐
                  ▼                                                             ▼
    [ BENEFICIARY WORKSPACE ]                                     [ STUDENT CAREER WORKSPACE ]
    (beneficiary-dashboard.html)                                  (student-dashboard.html)
    • Tailored for informal artisans & workers                    • Tailored for college students & graduates
    • Mobile Number + 4-digit SMS OTP (1234)                      • Email/Password + Social Authentication
    • Vernacular voice intake on WhatsApp & Telegram              • Resume ATS Parser & Career Readiness Radar
    • 9 National NSQF trade matrices (AMH, CSC, ELE)              • Prescriptive 2-week capstone projects
    • PM-AJAY GIA 50% capital grant calculator (₹50k)             • STAR-method resume bullet point improver
    • Gram Panchayat & Bank DPR Action Card                       • Live PIB & MSDE Scheme Newsroom
    • 5-Page Certified Action Roadmap PDF                         • 5-Stage applied career progression roadmap
`

---

## ✨ Key Features

### 1. 🎙️ Omnichannel Voice & WhatsApp Intake (Zero-Form Onboarding)
* Rural workers do not need to download an app or type text. They simply send an audio note in Hindi or regional dialects to our **WhatsApp Bot (+1-555-203-7186)** or **Telegram Bot (@KarmanSkillBot)**:
  > *"Main 5 saal se silai karti hoon, mujhe motorized machine ke liye madad chahiye."*
* The incoming webhook is routed through **n8n** to our FastAPI backend (/api/n8n/bot-intake). The AI engine maps the intent to **Sewing Machine Operator (AMH/Q1947, NSQF Level 4)** and replies via WhatsApp with an audio/text breakdown and a link to their custom 5-page PDF roadmap.

### 2. 🏛️ National 9-Trade Standards Matrix & PM-AJAY DPR Calculator
* Features verified National Occupational Standards across 9 core sectors:
  * **AMH/Q1947**: Tailoring & Garments (NSQF Level 4)
  * **CSC/Q0204**: Manual Metal Arc Welding & Fabrication (NSQF Level 3)
  * **ELE/Q6301**: Electrical & Wireman (NSQF Level 4)
  * **SGJ/Q0101**: Solar PV Installer — Surya Mitra (NSQF Level 4)
  * **PSC/Q0104**: Plumbing & Sanitary Fitting (NSQF Level 4)
  * **ASC/Q9703**: Commercial Driving & Fleet Mechanics (NSQF Level 4)
  * **SSC/Q2212**: Domestic Data Entry & CSC Operator (NSQF Level 4)
  * **AGR/Q4101**: Dairy Entrepreneur & Milk Production (NSQF Level 4)
  * **ELE/Q4601**: Mobile Phone Hardware Repair & Diagnostics (NSQF Level 4)
* Dynamically implements the **PM-AJAY Section 4.2 GIA statutory formula**:
  \text{Subsidy} = \min(\text{Project Cost} \times 0.50, ₹50,000)
* Balances the remaining project cost with concessional **Mudra / NSFDC** institutional loans at 6.0% interest.

### 3. 📄 Official 5-Page Action Roadmap PDF (eportlab)
* Programmatically compiles a 5-page tamper-evident dossier using Python ReportLab with a two-pass NumberedCanvas ("Page X of Y"):
  * **Page 1**: Candidate Profile & Macro Career Journey
  * **Page 2**: Step-by-Step Training, NSQF Qualification Code & RPL Camp Location
  * **Page 3**: Government Grants & Financial Breakdown (PM-AJAY, PMKVY 4.0, Mudra)
  * **Page 4**: 30 / 60 / 90-Day Livelihood Action Plan
  * **Page 5**: Document Verification Checklist (Aadhaar, Caste, DBT-Seeded Bank Passbook)

### 4. 📋 Gram Panchayat & Bank DPR Action Card
* Generates a monospaced, standardized receipt formatted specifically for village **Gram Panchayats**, **Ward Welfare Officers**, and **Bank Branch Managers** to eliminate application bottlenecks at District Social Welfare Offices (DSDO).

### 5. 🎯 Student ATS Resume Radar & STAR Enhancer
* Evaluates raw resume text against structured industry role ontologies (e.g., AI/ML Engineer, Full-Stack Developer).
* Calculates a normalized **Career Readiness Score (45%–92%)**, highlights verified competencies in green, identifies missing skill gaps in red, and prescribes a **2-week practical capstone project** to bridge the gap.
* Rewrites weak bullet points using the **STAR methodology** (Situation, Task, Action, Result).

### 6. 📰 Live Government Scheme & Policy Newsroom
* Scrapes real-time XML/RSS circulars directly from official endpoints:
  * **PIB (Press Information Bureau)**
  * **MSDE (Ministry of Skill Development & Entrepreneurship)**
* Features in-memory caching with a 1-hour TTL and on-demand cache busting (POST /api/worker/newsroom/refresh).

---

## 🏗️ Master System Architecture

`	ext
       [ RURAL BENEFICIARY ]                                  [ COLLEGE STUDENT ]
       (WhatsApp / Telegram)                                    (Web Dashboard)
                 │                                                     │
         [ Voice / Audio ]                                     [ Resume / Text ]
                 │                                                     │
       n8n Webhook Gateway                                             │
                 │                                                     │
                 └───────────────────────┬─────────────────────────────┘
                                         ▼
                        ┌─────────────────────────────────┐
                        │   FastAPI Master Async Backend  │
                        │          (Python 3.13)          │
                        └────────────────┬────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
 ┌──────────────┐               ┌─────────────────┐              ┌─────────────────┐
 │   DATABASE   │               │  AI RAG ENGINE  │              │ NEWSROOM ENGINE │
 ├──────────────┤               ├─────────────────┤              ├─────────────────┤
 │MongoDB Atlas │               │Vector Retrieval │              │Live RSS Scraper │
 │Cloud Cluster │               │on PM-AJAY/NSQF  │              │PIB & MSDE Feeds │
 │              │               │                 │              │                 │
 │ • users      │               │Heuristic Rules &│              │1-Hour In-Memory │
 │ • profiles   │               │Llama-3.1 Groq   │              │Cache Layer      │
 │ • skills     │               │                 │              │                 │
 │ • applicants │               │ATS Skill Radar  │              │On-Demand Cache  │
 └──────────────┘               │STAR Improver    │              │Buster (/refresh)│
        ▲                       └────────┬────────┘              └────────┬────────┘
        │                                │                                │
        └────────────────────────────────┼────────────────────────────────┘
                                         ▼
                        ┌─────────────────────────────────┐
                        │ ReportLab 2-Pass Compiler (PDF) │
                        │  (Dynamic NumberedCanvas API)   │
                        └────────────────┬────────────────┘
                                         │
        ┌────────────────────────────────┴────────────────────────────────┐
        ▼                                                                 ▼
 [ WhatsApp Reply + Direct PDF Link ]                      [ Interactive Dashboard UI ]
 (Instant delivery to rural worker)                       (Readiness Score & Project Lab)
`

---

## 🏛️ Statutory Government Schemes Embedded

| Scheme Name | Governing Ministry | Key Benefit Unlocked in KARMAN |
| :--- | :--- | :--- |
| **PM-AJAY** *(Section 4.2)* | Ministry of Social Justice & Empowerment | **₹50,000 Equipment Grant** (100% grant for SC micro-entrepreneurs; zero repayment) |
| **PMKVY 4.0 RPL** | Ministry of Skill Development (MSDE) | **3-Day Fast-Track Assessment**, certified NSQF Digital Badge, and **₹500 DBT reward** |
| **PM-Vishwakarma** | Ministry of MSME | Basic & advanced artisan training stipend (₹500/day) + **₹15,000 toolkit e-voucher** |
| **PMEGP / Mudra** | Ministry of Finance | Collateral-free subsidized micro-credit: **Shishu** (up to ₹50k) and **Kishor** (up to ₹5L) |
| **PM-Surya Ghar** | Ministry of New & Renewable Energy | Accelerated training and rooftop installation subsidies for **Solar PV Installers** |

---

## 🔒 Data Privacy & DPDP Act 2023 Compliance

To handle sensitive citizen records responsibly:
1. **Automated Aadhaar Redaction (UIDAI Mandate):** Uploaded Aadhaar cards undergo in-memory computer vision processing to mask the first 8 digits. Only XXXX-XXXX-1234 is stored, alongside a salted SHA-256 hash for duplicate check.
2. **Short-Lived Pre-Signed URLs:** Document uploads are stored in private storage containers with **public access blocked**. District officers access files using temporary, cryptographically signed tokens with a 5-minute expiry.
3. **Data Minimization:** Only mandatory eligibility variables (annual income tier, caste category, DBT enablement) are extracted. Raw physical document files are automatically purged after verification.
4. **Explicit Digital Consent:** Users are prompted with explicit bilingual consent before any voice note or document is processed.

---

## 📁 Repository Structure

`plaintext
Project-KARMAN/
├── backend/
│   ├── main.py                     # FastAPI master server, routes, CORS & endpoints
│   ├── ai_engine.py                # RAG pipeline, vector search & trade extraction logic
│   ├── database.py                 # Asynchronous MongoDB Atlas connection & collection indexes
│   ├── database_builder.py         # PDF policy parser & vector index builder
│   ├── news_aggregator.py          # Live XML/RSS scheme scraper for PIB & MSDE feeds
│   ├── pdf_generator.py            # ReportLab 2-pass certified PDF generator (NumberedCanvas)
│   ├── requirements.txt            # Python dependencies (FastAPI, motor, reportlab, etc.)
│   ├── data/                       # Official scheme policy manuals (PM-AJAY, NSQF)
│   └── chroma_db/                  # Local vector embeddings & keyword index
├── frontend/
│   ├── public/                     # Public web assets mirror
│   └── src/                        # Optional React workspace components
├── images/                         # Official logos, badges, and document seal assets
├── beneficiary-dashboard.html      # Dedicated Livelihood Workspace for artisans & workers
├── beneficiary-dashboard.js        # Controller: 9 NSQF trades, PM-AJAY calculator & bot simulator
├── student-dashboard.html          # Dedicated Student Workspace (ATS Radar & Project Lab)
├── dashboard.js                    # Controller: ATS parser, STAR improver & career roadmap
├── welcome.html                    # Google Antigravity-inspired orbital particle gateway
├── index.html                      # Public landing portal with 1-click trade diagnostic modal
├── login.html                      # Multi-role authentication hub (Worker OTP vs Student Email)
├── register.html                   # Account registration portal
├── auth.js                         # Session manager & role routing controller
├── api.js                          # Client-side REST SDK with offline fallback resilience
├── styles.css                      # Master design system (Navy #162035, Gold #F4C542, Paper #FAF8F4)
└── README.md                       # Master project documentation
`

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Python 3.10+ (Recommended: Python 3.11, 3.12, or 3.13)
- Node.js 18+ (Optional, for frontend dev server)
- Active MongoDB Atlas Cluster URI

### 1. Clone the Repository
`ash
git clone https://github.com/SezarTheGreat/Project-KARMAN-SIH-project.git
cd Project-KARMAN-SIH-project
`

### 2. Configure Backend Environment
Create a .env file in the ackend/ directory:
`env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Karman?retryWrites=true&w=majority
DB_NAME=Karman
PUBLIC_BASE_URL=http://localhost:8000
GROQ_API_KEY=your_groq_api_key_here  # Optional for LLM inference; fallback rule engine active
`

### 3. Install Dependencies & Launch Backend
`ash
cd backend
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
`

### 4. Access the Application
Open your browser and navigate to:
* **Landing Portal:** http://localhost:8000/index.html
* **Welcome Gateway:** http://localhost:8000/welcome.html
* **Beneficiary Workspace:** http://localhost:8000/beneficiary-dashboard.html
* **Student Workspace:** http://localhost:8000/student-dashboard.html
* **Swagger API Docs:** http://localhost:8000/docs

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/auth/login | Authenticates user and returns role-based dashboard route |
| POST | /api/auth/register | Registers applicant and initializes profile in MongoDB |
| GET | /api/profile/{user_id} | Retrieves persisted profile and saved trade milestones |
| POST | /api/profile | Upserts user profile details and financial DPR numbers |
| POST | /api/skills | Saves verified skills and triggers NSQF competency mapping |
| POST | /api/simulate-intake | Processes audio/text query, runs RAG, and generates 5-page PDF |
| POST | /api/n8n/bot-intake | Unified webhook endpoint for WhatsApp & Telegram bots |
| POST | /api/student/analyze-resume | Runs ATS keyword set difference and returns Readiness Score |
| POST | /api/student/improve-bullet | Transforms passive resume lines into STAR impact bullets |
| GET | /api/worker/newsroom | Returns live, cached PIB & MSDE government scheme feed |
| POST | /api/worker/newsroom/refresh| Forces an immediate live re-scrape of official circulars |
| GET | /api/db-status | Intelligent diagnostic health check for MongoDB Atlas |

---

## 👥 Team & Acknowledgements

Developed with pride for the **Smart India Hackathon 2026** at **Gautam Buddha University (GBU)** in partnership with **AIC-GBU Incubation Centre**.

* **Institution:** Gautam Buddha University, Greater Noida, Uttar Pradesh
* **Incubation Partner:** Atal Incubation Centre — GBU (AIC-GBU)
* **Hackathon:** Smart India Hackathon (SIH) 2026

---

<div align="center">
  <sub>Built with ❤️ to empower the artisans and engineers of Bharat.</sub><br>
  <sub><strong>Innovation Se Atmanirbhar Bharat · Viksit Bharat · Jai Anusandhan</strong></sub>
</div>
