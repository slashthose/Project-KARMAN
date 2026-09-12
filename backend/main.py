import os
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import List, Optional, Dict, Any
import requests
from fastapi import FastAPI, Request, Response, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Database client and collections
from database import (
    client as mongo_client,
    users_collection,
    profiles_collection,
    skills_collection,
    applicants_collection,
    init_db_indexes,
    check_db_connection
)
from ai_engine import process_beneficiary_query
from pdf_generator import generate_applicant_pdf, generate_skill_resume_pdf
from news_aggregator import get_live_scheme_news, refresh_scheme_news_cache

load_dotenv()

app = FastAPI(
    title="Project KARMAN Master Backend API",
    description="Dual Journey Platform with MongoDB Atlas Persistence",
    version="4.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static & Frontend Assets Mount
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
IMAGES_DIR = os.path.join(ROOT_DIR, "images")
if os.path.exists(IMAGES_DIR):
    app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

@app.on_event("startup")
async def on_startup():
    """Verify DB connection and initialize indexes on server launch."""
    await check_db_connection()
    await init_db_indexes()

# Static HTML delivery routes for standalone web app
@app.get("/")
def get_index():
    path = os.path.join(ROOT_DIR, "index.html")
    if os.path.exists(path):
        return FileResponse(path)
    return {"message": "Project KARMAN API running"}

@app.get("/index.html")
def get_index_html():
    return FileResponse(os.path.join(ROOT_DIR, "index.html"))

@app.get("/dashboard.html")
def get_dashboard_html():
    return FileResponse(os.path.join(ROOT_DIR, "dashboard.html"))

@app.get("/login.html")
def get_login_html():
    return FileResponse(os.path.join(ROOT_DIR, "login.html"))

@app.get("/register.html")
def get_register_html():
    return FileResponse(os.path.join(ROOT_DIR, "register.html"))

@app.get("/welcome.html")
def get_welcome_html():
    return FileResponse(os.path.join(ROOT_DIR, "welcome.html"))

@app.get("/styles.css")
def get_styles_css():
    return FileResponse(os.path.join(ROOT_DIR, "styles.css"), media_type="text/css")

@app.get("/dashboard.js")
def get_dashboard_js():
    return FileResponse(os.path.join(ROOT_DIR, "dashboard.js"), media_type="application/javascript")

@app.get("/api.js")
def get_api_js():
    return FileResponse(os.path.join(ROOT_DIR, "api.js"), media_type="application/javascript")

@app.get("/auth.js")
def get_auth_js():
    return FileResponse(os.path.join(ROOT_DIR, "auth.js"), media_type="application/javascript")

PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL", "http://localhost:8000")

# ==========================================
# 1-CLICK MONGODB ATLAS HEALTH CHECK ENDPOINT
# ==========================================

@app.get("/api/db-status")
async def get_db_status():
    """
    Intelligent Diagnostic Endpoint:
    Tests current URI, plus common Atlas variants (lowercase username, authSource=admin).
    """
    load_dotenv(override=True)
    original_uri = os.getenv("MONGODB_URI", "").strip()
    current_db = os.getenv("DB_NAME", "Karman")

    from motor.motor_asyncio import AsyncIOMotorClient

    # Candidates to test
    candidates = [
        ("As Configured in .env", original_uri)
    ]

    # Candidate 2: Try lowercase username if has uppercase
    if "Karman:" in original_uri:
        candidates.append(("Lowercase username 'karman'", original_uri.replace("Karman:", "karman:")))

    # Candidate 3: Add /admin?authSource=admin
    if "?authSource=admin" not in original_uri:
        sep = "&" if "?" in original_uri else "?"
        candidates.append(("With authSource=admin", f"{original_uri}{sep}authSource=admin"))

    # Candidate 4: Lowercase + authSource=admin
    if "Karman:" in original_uri and "?authSource=admin" not in original_uri:
        lower_uri = original_uri.replace("Karman:", "karman:")
        sep = "&" if "?" in lower_uri else "?"
        candidates.append(("Lowercase 'karman' + authSource=admin", f"{lower_uri}{sep}authSource=admin"))

    attempt_results = []
    for label, uri_to_test in candidates:
        try:
            test_client = AsyncIOMotorClient(uri_to_test, serverSelectionTimeoutMS=3000)
            await test_client.admin.command('ping')
            
            # If we reached here, this candidate SUCCEEDED!
            target_db = test_client[current_db]
            users_cnt = await target_db["users"].count_documents({})
            profiles_cnt = await target_db["profiles"].count_documents({})

            return {
                "status": "connected",
                "message": f"✅ Successfully connected to MongoDB Atlas using: {label}!",
                "working_uri": uri_to_test,
                "database_name": current_db,
                "collections": {
                    "users": users_cnt,
                    "profiles": profiles_cnt
                }
            }
        except Exception as e:
            attempt_results.append({
                "candidate": label,
                "error": str(e)
            })

    # If all failed
    return {
        "status": "error",
        "error_summary": "All credentials failed with 'bad auth'.",
        "attempts": attempt_results,
        "how_to_fix": [
            "1. Open https://cloud.mongodb.com -> Database Access",
            "2. Take a screenshot of your Database Users list, or tell me the exact username listed there.",
            "3. Click 'Add New Database User', enter username 'karman' and password 'karman123', then put that in .env."
        ]
    }



# ==========================================
# PYDANTIC SCHEMAS (DAY 1 PERSISTENCE)
# ==========================================


class UserProfile(BaseModel):
    user_id: str
    full_name: str
    phone_number: str
    education_level: str       # e.g., "10th Pass", "ITI Certified", "Graduate"
    district: str
    target_trade: str          # e.g., "Electrical", "Solar PV Installer", "Tailoring"
    years_experience: float
    current_status: str        # "Unemployed", "Informal Worker", "Student"
    preferred_language: Optional[str] = "English"

    class Config:
        extra = "allow"

class SkillSubmission(BaseModel):
    user_id: str
    skills_list: List[str]
    tools_handled: List[str]
    certifications: Optional[List[str]] = []

    class Config:
        extra = "allow"

class RegisterRequest(BaseModel):
    user_type: str = "student" # 'student', 'worker', 'officer'
    name: str
    identifier: str            # Email or Phone
    password: str
    phone: Optional[str] = ""
    district: Optional[str] = ""
    target_trade: Optional[str] = ""

class LoginRequest(BaseModel):
    user_type: str = "student"
    identifier: str
    password: str

class StudentResumeAnalysisRequest(BaseModel):
    resume_text: str
    target_role: str = "ai_ml_engineer"

class IntakeRequest(BaseModel):
    phone: str
    name: Optional[str] = "Beneficiary"
    district: Optional[str] = "District Command"
    user_query: str

class ResumeRequest(BaseModel):
    name: str
    phone: str
    district: str
    trade: str
    years_experience: str
    tools_owned: str

class ATSCheckRequest(BaseModel):
    resume_text: str
    target_trade: str

class BulletImproveRequest(BaseModel):
    original_text: str

# ==========================================
# DAY 1: PROFILES & SKILLS CRUD ENDPOINTS
# ==========================================

@app.post("/api/profile")
async def upsert_profile(profile: UserProfile):
    """
    Upserts user profile details into MongoDB Atlas 'profiles' collection.
    """
    data = profile.dict()
    data["updated_at"] = datetime.utcnow().isoformat()

    await profiles_collection.update_one(
        {"user_id": profile.user_id},
        {"$set": data},
        upsert=True
    )
    return {
        "status": "success",
        "message": "User profile successfully saved in MongoDB Atlas",
        "profile": data
    }

@app.get("/api/profile/{user_id}")
async def get_profile(user_id: str):
    """
    Fetches the persisted profile from MongoDB Atlas.
    """
    profile = await profiles_collection.find_one({"user_id": user_id}, {"_id": 0})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found in database")
    return profile

@app.post("/api/skills")
async def save_skills(submission: SkillSubmission):
    """
    Saves user skills and tools into MongoDB Atlas 'skills' collection.
    """
    data = submission.dict()
    data["updated_at"] = datetime.utcnow().isoformat()

    await skills_collection.update_one(
        {"user_id": submission.user_id},
        {"$set": data},
        upsert=True
    )
    return {
        "status": "success",
        "message": "Skills saved in MongoDB Atlas",
        "skills": data
    }

@app.get("/api/skills/{user_id}")
async def get_skills(user_id: str):
    """
    Retrieves verified skills for a user from MongoDB Atlas.
    """
    skills = await skills_collection.find_one({"user_id": user_id}, {"_id": 0})
    if not skills:
        return {"user_id": user_id, "skills_list": [], "tools_handled": [], "certifications": []}
    return skills

# ==========================================
# AUTHENTICATION WITH MONGODB ATLAS
# ==========================================

@app.post("/api/auth/register")
async def user_register(req: RegisterRequest):
    """
    Persists registered user in MongoDB and auto-creates an initial profile.
    """
    # Check if user already exists
    existing = await users_collection.find_one({"identifier": req.identifier})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account with this identifier already exists."
        )

    user_doc = {
        "user_id": req.identifier,
        "name": req.name,
        "identifier": req.identifier,
        "password": req.password,  # Note: Add bcrypt hashing for production
        "user_type": req.user_type,
        "created_at": datetime.utcnow().isoformat()
    }
    await users_collection.insert_one(user_doc)

    # Automatically create initial profile document
    initial_profile = {
        "user_id": req.identifier,
        "full_name": req.name,
        "phone_number": req.phone or "",
        "education_level": "Under Evaluation",
        "district": req.district or "General",
        "target_trade": req.target_trade or ("AI Engineer" if req.user_type == "student" else "Vocational Artisan"),
        "years_experience": 1.0 if req.user_type == "student" else 3.0,
        "current_status": "Student" if req.user_type == "student" else "Informal Worker",
        "updated_at": datetime.utcnow().isoformat()
    }
    await profiles_collection.update_one(
        {"user_id": req.identifier},
        {"$set": initial_profile},
        upsert=True
    )

    redirect_url = "/student/dashboard" if req.user_type == "student" else ("/worker/dashboard" if req.user_type == "worker" else "/dashboard")
    return {
        "status": "registered",
        "user_type": req.user_type,
        "user_id": req.identifier,
        "token": f"karman_jwt_token_{req.user_type}_atlas",
        "redirect_url": redirect_url,
        "user_profile": initial_profile
    }

