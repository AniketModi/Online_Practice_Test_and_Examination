const verify = require('../auth/verifytoken');
const express = require('express');
const router = express.Router();
const nodemailer=require('nodemailer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config();

async function sendEmail(email,code){
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:`${process.env.EMAIL_ID}`,
            pass:`${process.env.EMAIL_PASS}`,
        },
    });

    const mailinfo={
        from:`${process.env.EMAIL_ID}`,
        to:`${email}`,
        subject: "OTP for email-verification", // Subject line
        text:`${code}`, // plain text body
       // html: "<b>Hello world?</b>", // html body    
    };
    return await transporter.sendMail(mailinfo);
}


router.post('/email',async(req,res)=>{
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
        const email=(req.body.email).split('@')[1];
        
        try{
            code=Math.floor(100000 + Math.random() * 900000);
            await sendEmail(req.body.email,code);
            res.json(code);
        }
        catch(err){
            res.status(400).json({
                error:err
            })
        }
    }
});

module.exports = router;