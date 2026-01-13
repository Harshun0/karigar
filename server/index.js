import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/';

// Middleware
app.use(cors());
app.use(express.json());

let db;
let client;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('kaarigar');
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// API endpoint to register a worker
app.post('/api/workers/register', async (req, res) => {
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
    workerData.status = 'pending'; // Initial status

    // Insert into MongoDB
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
});

// User Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }
    const usersCollection = db.collection('users');
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    });
    res.status(201).json({ success: true, message: 'User registered', id: result.insertedId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

// User Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.passwordHash || '');
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful', user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Error logging in user', error: error.message });
  }
});

// API endpoint to get workers by service type
app.get('/api/workers', async (req, res) => {
  try {
    const { service } = req.query;
    
    const workersCollection = db.collection('workers');
    let query = {}; // Get all workers (can filter by status later if needed)
    
    if (service) {
      query.service = service;
    }

    // Add pincode filter if provided
    const { pincode } = req.query;
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
});

// API endpoint to create a booking
app.post('/api/bookings/create', async (req, res) => {
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

    // Insert into MongoDB
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
});

// API endpoint to fetch bookings for a user
app.get('/api/bookings', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }
    
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
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

startServer();

