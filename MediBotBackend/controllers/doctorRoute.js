const express=require("express");
const doctorSchema=require("../model/doctorSchema.js");
const doctorRoute=express.Router();
const bcrypt=require('bcrypt');
const mongoose=require("mongoose");
const clientSchema = require("../model/clientSchema.js");


doctorRoute.get("/",(req,res)=>{
    doctorSchema.find((err,data)=>{
        if(err)
          return err;
        else 
          res.json(data);
    })
})

doctorRoute.get("/doctorPage/:id",(req,res)=>{
      doctorSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
          if(err){
              return err;
          }
          else{
              res.json(data);
          }
      })
  })

  
doctorRoute.get("/doctorPage/doctorProfile/:id",(req,res)=>{
  doctorSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
      if(err){
          return err;
      }
      else{
          res.json(data);
      }
  })
})

doctorRoute.get("/doctorPage/applicationsReceived/:id",(req,res)=>{
  doctorSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
      if(err){
          return err;
      }
      else{
          res.json(data.applicationsReceived);
      }
  })
})


doctorRoute.get('/allDoctorIds', async (req, res) => {
  try {
    const doctorIds = await doctorSchema.find({}, '_id');
    console.log(doctorIds);
    res.status(200).json(doctorIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

doctorRoute.post('/signup', async (req, res) => {
    const {username,password,email,phone,hospital} = req.body;
    try {
      const doctor = await doctorSchema.findOne({$or: [{ username }, { email }],});
      if (doctor) {
        return res.status(400).json({ message: "Exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      doctorSchema.create({username,password: hashedPassword,email,phone,hospital},(err,data)=>{
        if(err){
            return err;
        }
        else{
            console.log("SignUp successful",data);
            res.json({ message: 'SignUp successful',doctor:data });
        }
    })
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
  });

  doctorRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const doctor = await doctorSchema.findOne({ username});
      if (!doctor) {
        console.log('Login failed - User not found');
        return res.status(401).json({ message: 'Login failed' });
      }
      const passwordMatch = await bcrypt.compare(password, doctor.password);
      if (passwordMatch) {
        res.json({ message: 'Login successful', doctor });
      } else {
        res.json({ message: 'Invalid Credentials', doctor });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
  });


  doctorRoute.route("/jobs/:id")
  .get((req,res)=>{
      doctorSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
          if(err){
              return err;
          }
          else{
              res.json(data);
          }
      })
  }).put(async (req, res) => {
    const doctorId = req.params.id;
    const formData = req.body;
    try {
      const doctor = await doctorSchema.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctorr not found' });
      }
      doctor.applicationsPosted.push({
        title: formData.title,
        role: formData.role,
        location: formData.location,
        jobMode: formData.jobMode,
        salary: formData.salary,
        symptoms: formData.symptoms.split(','), 
        description: formData.jobDescription,
        hrId:doctorId,
      });
      const updatedDoctor = await doctor.save();
      res.status(200).json({
        message: 'Update Successful',
        data: updatedDoctor.applicationsPosted,
      });
    } catch (error) {
      console.error('Error during job posting:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  doctorRoute.get("/doctorPage/doctorprofile/:id",(req,res)=>{
    doctorSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{ 
      if(err){
          return err;
      }
      else{
          res.json(data);
      }
    })
    })

  doctorRoute.route("/doctorProfile/:id")
  .get((req,res)=>{
      doctorSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
          if(err){
              return err;
          }
          else{
              res.json(data);
          }
      })
  }).put((req,res)=>{
      doctorSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
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

doctorRoute
  .route("/applicationsReceived/:hrId")
  .get((req, res) => {
    doctorSchema.findById(
      mongoose.Types.ObjectId(req.params.hrId),
      (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.json(data);
        }
      }
    );
  })
  .put(async (req, res) => {
    const { jobId, userId } = req.body;
    const hrId = req.params.hrId;
    try {
      console.log(hrId);
      const hrDetails = await doctorSchema.findById(hrId);
      if (!hrDetails) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      const jobDetails = await hrDetails.applicationsPosted.find(job => job._id.toString() === jobId);
      console.log(jobDetails)
      const userDetail = await clientSchema.findById(userId);
      if (!jobDetails || !userDetail) {
        return res.status(404).json({ message: 'Job or user not found' });
      }
      const { username } = userDetail;
      const { title, jobDescription } = jobDetails;
      hrDetails.applicationsReceived.push({
        jobId,
        userId,
        username,
        title,
        jobDescription,
      });
      const updatedDoctor = await hrDetails.save();
      res.status(200).json({
        message: 'Update Successful',
        data: updatedDoctor.applicationsReceived,
      });
    } catch (error) {
      console.error('Error during application update:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

doctorRoute.route("/applicationsReceived/:hrId").get((req, res) => {
  doctorSchema.findById(
    mongoose.Types.ObjectId(req.params.hrId),
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.json(data);
      }
    }
  );
}).delete(async (req, res) => {
  try {
    const doctor = await doctorSchema.findById(req.params.hrId);
    const {jobId}=req.body;
    console.log(jobId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    doctor.applicationsReceived = doctor.applicationsReceived.filter(
      (app) => app.jobId !== jobId
    );

    const updatedDoctor = await doctor.save();
    res.status(200).json({
      message: 'Job deleted successfully from applicationsReceived',
      data: updatedDoctor.applicationsReceived,
    });
  } catch (error) {
    console.error('Error during job deletion:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports=doctorRoute;