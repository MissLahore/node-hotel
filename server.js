import express from 'express';
import bodyParser from 'body-parser';
import './db.js'; // MongoDB connection
import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import passport from './auth.js';

const app = express();

// ✅ Middleware

const logRequest =(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] RequestMode to: ${req.originalUrl}`);
  next();
}
app.use(logRequest);
app.use(passport.initialize());


const localAuthMiddleware =passport.authenticate('local',{session:false});

app.post('/login',localAuthMiddleware,(req,res)=>{
  res.json({message:'Login Successful', user:req.user});
});

app.use(bodyParser.json()); // Parse JSON request bodies

// ✅ Person routes (mounted under /person)
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu',menuRoutes);


// ✅ Basic test route
app.get('/',localAuthMiddleware,(req, res) => {
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
