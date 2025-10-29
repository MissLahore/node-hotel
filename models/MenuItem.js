import mongoose from 'mongoose';
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredient:{
        type:[String],
        default:[]
    },
    num_sale:{
        type:Number,
        default:0
    }
})

const MenuItem =mongoose.model('menu',menuSchema);
export default MenuItem;