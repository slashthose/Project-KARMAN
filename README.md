# 🚀 Project KARMAN — Smart India Hackathon (SIH)

> **AI-Driven Career Pathways, Artisan Intake Automation & Multi-Channel Upskilling Platform**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 What is Project KARMAN?

**Project KARMAN** bridges the opportunity divide between rural informal artisans and urban engineering students across India:
- **For Students**: Automated ATS resume evaluation, real-time skill-gap diagnosis, personalized milestone roadmaps, and instant PDF generation.
- **For Rural Artisans & Workers**: Multilingual intake via WhatsApp and Telegram chatbots, voice-first applicant onboarding, government welfare scheme discovery (PM-Vishwakarma, Mudra, PMEGP), and local craft news feeds.

---

## 📁 Repository Structure

```plaintext
SIH/
├── frontend/                     # ⚛️ React 18 + Vite Web App & Dashboards
│   ├── public/                   # Standalone HTML/JS/CSS assets & illustrations
│   ├── src/                      # React pages, components, & contexts
│   └── README.md                 # Frontend-specific documentation
├── backend/                      # 🐍 FastAPI Backend & RAG services
│   ├── main.py                   # API routes and CORS configuration
│   ├── pdf_generator.py          # Dynamic PDF roadmap generator
│   └── ...
├── images/                       # Illustration branding assets
├── dashboard.html                # Standalone full-featured interactive portal
└── README.md                     # Root project documentation
```

---

## ⚡ Quick Start

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API documentation will be accessible at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🤖 Multi-Channel Bots

- **WhatsApp Intake Bot**: [Chat on WhatsApp (+1-555-203-7186)](https://wa.me/15552037186?text=Namaste%20Project%20KARMAN)
- **Telegram Skill Bot**: [@KarmanSkillBot](https://t.me/KarmanSkillBot)