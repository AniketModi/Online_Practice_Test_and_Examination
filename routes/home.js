const express = require("express");
const Question = require("../models/Question");
const router = express.Router();
const Wishlist = require('../models/Wishlist');

const showWishlist = async(req,res)=>{
    const email = req.params.id;
    //console.log(email);
    const idss=[]
    await Wishlist.find({email:email},{_id:0,Que_paper_id:1})
    .then(async(data)=>{
        //console.log(data);
         data.forEach(async(ele)=>{
             idss.push(ele.Que_paper_id)
     })
    })
    console.log(idss);
    const data = await Question.find({Que_paper_id:idss},{Title:1,Course_name:1,College_name:1,Professor_name:1,_id:0})
    // .then(async(users)=>{
    //     data.push(users);
    // }).catch((err)=>{
    //     console.log(err);
    //     res.status(404);
    // })  
    console.log(data);
    res.send(data);
    res.status(200)      
}

const InsertWishlist = async(req,res)=>{
    const wishlist=new Wishlist({
        email:req.body.email,
        Que_paper_id:req.body.id
    });
 
    try{
        await wishlist.save();
        res.send(wishlist);
     }
     catch(err){
         res.status(400).json({
          error:err
         })    
     }
}

router.route('/wishlist/:id')
      .get(showWishlist)

router.route('/wishlist')
      .post(InsertWishlist)

module.exports = router;
