const express=require("express");
const mongoose=require("mongoose");
const clientRoute=require("./controllers/clientRoute");
const doctorRoute=require("./controllers/doctorRoute");
const cors = require('cors');
const app=express();
mongoose.set("strictQuery",true);
// mongoose.connect("mongodb+srv://sujan:sujan123@cluster0.0ea9dmv.mongodb.net/medibot")
mongoose.connect("mongodb+srv://satya:satya123@cluster0.wgyefvb.mongodb.net/?retryWrites=true&w=majority")
// mongodb+srv://admin:<password>@cluster0.7pvsfld.mongodb.net/?retryWrites=true&w=majority
app.use(cors());
var db=mongoose.connection;
db.on("open",()=>console.log("connected to db"))
db.on("error",(error)=>console.log(`error occured+${error}`))


app.use(express.json());
app.use('/clientRoute',clientRoute);
app.use('/doctorRoute',doctorRoute);

app.listen(4000,()=>{
    console.log("server started at 4000")
})