import passport from 'passport';   
import {Strategy as LocalStrategy } from 'passport-local';
import Person from './models/person.js';

passport.use(new LocalStrategy(async(username,password,done)=>{
  //authentication login here
  try{
    const user =  await Person.findOne({username:username});
    if(!user)
      return done(null,false,{message:'Incorrect username.'});
     const isPasswordMatch =user.comparePassword(password);
     if(isPasswordMatch){
      return done(null,user);
      
     }else{
      return done(null,false, {message:'Incorrect Password.'});
     }

  }catch(err){
    return done(err);

  }
}));
export default passport;