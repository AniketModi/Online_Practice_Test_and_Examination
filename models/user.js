const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail}=require('validator');
const {uniqueValidator}=require('mongoose-unique-validator');
const Schema= mongoose.Schema;

const userSchema= new Schema({
    name:{
        type: String,
        required:[true,'Please enter an name'],
    },
    email:{
        type: String,
        required:[true,'Please enter an email id'],
        default:null
    },
    password:{
        type:String,
        required:[true,'Please enter an password'],
    },
    role:{
        type:String,
        required:true
    },
    Institute:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        default:""
    },
    contact:{
        type:String,
        default:"",

    },
    LinkedinProfile:{
        type:String,
        default:""

    },
    About:{
        type:String,
        default:""
    }
 })

  
 module.exports=mongoose.model('users',userSchema);