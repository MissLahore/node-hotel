import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();
router.post('/', async function(req,res){
    try{
      const data =req.body;
      const newMenuItem = new MenuItem(data);
      const response =  await newMenuItem.save();
      console.log("Menu saved successfully");
      res.status(200).json(response);
  
    }catch(err){
      console.log("Error in saving Menu");
      res.status(500).json({error:"Server Internal Error"});
  
    }
  })
  
  router.get('/', async(req,res)=>{
    try{
      const data = await MenuItem.find();
      console.log("Menu fetched successfully");
      res.status(200).json(data);
  
  
    }catch(err){
      console.log("Error in saving Menu");
      res.status(500).json({error:"Server Internal Error"});
  
    }
  })
  
export default router;
  