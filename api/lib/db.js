import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/kaarigar?ssl=true&retryWrites=false&w=majority';
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
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: false,
      readPreference: 'primary',
    });
    
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
    if (cachedClient) {
      try {
        await cachedClient.close();
      } catch (closeError) {
        console.error('Error closing MongoDB connection:', closeError);
      }
      cachedClient = null;
      cachedDb = null;
    }
    
    throw error;
  }
}

export { ObjectId };
