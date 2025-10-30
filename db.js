import express from 'express';
import db from './db.js'; // or whatever your db file name is

const app = express();

const port = process.env.PORT || 3000; // ✅ important for Render

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
