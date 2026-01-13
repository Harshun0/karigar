import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/';

console.log('Testing MongoDB connection with different options...');

async function testConnection() {
  let client;
  
  const testCases = [
    {
      name: 'Default options',
      options: {}
    },
    {
      name: 'Explicit TLS',
      options: {
        ssl: true,
        tls: true
      }
    },
    {
      name: 'TLS with version specification',
      options: {
        ssl: true,
        tls: true,
        tlsVersion: 'TLSv1_2'
      }
    },
    {
      name: 'Relaxed SSL',
      options: {
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true
      }
    },
    {
      name: 'No SSL (if possible)',
      options: {
        ssl: false
      }
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n🔄 Testing: ${testCase.name}`);
      console.log('Options:', testCase.options);
      
      client = new MongoClient(MONGODB_URI, testCase.options);
      await client.connect();
      
      console.log('✅ Connected successfully!');
      
      const db = client.db('kaarigar');
      await db.admin().ping();
      console.log('✅ Database ping successful!');
      
      await client.close();
      console.log('✅ Connection closed successfully');
      
      // If we get here, we found a working configuration
      console.log(`\n🎉 WORKING CONFIGURATION: ${testCase.name}`);
      console.log('Options:', JSON.stringify(testCase.options, null, 2));
      return;
      
    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
      if (client) {
        try {
          await client.close();
        } catch (closeError) {
          // Ignore close errors
        }
      }
    }
  }
  
  console.log('\n❌ All connection attempts failed');
  
  // Try to diagnose the issue further
  console.log('\n🔍 Additional diagnostics:');
  console.log('Node.js version:', process.version);
  console.log('MongoDB driver version:', require('mongodb/package.json').version);
  
  // Test basic network connectivity
  try {
    const https = require('https');
    const url = new URL(MONGODB_URI);
    console.log(`Testing connectivity to ${url.hostname}...`);
    
    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 5000
    }, (res) => {
      console.log(`✅ Network connectivity OK (HTTP ${res.statusCode})`);
    });
    
    req.on('error', (err) => {
      console.error(`❌ Network connectivity failed: ${err.message}`);
    });
    
    req.on('timeout', () => {
      console.error('❌ Network timeout');
      req.destroy();
    });
    
    req.end();
  } catch (netError) {
    console.error(`❌ Network test failed: ${netError.message}`);
  }
}

testConnection();
