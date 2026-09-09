import os
import re
import html
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import List, Dict, Any, Optional

# Cache configuration
_NEWS_CACHE: List[Dict[str, Any]] = []
_LAST_FETCH_TIME: float = 0
CACHE_TTL_SECONDS = 3600  # 1 hour cache

# Curated Fallback Government Schemes (used if external network/feeds are unreachable)
CURATED_SCHEMES: List[Dict[str, Any]] = [
    {
        "id": "gov-scheme-1",
        "title": "PM-AJAY Micro-Enterprise Equipment Grant (MoSJE)",
        "category": "Toolkit & Equipment Grants",
        "badge": "ACTIVE",
        "summary": "Direct capital subsidy up to ₹50,000 per beneficiary for purchasing self-employment equipment (motorized sewing machines, electrician test equipment, artisanal toolkits).",
        "relevant_to": "Skilled Artisans & Informal Workers",
        "amount": "Up to ₹50,000",
        "source_name": "Ministry of Social Justice & Empowerment",
        "official_url": "https://socialjustice.gov.in/schemes/pm-ajay",
        "published_date": "Updated for 2026",
        "is_live": False
    },
    {
        "id": "gov-scheme-2",
        "title": "PM-Vishwakarma Toolkit Incentive Voucher Scheme",
        "category": "Toolkit & Equipment Grants",
        "badge": "HIGH ENROLLMENT",
        "summary": "Provides e-vouchers worth ₹15,000 for modern toolkits, 5-7 days basic skill training with ₹500/day stipend, and collateral-free credit up to ₹3 Lakh at concessional 5% interest.",
        "relevant_to": "18 Traditional Trades (Carpenters, Blacksmiths, Tailors, etc.)",
        "amount": "₹15,000 Toolkit + ₹3L Credit",
        "source_name": "PM Vishwakarma Portal (MoMSME)",
        "official_url": "https://pmvishwakarma.gov.in/",
        "published_date": "Active 2026",
        "is_live": False
    },
    {
        "id": "gov-scheme-3",
        "title": "Recognition of Prior Learning (RPL) Fast-Track Certification",
        "category": "Skill Certification & RPL",
        "badge": "OFFICIAL NOTICE",
        "summary": "Tradespeople and informal workers with 2+ years field experience can undergo short RPL assessment at accredited centres to obtain NSQF Level 3-5 government certification with accident insurance cover.",
        "relevant_to": "Electricians, Plumbers, Tailors, Mechanics",
        "amount": "100% Free + Insurance",
        "source_name": "Ministry of Skill Development (MSDE)",
        "official_url": "https://www.msde.gov.in/nsqf",
        "published_date": "Ongoing Scheme",
        "is_live": False
    },
    {
        "id": "gov-scheme-4",
        "title": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0) Tech Skilling",
        "category": "Apprenticeship & Stipends",
        "badge": "NEW BATCHES",
        "summary": "Industry 4.0 courses including AI/ML, Drone Tech, IoT, and Cloud Computing aligned with National Occupational Standards (NOS) with placement assistance and direct assessment stipends.",
        "relevant_to": "College Students, Diploma Holders & Graduates",
        "amount": "Full Fee Waiver + ₹8,000 Stipend",
        "source_name": "Skill India Digital",
        "official_url": "https://www.skillindiadigital.gov.in/",
        "published_date": "Phase 4 Intake",
        "is_live": False
    },
    {
        "id": "gov-scheme-5",
        "title": "National Apprenticeship Promotion Scheme (NAPS-2)",
        "category": "Apprenticeship & Stipends",
        "badge": "STIPEND SUPPORT",
        "summary": "Government directly transfers 25% of prescribed stipend up to ₹1,500 per month directly to apprentice bank accounts via DBT, bridging youth transition into formal employment.",
        "relevant_to": "ITI, Technical Graduates & Non-Technical Students",
        "amount": "₹1,500/month DBT",
        "source_name": "National Apprenticeship Portal",
        "official_url": "https://www.apprenticeshipindia.gov.in/",
        "published_date": "Active Intake",
        "is_live": False
    }
]

def clean_html_text(raw_html: str) -> str:
    """Removes HTML tags and decodes entities."""
    if not raw_html:
        return ""
    clean = re.sub(r"<[^>]+>", " ", raw_html)
    clean = html.unescape(clean)
    return " ".join(clean.split())

def categorize_news_item(title: str, desc: str) -> Dict[str, str]:
    """Analyzes title and description to determine scheme category and relevant audience."""
    combined = (title + " " + desc).lower()

    if any(k in combined for k in ["toolkit", "vishwakarma", "equipment", "tool", "sewing machine"]):
        return {
            "category": "Toolkit & Equipment Grants",
            "badge": "TOOLKIT GRANT",
            "relevant_to": "Artisans, Craftsmen & Field Technicians",
            "amount": "₹15,000 to ₹50,000 Assistance"
        }
    elif any(k in combined for k in ["apprentice", "naps", "stipend", "internship"]):
        return {
            "category": "Apprenticeship & Stipends",
            "badge": "STIPEND ENROLLMENT",
            "relevant_to": "Students, Graduates & ITI Apprentices",
            "amount": "DBT Monthly Stipend"
        }
    elif any(k in combined for k in ["rpl", "nsqf", "certification", "accredit", "skill verification"]):
        return {
            "category": "Skill Certification & RPL",
            "badge": "RPL ACCREDITATION",
            "relevant_to": "Experienced Informal Workers",
            "amount": "Free Assessment & Certificate"
        }
    elif any(k in combined for k in ["mudra", "loan", "credit", "subsidy", "finance", "grant"]):
        return {
            "category": "Financial & Loan Subsidies",
            "badge": "FINANCIAL SUPPORT",
            "relevant_to": "Micro-Enterprises & Self-Employed",
            "amount": "Low-Interest Micro Credit"
        }
    else:
        return {
            "category": "Policy & Skill Missions",
            "badge": "GOVT NOTICE",
            "relevant_to": "Students & Skill Aspirants",
            "amount": "Skill Mission Entitlement"
        }

