const express=require('express');
const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const verifyToken = require("./auth/verifytoken.js");
const bodyParser = require("body-parser");
const User = require("./models/user");
const app=express();
const nodemailer=require('nodemailer');
const port = process.env.PORT || 4000

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
    console.log("DB connected")
  }).catch((error)=>{
    console.log("mondb not connected");
    console.log(error);
});

async function sendEmail(req){
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:`${process.env.EMAIL_ID}`,
            pass:`${process.env.EMAIL_PASS}`,
        },
    });

    const mailinfo={
        from:`${process.env.EMAIL_ID}`,
        to:`${req.body.email}`,
        subject: "OTP for email-verification", // Subject line
        text:`${req.body.code}`, // plain text body
       // html: "<b>Hello world?</b>", // html body    
    };
    return await transporter.sendMail(mailinfo);
}

app.post('/SignIn',async(req,res)=>{

    let user=await User.findOne({email:req.body.email}).exec();

    if(user)
    {
        const auth=await bcrypt.compare(user.password,req.body.password);

        if(auth)
        {
            const accessToken=jwt.sign(user.email,process.env.ACCESS_SECRET_KEY);
            res.json({ accessToken: accessToken });    
        }
        else
        {
            res.status(400).json({
                error:"Incorrect emailId or Password",
            })
        }
    }
    else
    {
        res.status(400).json({
            error:"Incorrect emailId or Password",
        })
    }
});

app.post('/sendEmail',async(req,res)=>{
    let user1=await User.findOne({email:req.body.email}).exec();

    if(user1)
    {
        res.status(400).json({
            error:"email id is already exists"
        });
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = re.test(req.body.email.toLowerCase());
    
    if(!validEmail)
    {
        //console.log('ee');
        res.status(400).json({
            error:"Please enter a valid email id"
        })
    }
    else
    {
        try{
            await sendEmail(req);
            res.json("Email is sent");
        }
        catch(err){
            res.status(400).json({
                error:err
            })
        }
    }
});

app.post('/SignUp',async(req,res)=>{

        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            Institute:req.body.institute,
            role:req.body.role
        });


        try{
           await user.save();
           res.send(user);
        }
        catch(err){
            res.status(400).json({
             error:err
            })    
        }
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})