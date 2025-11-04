import jwt from 'jsonwebtoken';

export const jwtAuthMiddleware = (req,res,next)=>{

 //extract the jwt toekn from the request header
 const authorization = req.headers.authorization;
 if(!authorization) return res.status(401).json({error:'Token not found'});
 const token = req.headers.authorization.split(' ')[1]; //Assuming Bearer token
 if(!token) return res.status(401).json({error:'unauthorized'});
 try{
    //verify the token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //attach the user info to the request object
    req.user =decoded;
    next();


 }catch(err){
    console.error(err);
    res.status(401).json({error:'invalid token'});
 }
};

//function to generate a jwt token

export const generateToken =  (userData)=>{
    //generate a new jwt token using users data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'3000'});
}
