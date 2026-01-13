import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/';

console.log('Testing MongoDB Atlas connection with corrected options...');

async function testConnection() {
  let client;
  
  // Corrected test configurations for MongoDB Atlas
  const testCases = [
    {
      name: 'Atlas Standard',
      options: {
        ssl: true,
        tls: true,
        retryWrites: true,
        w: 'majority'
      }
    },
    {
      name: 'Atlas with Timeout',
      options: {
        ssl: true,
        tls: true,
        retryWrites: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000
      }
    },
    {
      name: 'Relaxed SSL (for testing)',
      options: {
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true
      }
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n🔄 Testing: ${testCase.name}`);
      console.log('Options:', JSON.stringify(testCase.options, null, 2));
      
      client = new MongoClient(MONGODB_URI, testCase.options);
      await client.connect();
      
      console.log('✅ Connected successfully!');
      
      // Test database operations
      const db = client.db('kaarigar');
      await db.admin().ping();
      console.log('✅ Database ping successful!');
      
      const collections = await db.listCollections().toArray();
      console.log('Collections:', collections.map(c => c.name));
      
      await client.close();
      
      console.log(`\n🎉 WORKING CONFIGURATION: ${testCase.name}`);
      return testCase.options;
      
    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
      if (error.code) {
        console.error(`Error code: ${error.code}`);
      }
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
  return null;
}

testConnection().then(workingOptions => {
  if (workingOptions) {
    console.log('\n📝 Apply these options to your server/index.js:');
    console.log('// Replace line 25 in index.js:');
    console.log('client = new MongoClient(MONGODB_URI, ', JSON.stringify(workingOptions, null, 2), ');');
  } else {
    console.log('\n🔍 Alternative solutions:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify the database user permissions');
    console.log('3. Try updating MongoDB driver: npm update mongodb');
    console.log('4. Check if your network/firewall blocks MongoDB Atlas');
  }
});
