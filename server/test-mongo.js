import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/';

console.log('Testing MongoDB connection...');
console.log('URI:', MONGODB_URI.replace(/:([^:@]+)@/, ':***@')); // Hide password

async function testConnection() {
  let client;
  try {
    // Test with different SSL/TLS options
    const options = {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    };

    console.log('Attempting connection with SSL options:', options);
    
    client = new MongoClient(MONGODB_URI, options);
    await client.connect();
    
    console.log('✅ Connected successfully!');
    
    // Test database access
    const db = client.db('kaarigar');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error cause:', error.cause);
    
    // Try with relaxed SSL settings
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n🔄 Trying with relaxed SSL settings...');
      try {
        const relaxedOptions = {
          ssl: true,
          tls: true,
          tlsAllowInvalidCertificates: true,
          tlsAllowInvalidHostnames: true,
          serverSelectionTimeoutMS: 5000
        };
        
        client = new MongoClient(MONGODB_URI, relaxedOptions);
        await client.connect();
        console.log('✅ Connected with relaxed SSL settings!');
      } catch (relaxedError) {
        console.error('❌ Even relaxed settings failed:', relaxedError.message);
      }
    }
  } finally {
    if (client) {
      await client.close();
      console.log('Connection closed');
    }
  }
}

testConnection();
