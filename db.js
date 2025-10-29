import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // load .env

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Connection error:', err));

const db = mongoose.connection;

db.on('connected', () => console.log('📡 MongoDB connection established'));
db.on('error', (err) => console.error('💥 MongoDB connection error:', err));
db.on('disconnected', () => console.log('⚠️ MongoDB disconnected'));

export default db; // ES module export
