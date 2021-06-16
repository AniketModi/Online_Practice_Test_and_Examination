const express = require('express');

//models
const User = require('../models/user');

const router = express.Router();

const getProfile = async(req,res)=>{
    try {
        const email_id = req.params.email;
        const data = await User.findOne({email:email_id});
        console.log(data);
        res.send(data);
        res.status(200);

    } catch (error) {
        console.log(error);
    }
}

const postProfile = async(req,res)=>{
    try {
        const email_id = req.body.email;
        //console.log(gender,aboutme,name,phone_number,LinkedIN);
        User.findOne({email:email_id})
        .then((result)=>{
            console.log(result);
            result.name=req.body.name;
            result.Gender=req.body.Gender,
            result.contact=req.body.contact,
            result.LinkedinProfile=req.body.LinkedinProfile,
            result.About=req.body.About,
            result.save();
            console.log(result);
            res.send(result);
            res.status(200);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    } catch (error) {
        console.log(error)
    }
}


router.route('/:email')
      .get(getProfile) 
router.route('')    
      .put(postProfile)

module.exports = router;