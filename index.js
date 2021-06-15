const express=require('express');
const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const verifyToken = require("./auth/verifytoken.js");
const bodyParser = require("body-parser");
const app=express();
const port = process.env.PORT || 4000
const cors=require("cors");
const sendEmail=require('./routes/sendEmail');
const SignIn_SignUp=require('./routes/SignIn_SignUp');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
    console.log("DB connected")
  }).catch((error)=>{
    console.log("mondb not connected");
    console.log(error);
});

app.use('/sendEmail',sendEmail);
app.use('/',SignIn_SignUp);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})