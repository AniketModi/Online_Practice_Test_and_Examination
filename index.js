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

const viewtest=require('./routes/viewtest');
const sendEmail=require('./routes/sendEmail');
const SignIn_SignUp=require('./routes/SignIn_SignUp');
const create_test = require('./routes/create_test');
const profile = require('./routes/profile');
const Admin = require('./routes/admin');
const comment=require('./routes/comment');
const guide = require('./routes/guide')

const home=require('./routes/home');
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
app.use('/create_test',create_test);
app.use('/admin',Admin);
app.use('/profile',profile);
app.use('/practice',viewtest);
app.use('/',SignIn_SignUp);
app.use('/comment',comment);
app.use('/home',home);
app.use('/guide',guide);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})