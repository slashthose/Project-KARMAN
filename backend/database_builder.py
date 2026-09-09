import os
import json
import re
from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
CHROMA_DIR = os.path.join(os.path.dirname(__file__), "chroma_db")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(CHROMA_DIR, exist_ok=True)

INDEX_FILE = os.path.join(CHROMA_DIR, "vector_index.json")

# Core PM-AJAY Policy Data for sample PDF generation & indexing
PM_AJAY_POLICY_TEXT = """
PRADHAN MANTRI ANUSUCHIT JAATI ABHYUDAY YOJANA (PM-AJAY) GUIDELINES 2024-25

Section 1: Scheme Overview & Objectives
PM-AJAY aims to reduce poverty of Scheduled Caste (SC) communities through skill development, infrastructure creation, and direct financial assistance for income-generating micro-enterprises.

Section 2: Grant-in-Aid (GIA) Component & Micro-Enterprise Equipment
Under Section 4.2 (GIA Micro-Enterprises), financial assistance up to Rs. 50,000 per beneficiary is provided directly for purchasing self-employment tools and machinery.
- Micro-Enterprise Equipment Grant: Covers motorized sewing machines, tailoring toolkits, artisan kits, and small equipment.
- Eligibility: SC households with annual family income below Rs. 2.50 Lakh, possessing basic vocational aptitude.

Section 3: Skill Development & RPL (Recognition of Prior Learning)
Skill training is implemented through ITIs, PMKKs, and NSDC training centers aligned with the National Skills Qualifications Framework (NSQF).
- RPL (Recognition of Prior Learning): Informal workers with pre-existing skills (e.g. self-taught tailors, uncertified mechanics) are assessed directly for NSQF certification within 3 to 5 days without full course requirements.
- Stipend & Certification: Beneficiaries undergoing RPL receive an official NSQF Certificate and digital skill badge.

Section 4: Infrastructure & Skill Center Assistance
Grants are allocated for setting up Common Facility Centers (CFCs), District Skill Labs, and Tool Rooms to support rural artisans.
"""

NSQF_POLICY_TEXT = """
NATIONAL SKILLS QUALIFICATIONS FRAMEWORK (NSQF) STANDARD MANUAL

Job Role 1: Sewing Machine Operator (Apparel, Made-Ups & Home Furnishing Sector)
- Qualification Pack Code: AMH/Q0301
- NSQF Level: Level 4
- Description: Performs basic stitching, operates single/double needle motorized sewing machines, handles fabric alignment and quality checks.
- RPL Eligibility: Recommended for individuals with >6 months informal experience in tailoring/sewing.

Job Role 2: Two Wheeler Service Technician (Automotive Sector)
- Qualification Pack Code: ASC/Q1401
- NSQF Level: Level 4
- Description: Diagnoses engine faults, services electrical systems, overhauls two-wheeler motor vehicles.
- RPL Eligibility: Recommended for informal mechanics with >1 year practical repair experience.

Job Role 3: Solar Panel Installation Technician (Green Jobs Sector)
- Qualification Pack Code: SGJ/Q0101
- NSQF Level: Level 4
- Description: Assembles solar PV modules, mounts rooftop arrays, connects charge controllers.
- RPL Eligibility: Recommended for ITI electrics graduates or experienced field electricians.
"""

def generate_sample_pdfs():
    """Generates official-looking sample PDFs in backend/data if not present."""
    styles = getSampleStyleSheet()
    p_style = ParagraphStyle('PdfText', parent=styles['Normal'], fontSize=10, leading=14)
    
    # 1. PM-AJAY Guidelines PDF
    pm_ajay_pdf_path = os.path.join(DATA_DIR, "PM-AJAY_Guidelines_2024_25.pdf")
    if not os.path.exists(pm_ajay_pdf_path):
        doc = SimpleDocTemplate(pm_ajay_pdf_path, pagesize=letter)
        story = []
        for line in PM_AJAY_POLICY_TEXT.strip().split("\n\n"):
            story.append(Paragraph(line.replace("\n", "<br/>"), p_style))
            story.append(Spacer(1, 10))
        doc.build(story)
        print(f"Generated sample PDF: {pm_ajay_pdf_path}")
        
    # 2. NSQF Standard Manual PDF
    nsqf_pdf_path = os.path.join(DATA_DIR, "NSQF_Qualification_Pack_Manual.pdf")
    if not os.path.exists(nsqf_pdf_path):
        doc = SimpleDocTemplate(nsqf_pdf_path, pagesize=letter)
        story = []
        for line in NSQF_POLICY_TEXT.strip().split("\n\n"):
            story.append(Paragraph(line.replace("\n", "<br/>"), p_style))
            story.append(Spacer(1, 10))
        doc.build(story)
        print(f"Generated sample PDF: {nsqf_pdf_path}")

def build_vector_database():
    """Parses all PDFs in data/ and builds a structured local vector index."""
    generate_sample_pdfs()
    
    documents_index = []
    pdf_files = [f for f in os.listdir(DATA_DIR) if f.endswith('.pdf')]
    
    for pdf_file in pdf_files:
        pdf_path = os.path.join(DATA_DIR, pdf_file)
        try:
            reader = PdfReader(pdf_path)
            for page_num, page in enumerate(reader.pages, start=1):
                text = page.extract_text() or ""
                # Split text into paragraphs/chunks
                chunks = [c.strip() for c in text.split("\n\n") if len(c.strip()) > 30]
                for idx, chunk in enumerate(chunks):
                    documents_index.append({
                        "id": f"{pdf_file}_p{page_num}_c{idx}",
                        "source_document": pdf_file,
                        "page": page_num,
                        "content": chunk,
                        "keywords": list(set(re.findall(r'\b[a-zA-Z]{4,}\b', chunk.lower())))
                    })
        except Exception as e:
            print(f"Error reading {pdf_file}: {e}")
            
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(documents_index, f, indent=2)
        
    print(f"Vector Database built successfully with {len(documents_index)} chunks saved to {INDEX_FILE}")
    return documents_index

if __name__ == "__main__":
    build_vector_database()
