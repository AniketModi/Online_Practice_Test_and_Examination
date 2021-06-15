const express=require('express');
//var multer = require('multer');
//var upload = multer();
const cors = require('cors');
const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const verifyToken = require("./auth/verifytoken.js");
const bodyParser = require("body-parser");
const app=express();
const port = process.env.PORT || 4000;


const sendEmail=require('./routes/sendEmail');
const SignIn_SignUp=require('./routes/SignIn_SignUp');
const create_test = require('./routes/create_test');
const profile = require('./routes/profile');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(upload.array()); 
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGODB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
    console.log("DB connected")
  }).catch((error)=>{
    console.log("mondb not connected");
    console.log(error);
});

app.use('/sendEmail',sendEmail);
app.use('/',SignIn_SignUp);
app.use('/create_test',create_test);
app.use('/profile',profile)

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})