@app.post("/api/auth/login")
async def user_login(req: LoginRequest):
    """
    Authenticates against MongoDB Atlas users collection.
    """
    user = await users_collection.find_one({"identifier": req.identifier})
    if not user or user.get("password") != req.password:
        raise HTTPException(status_code=401, detail="Invalid identifier or password")

    # Fetch fresh profile from MongoDB
    profile = await profiles_collection.find_one({"user_id": req.identifier}, {"_id": 0})
    user_type = user.get("user_type", req.user_type)
    redirect_url = "/student/dashboard" if user_type == "student" else ("/worker/dashboard" if user_type == "worker" else "/dashboard")

    return {
        "status": "authenticated",
        "user_type": user_type,
        "user_id": req.identifier,
        "token": f"karman_jwt_token_{user_type}_atlas",
        "redirect_url": redirect_url,
        "user_profile": profile or {
            "name": user.get("name"),
            "identifier": req.identifier,
            "role": user_type
        }
    }

# ==========================================
# INTAKE & SIMULATOR WITH MONGODB LOGGING
# ==========================================

@app.post("/api/simulate-intake")
async def simulate_intake(req: IntakeRequest):
    phone = req.phone.strip()
    result = process_beneficiary_query(
        user_query=req.user_query,
        phone_number=phone,
        name=req.name,
        district=req.district
    )
    pdf_path = generate_applicant_pdf(result)
    pdf_filename = os.path.basename(pdf_path)
    result["generated_pdf_url"] = f"{PUBLIC_BASE_URL}/static/{pdf_filename}"
    result["timestamp"] = datetime.utcnow().isoformat()

    # Persist applicant submission directly to MongoDB Atlas
    await applicants_collection.update_one(
        {"phone": phone},
        {"$set": result},
        upsert=True
    )
    return result

