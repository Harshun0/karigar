import { connectToDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Connecting to database...');
    const { db } = await connectToDatabase();
    console.log('Database connected successfully');
    
    const workersCollection = db.collection('workers');
    const { service, pincode } = req.query;
    
    let query = {};
    if (service) query.service = service;
    if (pincode) query.pincode = pincode;
    
    console.log('Querying workers with:', query);
    const workers = await workersCollection.find(query).toArray();
    console.log(`Found ${workers.length} workers`);
    
    res.json({
      success: true,
      workers: workers
    });
  } catch (error) {
    console.error('Error in workers API:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    res.status(500).json({
      success: false,
      message: 'Error fetching workers',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
