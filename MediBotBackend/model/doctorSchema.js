const mongoose=require("mongoose");
const doctorSchema=new mongoose.Schema({
    "username":{type:String},
    "password":{type:String},
    "email":{type:String},
    "phone":{type:String},
    "hospital":{type:String},
    "country":{type:String},
    "state":{type:String},
    "city":{type:String},
    "accepted":{type:Number},
    "rejected":{type:Number},
    "shortlisted":{type:Number},
    "prescriptionssPosted":{type:[{
        "title":{type:String},
        "role":{type:String},
        "location":{type:String},
        "jobMode":{type:String},
        "salary":{type:Number},
        "symptoms":{type:[String]},
        "description":{type:String},
        "hrId":{type:String},
    }]},
    "casessReceived":{type:[{
        "jobId":{type:String},
        "userId":{type:String},
        "username":{type:String},
        "title":{type:String},
        "description":{type:String}
    }]}
},{
    collection:"doctors"
})

module.exports=mongoose.model("doctorSchema",doctorSchema);