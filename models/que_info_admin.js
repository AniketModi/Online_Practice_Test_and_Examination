const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Course_name:{
        type:String,
        required:true
    },
    College_name:{
        type:String,
        required:true
    },
    Professor_name:{
        type:String,
        required:true
    },
    Prof_email:{
        type:String,
        required:true
    },
    Start_date:{
        type:Date,
    },
    End_date:{
        type:Date
    },
    Marks:{
        type:Number,
        default:null
    },
    // Que_pdf:{
    //     data: Buffer,
    //     contentType: String
    // },
    // Student_list:{
    //     type:[String]
    // }
});

const Info = mongoose.model('que_info_admin',InfoSchema) ;

module.exports =  Info