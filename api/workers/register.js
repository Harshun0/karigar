import { connectToDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const workerData = req.body;
    
    // Validate required fields
    if (!workerData.name || !workerData.phone || !workerData.email || !workerData.service || !workerData.location || !workerData.fullAddress || !workerData.pincode || !workerData.perDayCharges) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields including full address and pincode' 
      });
    }

    // Validate pincode is 6 digits
    if (!/^\d{6}$/.test(workerData.pincode)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Pincode must be 6 digits' 
      });
    }

    // Validate perDayCharges is a number and positive
    if (typeof workerData.perDayCharges !== 'number' || workerData.perDayCharges <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Per day charges must be a positive number' 
      });
    }

    // Add timestamp
    workerData.createdAt = new Date();
    workerData.status = 'pending';

    const { db } = await connectToDatabase();
    const workersCollection = db.collection('workers');
    const result = await workersCollection.insertOne(workerData);

    res.status(201).json({
      success: true,
      message: 'Worker registered successfully',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error registering worker:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering worker',
      error: error.message
    });
  }
}
