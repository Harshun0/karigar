import { connectToDatabase, ObjectId } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }
    
    const { db } = await connectToDatabase();
    const bookingsCollection = db.collection('bookings');
    
    // Try to find bookings with userId as string (since we're storing it as string in booking creation)
    // Also try ObjectId conversion in case it was stored as ObjectId
    let bookings = await bookingsCollection
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();

    // If no bookings found with string, try ObjectId
    if (bookings.length === 0 && ObjectId.isValid(userId)) {
      try {
        bookings = await bookingsCollection
          .find({ userId: new ObjectId(userId) })
          .sort({ createdAt: -1 })
          .toArray();
      } catch (err) {
        // Ignore ObjectId conversion errors
      }
    }

    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
}
