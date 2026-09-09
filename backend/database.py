import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv(override=True)

logger = logging.getLogger("karman_database")
logging.basicConfig(level=logging.INFO)

# Retrieve MongoDB URI from environment or default to local fallback
MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb://localhost:27017/Karman"
)
DB_NAME = os.getenv("DB_NAME", "Karman")

# Initialize Motor Async Client
client = AsyncIOMotorClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000  # 5-second timeout for rapid failover / diagnostic
)
db = client[DB_NAME]

# Unified Collections
users_collection = db["users"]          # Authentication credentials & roles
profiles_collection = db["profiles"]    # User profile & demographic details
skills_collection = db["skills"]        # Verified trade skills & tools
applicants_collection = db["applicants"]# RAG intake submissions & generated PDFs

async def init_db_indexes():
    """
    Ensures unique and query-optimized indexes exist in MongoDB Atlas.
    """
    try:
        # Unique index on user identifiers
        await users_collection.create_index("identifier", unique=True)
        # Unique index on user_id for profiles & skills
        await profiles_collection.create_index("user_id", unique=True)
        await skills_collection.create_index("user_id", unique=True)
        logger.info("✅ MongoDB Atlas indexes successfully initialized.")
    except Exception as e:
        logger.warning(f"⚠️ Index initialization warning (check Atlas connection): {e}")

async def check_db_connection() -> bool:
    """
    Pings the MongoDB Atlas cluster to verify connection health.
    """
    try:
        await client.admin.command('ping')
        logger.info("✅ Successfully connected to MongoDB Atlas!")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to connect to MongoDB Atlas: {e}")
        return False