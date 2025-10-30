import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URI;


mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => console.log('✅ Connected to MongoDB'));
db.on('error', (err) => console.error('❌ MongoDB connection error:', err));
db.on('disconnected', () => console.log('⚠️ MongoDB disconnected'));

export default db;
