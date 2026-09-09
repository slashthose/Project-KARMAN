import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "")
DB_NAME = os.getenv("DB_NAME", "Karman")

print("=" * 60)
print("🔍 Testing MongoDB Atlas Connection...")
print("=" * 60)
print(f"📁 Target Database: {DB_NAME}")
# Mask password for display
masked_uri = MONGODB_URI
if "@" in masked_uri:
    prefix = masked_uri.split("@")[0]
    suffix = masked_uri.split("@")[1]
    if ":" in prefix:
        user = prefix.split("://")[1].split(":")[0]
        masked_uri = f"mongodb+srv://{user}:******@{suffix}"
print(f"🌐 Cluster URI: {masked_uri}")
print("-" * 60)

async def test_connection():
    if not MONGODB_URI:
        print("❌ ERROR: MONGODB_URI is empty in backend/.env!")
        return

    try:
        client = AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        # Ping
        await client.admin.command('ping')
        print("✅ SUCCESS: Successfully reached MongoDB Atlas!")
        
        db = client[DB_NAME]
        collections = await db.list_collection_names()
        print(f"📊 Collections in '{DB_NAME}': {collections if collections else '[] (No collections created yet)'}")

        # Check document counts
        for col_name in ["users", "profiles", "skills", "applicants"]:
            count = await db[col_name].count_documents({})
            print(f"   • {col_name}: {count} documents")

        print("=" * 60)
        print("🎉 Your backend is ready and data persistence is live!")
        print("=" * 60)
    except Exception as e:
        print(f"❌ FAILED to connect: {e}")
        print("\n🔧 Common fixes:")
        print("1. Log in to cloud.mongodb.com -> Network Access -> Add IP Address -> Select 'Allow Access from Anywhere (0.0.0.0/0)'.")
        print("2. Check Database Access -> Make sure user 'Karman' has Read and Write privileges.")
        print("=" * 60)

if __name__ == "__main__":
    asyncio.run(test_connection())