class N8nBotIntakeRequest(BaseModel):
    channel: str = "whatsapp"         # "whatsapp" or "telegram"
    sender_id: str                    # Phone number or Telegram chat_id
    sender_name: Optional[str] = "Beneficiary"
    message_text: str                 # User's query/voice-transcript
    district: Optional[str] = "Varanasi"

@app.post("/api/n8n/bot-intake")
async def n8n_bot_intake(req: N8nBotIntakeRequest):
    """
    Unified n8n bridge endpoint:
    Processes chat queries from WhatsApp/Telegram, runs RAG matching,
    persists records to MongoDB Atlas, and returns a formatted text reply with live PDF link.
    """
    phone = req.sender_id.strip()
    result = process_beneficiary_query(
        user_query=req.message_text,
        phone_number=phone,
        name=req.sender_name,
        district=req.district
    )
    pdf_path = generate_applicant_pdf(result)
    pdf_filename = os.path.basename(pdf_path)
    pdf_url = f"{PUBLIC_BASE_URL}/static/{pdf_filename}"

    result["channel"] = req.channel
    result["sender_id"] = req.sender_id
    result["generated_pdf_url"] = pdf_url
    result["timestamp"] = datetime.utcnow().isoformat()

    # Persist submission into MongoDB Atlas
    await applicants_collection.update_one(
        {"sender_id": req.sender_id},
        {"$set": result},
        upsert=True
    )

    nsqf_info = result.get("nsqf_mapping", {})
    pm_info = result.get("pm_ajay_eligibility", {})
    trade_name = result.get("extracted_skill", "Artisan Trade")
    role_name = nsqf_info.get("role", "Vocational Trade")
    level_name = nsqf_info.get("level", "NSQF Level 4")
    scheme_name = pm_info.get("grant_type", "PM-AJAY Grant")
    grant_amt = pm_info.get("eligible_amount", "Up to ₹50,000")

    formatted_reply = (
        f"Namaste {req.sender_name} 🙏\n\n"
        f"🏛️ *KARMAN AI Career & Government Support Roadmap*\n\n"
        f"✅ *Identified Trade:* {trade_name}\n"
        f"📜 *NSQF Qualification:* {role_name} ({level_name})\n"
        f"🎯 *Matched Scheme:* {scheme_name}\n"
        f"💰 *Eligible Financial Grant:* {grant_amt}\n\n"
        f"📑 *Your 5-Page Personalized Action Roadmap (PDF):*\n"
        f"👉 {pdf_url}\n\n"
        f"💡 *KARMAN Tip:* {result.get('karman_tip', 'Your skills are recognized under National Standards!')}"
    )

    return {
        "status": "success",
        "reply_text": formatted_reply,
        "pdf_url": pdf_url,
        "pdf_filename": pdf_filename,
        "data": result
    }

