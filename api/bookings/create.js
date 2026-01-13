import { connectToDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const bookingData = req.body;
    
    // Validate required fields - updated to use startDate and endDate
    if (!bookingData.workerId || !bookingData.userId || !bookingData.startDate || !bookingData.endDate || !bookingData.time) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: workerId, userId, startDate, endDate, and time are required' 
      });
    }

    // Add timestamp
    bookingData.createdAt = new Date();

    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection('bookings');
    const result = await bookingsCollection.insertOne(bookingData);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
}
