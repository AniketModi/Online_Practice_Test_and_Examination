const express = require('express');

const router = express.Router();

const getProfile = async(req,res)=>{
    try {
        res.send('get Profile Page')
    } catch (error) {
        console.log(error);
    }
}

const postProfile = async(req,res)=>{
    try {
        console.log(req.body);
        res.send("post profile")
    } catch (error) {
        console.log(error)
    }
}


router.route('')
      .get(getProfile)
      .post(postProfile)

module.exports = router;