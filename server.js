import express from 'express';
import bodyParser from 'body-parser';
import './db.js'; // MongoDB connection
import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();

// ✅ Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// ✅ Person routes (mounted under /person)
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


// ✅ Basic test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// ✅ Chicken test route
app.get('/chicken', (req, res) => {
  res.send('It’s the chicken menu');
});

// ✅ Menu routes



// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
