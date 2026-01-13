import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'kaarigar';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error details:', error);
    console.error('MONGODB_URI present:', !!MONGODB_URI);
    console.error('MONGODB_URI length:', MONGODB_URI?.length || 0);
    throw new Error('Database connection failed');
  }
}

export { ObjectId };