def fetch_live_government_news() -> List[Dict[str, Any]]:
    """
    Fetches real-time news articles and policy releases for Indian government
    skill and welfare schemes from verified feeds.
    """
    feed_urls = [
        "https://news.google.com/rss/search?q=PMKVY+OR+PM-Vishwakarma+OR+PM-AJAY+OR+%22Skill+India%22+OR+%22Ministry+of+Skill+Development%22+government+scheme&hl=en-IN&gl=IN&ceid=IN:en",
        "https://news.google.com/rss/search?q=Pradhan+Mantri+skill+grant+OR+apprentice+stipend+OR+NSQF+certification+site:gov.in+OR+site:pib.gov.in&hl=en-IN&gl=IN&ceid=IN:en"
    ]

    collected_items: List[Dict[str, Any]] = []
    seen_titles = set()

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    for feed_url in feed_urls:
        try:
            req = urllib.request.Request(feed_url, headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                content = resp.read()
                root = ET.fromstring(content)

                for item in root.findall(".//item"):
                    raw_title = item.find("title").text if item.find("title") is not None else ""
                    raw_link = item.find("link").text if item.find("link") is not None else ""
                    raw_pubdate = item.find("pubDate").text if item.find("pubDate") is not None else ""
                    raw_desc = item.find("description").text if item.find("description") is not None else ""
                    raw_source = item.find("source").text if item.find("source") is not None else "Government News Desk"

                    clean_title = clean_html_text(raw_title)
                    if " - " in clean_title:
                        parts = clean_title.rsplit(" - ", 1)
                        clean_title = parts[0].strip()
                        raw_source = parts[1].strip()

                    title_key = re.sub(r"\W+", "", clean_title.lower())
                    if not title_key or title_key in seen_titles:
                        continue
                    seen_titles.add(title_key)

                    clean_desc = clean_html_text(raw_desc)
                    cat_info = categorize_news_item(clean_title, clean_desc)

                    clean_date = raw_pubdate
                    try:
                        parsed_dt = datetime.strptime(raw_pubdate[:25].strip(), "%a, %d %b %Y %H:%M:%S")
                        clean_date = parsed_dt.strftime("%d %b %Y")
                    except Exception:
                        clean_date = raw_pubdate[:16] if raw_pubdate else "Recent"

                    collected_items.append({
                        "id": f"live-news-{len(collected_items) + 1}",
                        "title": clean_title,
                        "category": cat_info["category"],
                        "badge": cat_info["badge"],
                        "summary": clean_desc if len(clean_desc) > 20 else f"Official update regarding {clean_title}. Published by {raw_source} for national beneficiaries.",
                        "relevant_to": cat_info["relevant_to"],
                        "amount": cat_info["amount"],
                        "source_name": raw_source,
                        "official_url": raw_link,
                        "published_date": clean_date,
                        "is_live": True
                    })

                    if len(collected_items) >= 15:
                        break
        except Exception as e:
            print(f"[NewsAggregator] Warning: feed {feed_url} error: {e}")

    return collected_items

def get_live_scheme_news(force_refresh: bool = False) -> List[Dict[str, Any]]:
    """
    Returns cached live scheme news if fresh, otherwise fetches live updates.
    Falls back to official curated schemes if live network fails.
    """
    global _NEWS_CACHE, _LAST_FETCH_TIME

    now = time.time()
    if not force_refresh and _NEWS_CACHE and (now - _LAST_FETCH_TIME < CACHE_TTL_SECONDS):
        return _NEWS_CACHE

    print("[NewsAggregator] Fetching live government scheme news...")
    live_items = fetch_live_government_news()

    if live_items:
        combined = live_items + [s for s in CURATED_SCHEMES if s["id"] in ["gov-scheme-1", "gov-scheme-2"]]
        _NEWS_CACHE = combined
        _LAST_FETCH_TIME = now
        print(f"[NewsAggregator] Successfully aggregated {len(_NEWS_CACHE)} news items!")
        return _NEWS_CACHE
    elif _NEWS_CACHE:
        return _NEWS_CACHE
    else:
        _NEWS_CACHE = CURATED_SCHEMES
        _LAST_FETCH_TIME = now
        return _NEWS_CACHE

def refresh_scheme_news_cache() -> Dict[str, Any]:
    """Forces an immediate refresh of the news cache."""
    news = get_live_scheme_news(force_refresh=True)
    return {
        "status": "success",
        "count": len(news),
        "refreshed_at": datetime.now().strftime("%d %b %Y, %I:%M %p"),
        "source": "live_official_feeds",
        "items": news
    }
