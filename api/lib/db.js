import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'kaarigar';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    try {
      // Verify the connection is still alive
      await cachedClient.db().admin().ping();
      return { client: cachedClient, db: cachedDb };
    } catch (error) {
      // Connection is stale, reset cache
      cachedClient = null;
      cachedDb = null;
    }
  }

  try {
    // Create new client with minimal options
    const client = new MongoClient(MONGODB_URI);
    
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed: ' + error.message);
  }
}

export { ObjectId };