@app.get("/api/applicants")
async def get_all_applicants(limit: int = 50):
    """
    Live sync endpoint:
    Returns the real-time stream of all applicants registered via WhatsApp, Telegram, or Web.
    """
    cursor = applicants_collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit)
    records = await cursor.to_list(length=limit)
    return records



# ==========================================
# EXISTING ATS, RESUME & NEWSROOM APIS
# ==========================================

STUDENT_ROLE_REQUIREMENTS = {
    "ai_ml_engineer": {
        "title": "AI / ML Engineer",
        "required_skills": ["Python", "SQL", "Git", "Machine Learning", "Deep Learning", "FastAPI", "Docker", "RAG / LLMs", "Cloud"],
        "recommended_project": {
            "title": "RAG Document Assistant API",
            "skills_gained": ["RAG", "LLMs", "Vector DB", "FastAPI", "Docker"],
            "difficulty": "Intermediate",
            "estimated_time": "2 Weeks",
            "gap_closed": "Closes deployment and LLM retrieval gaps"
        }
    },
    "full_stack_developer": {
        "title": "Full-Stack Developer",
        "required_skills": ["JavaScript/React", "Node.js", "Python", "REST APIs", "PostgreSQL", "Docker", "CI/CD"],
        "recommended_project": {
            "title": "Real-time Microservices Task Engine",
            "skills_gained": ["Docker", "REST APIs", "React", "PostgreSQL"],
            "difficulty": "Intermediate",
            "estimated_time": "2 Weeks",
            "gap_closed": "Closes microservices and containerization gaps"
        }
    }
}

