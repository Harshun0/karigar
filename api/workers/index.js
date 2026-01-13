import { connectToDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { service, pincode } = req.query;
    
    const { db } = await connectToDatabase();
    const workersCollection = db.collection('workers');
    let query = {};
    
    if (service) {
      query.service = service;
    }

    if (pincode) {
      query.pincode = pincode;
    }
    
    const workers = await workersCollection.find(query).toArray();
    
    res.json({
      success: true,
      workers: workers
    });
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching workers',
      error: error.message
    });
  }
}
