const verify = require('../auth/verifytoken');
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const router = express.Router();
require('dotenv').config();

router.post('/SignIn',async(req,res)=>{

    let user=await User.findOne({email:req.body.email});
    console.log(user);

    if(user)
    {
        const auth=await bcrypt.compare(req.body.password,user.password);
        
        console.log(auth);
        if(auth)
        {
            const accessToken=jwt.sign(user.email,process.env.ACCESS_SECRET_KEY);
            res.json({ accessToken: accessToken });    
        }
        else
        {
            console.log("eeee");
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

router.post('/SignUp',async(req,res)=>{

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

module.exports = router;