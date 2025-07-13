const mongoose=require("mongoose");
const clientSchema=new mongoose.Schema({
    "username":{type:String},
    "password":{type:String},
    "email":{type:String},
    "phone":{type:String},
    "age":{type:String},
    "hospitalName":{type:String},
    "birthYear":{type:Number},
    "healthStatus":{type:String},
    "symptoms":{type:[String]},
    "country":{type:String},
    "state":{type:String},
    "city":{type:String},
    "rating":{type:Number},
    "applied":{type:Number},
    "shortlisted":{type:Number},
    "rejected":{type:Number},
    "cases":{type:[{
        "jobId":{type:String},
        "userId":{type:String},
    }]}
},{
    collection:"clients"
})

module.exports=mongoose.model("clientSchema",clientSchema);