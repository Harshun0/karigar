import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../lib/db.js';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }
    
    const { db } = await connectToDatabase();
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
}
