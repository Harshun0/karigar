import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/';

console.log('Testing MongoDB Atlas connection...');
console.log('URI:', MONGODB_URI.replace(/:([^:@]+)@/, ':***@'));

async function testConnection() {
  let client;
  
  // Test configurations that work with MongoDB Atlas
  const testCases = [
    {
      name: 'Atlas Recommended Settings',
      options: {
        ssl: true,
        tls: true,
        tlsVersion: 'TLSv1_2',
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000
      }
    },
    {
      name: 'Atlas with Retry Writes',
      options: {
        ssl: true,
        tls: true,
        tlsVersion: 'TLSv1_2',
        retryWrites: true,
        w: 'majority',
        serverSelectionTimeoutMS: 5000
      }
    },
    {
      name: 'Minimal SSL',
      options: {
        ssl: true
      }
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n🔄 Testing: ${testCase.name}`);
      
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
      console.log('Options:', JSON.stringify(testCase.options, null, 2));
      return testCase.options;
      
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
  return null;
}

testConnection().then(workingOptions => {
  if (workingOptions) {
    console.log('\n📝 Update your server code with these options:');
    console.log('const client = new MongoClient(MONGODB_URI, ', JSON.stringify(workingOptions, null, 2), ');');
  }
});
