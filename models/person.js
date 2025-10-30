import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['waiter','manager','chef'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save',async function(next){
    const person =this; 

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
    //hash password generated
    const salt = await bcrypt.genSalt(10); 
    // hash password
    const hashedPassword =await bcrypt.hash(person.password,salt);
    person.password =hashedPassword;  
    next();
    }catch(err){
        return next(err);
    }
    
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcript.compare(candidatePassword,this.password);
        return isMatch;
 
    }catch(err){

    }
}
const Person =mongoose.model('person',personSchema);
export default Person; 