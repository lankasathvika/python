const express=require("express");
const clientSchema=require("../model/clientSchema.js");
const clientRoute=express.Router();
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const doctorSchema = require("../model/doctorSchema.js");


clientRoute.post('/signup', async (req, res) => {
    const {username,password,email,phone,age,hospitalName,birthYear,healthStatus,symptoms} = req.body;
    try {
      const client = await clientSchema.findOne({$or: [{ username }, { email }],});
      if (client) {
        return res.status(400).json({ message: "Exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      clientSchema.create({username,password: hashedPassword,email,phone,age,hospitalName,birthYear,healthStatus,symptoms},(err,data)=>{
        if(err){
            console.log(err);
            return err;
        }
        else{
            console.log("SignUp successful");
            res.json({ message: 'SignUp successful',client:data });
        }
    })
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
  });

clientRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const client = await clientSchema.findOne({ username});
      if (!client) {
        console.log('Login failed - User not found');
        return res.status(401).json({ message: 'Login failed' });
      }
      const passwordMatch = await bcrypt.compare(password, client.password);
      if (passwordMatch) {
        res.json({ message: 'Login successful', client });
      } else {
        res.json({ message: 'Invalid Credentials', client });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
  });

clientRoute.get("/",(req,res)=>{
    clientSchema.find((err,data)=>{
        if(err)
          return err;
        else
          res.json(data);
    })
})


clientRoute.get("/clientPage/:id",(req,res)=>{
  clientSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
      if(err){
          return err;
      }
      else{
          res.json(data);
      }
  })
})

clientRoute.get("/clientPage/profile/:id",(req,res)=>{
clientSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{ 
  if(err){
      return err;
  }
  else{
      res.json(data);
  }
})
})


clientRoute.route("/profile/:id")
.get((req,res)=>{
    clientSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put((req,res)=>{
    clientSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data)=>{
        if(err){
            return err; 
        }
        else{
          res.status(200).json({ message: 'Update Successful', data });
        }
    }
    )
})


clientRoute.route("/applyJob/:id")
.get((req,res)=>{
    clientSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put(async (req, res) => {
  const clientId = req.params.id;
  const formData = req.body;
  try {
    const client = await clientSchema.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    client.jobsApplied.push({
      userId:formData.userId,
      jobId:formData.jobId,
    });
    const updatedClient = await client.save();
    res.status(200).json({
      message: 'Update Successful',
      data: updatedClient.jobsApplied,
    });
  } catch (error) {
    console.error('Error during job posting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports=clientRoute;