@app.post("/api/student/analyze-resume")
def analyze_student_resume(req: StudentResumeAnalysisRequest):
    text_lower = req.resume_text.lower()
    role_key = req.target_role if req.target_role in STUDENT_ROLE_REQUIREMENTS else "ai_ml_engineer"
    role_spec = STUDENT_ROLE_REQUIREMENTS[role_key]

    required = role_spec["required_skills"]
    matched = [s for s in required if any(w in text_lower for w in s.lower().split())]
    missing = [s for s in required if s not in matched]

    score = int((len(matched) / max(len(required), 1)) * 100)
    score = min(92, max(45, score + 18))

    return {
        "target_role": role_spec["title"],
        "career_readiness_score": score,
        "matched_skills": matched if matched else ["Python", "Git"],
        "missing_skills": missing if missing else ["Deep Learning", "Docker", "RAG / LLMs"],
        "profile_summary": {
            "education": "Good Foundation",
            "technical_skills": f"{len(matched)} / {len(required)} Matched",
            "projects_completed": 2,
            "experience": "1 Internship"
        },
        "next_step_recommendation": role_spec["recommended_project"]
    }

@app.post("/api/student/improve-bullet")
def improve_bullet(req: BulletImproveRequest):
    orig = req.original_text.strip()
    if "chatbot" in orig.lower() or "python" in orig.lower():
        suggested = "Developed a document-based conversational assistant using Python and retrieval techniques to provide contextual responses."
    elif "model" in orig.lower() or "ml" in orig.lower():
        suggested = "Architected and evaluated supervised machine learning models in Python, achieving 89% precision on validation sets."
    else:
        suggested = f"Engineered and deployed {orig} utilizing industry-standard software engineering practices."
    return {"original": orig, "suggested": suggested}

@app.get("/api/student/career-roadmap")
def get_student_roadmap(role: str = "ai_ml_engineer"):
    return {
        "target_role": "AI / ML Engineer",
        "roadmap_stages": [
            {"stage": "STAGE 1 · COMPLETED", "status": "completed", "title": "Core Programming & Data Foundations", "items": ["Python Fundamentals", "SQL", "Git Workflows"], "duration": "3 Weeks"},
            {"stage": "STAGE 2 · IN PROGRESS", "status": "in_progress", "title": "Applied Machine Learning", "items": ["Scikit-learn", "Pandas", "Model Metrics"], "duration": "4 Weeks"},
            {"stage": "STAGE 3 · UPCOMING", "status": "upcoming", "title": "Deep Learning & Neural Networks", "items": ["PyTorch", "Transformers"], "duration": "4 Weeks"},
            {"stage": "STAGE 4 · UPCOMING", "status": "upcoming", "title": "RAG Architecture & Vector Stores", "items": ["ChromaDB", "LangChain", "FastAPI"], "duration": "3 Weeks"},
            {"stage": "STAGE 5 · CAPSTONE", "status": "upcoming", "title": "Model Serving & Cloud Deployment", "items": ["Docker", "AWS Deploy"], "duration": "2 Weeks"}
        ]
    }

@app.post("/api/generate-resume")
def build_skill_resume(req: ResumeRequest):
    data = req.dict()
    data["nsqf_level"] = "NSQF Level 4"
    data["qp_code"] = "AMH/Q0301 (Apparel Sector)"
    data["grant_type"] = "PM-AJAY Micro-Enterprise Grant"
    data["grant_amount"] = "₹50,000 Assistance"
    pdf_path = generate_skill_resume_pdf(data)
    data["pdf_url"] = f"{PUBLIC_BASE_URL}/static/{os.path.basename(pdf_path)}"
    return data

@app.post("/api/ats-checker")
def check_ats_resume(req: ATSCheckRequest):
    return {
        "ats_score": 82,
        "nsqf_role": "Field Technician - Wireman (ELE/Q6301)",
        "nsqf_level": "NSQF Level 4",
        "recommended_scheme": "PM-Vishwakarma Toolkit Grant",
        "matching_keywords": ["wiring", "earthing", "multimeter"],
        "missing_keywords": ["conduit layout", "megger test"]
    }

# ==========================================
# LIVE SCHEME NEWSROOM APIS
# ==========================================
@app.get("/api/worker/newsroom")
def get_worker_newsroom():
    """Returns live government scheme news & policy releases."""
    return get_live_scheme_news()

@app.get("/api/newsroom")
def get_newsroom_feed():
    """Returns structured live newsroom feed with metadata."""
    items = get_live_scheme_news()
    return {
        "status": "success",
        "count": len(items),
        "source": "live_government_feeds",
        "items": items
    }

@app.post("/api/worker/newsroom/refresh")
@app.post("/api/newsroom/refresh")
def force_refresh_newsroom():
    """Forces an immediate re-fetch of government scheme feeds."""
    return refresh_scheme_news_cache()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)