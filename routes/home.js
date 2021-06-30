const express = require("express");
const Question = require("../models/Question");
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const xlsxFile = require('read-excel-file/node');
const path = require('path');
const paperlist=require('../models/paper_list');

const verify=require('../auth/verifytoken');

const showWishlist = async(req,res)=>{
    const email = req.user;
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
    const data = await Question.find({Que_paper_id:idss},{Title:1,Course_name:1,College_name:1,Professor_name:1,Que_paper_id:1,_id:0})
    console.log(data);
    res.send(data);
    res.status(200)      
}

const InsertWishlist = async(req,res)=>{
    const data = await Wishlist.find({email:req.user,Que_paper_id:req.body.id})
    console.log(data);
    const wishlist=new Wishlist({
        email:req.user,
        Que_paper_id:req.body.id
    });
 
    try{
        if(data.length==0){
        await wishlist.save();
        res.send(wishlist);
        }
        else
            res.send("already exist");
     }
     catch(err){
         res.status(400).json({
          error:err
         })    
     }
}

const DeleteWishlist = async(req,res)=>{
    const id = req.body.id;
    const email=req.user;
    const respose = await Wishlist.deleteOne({email:email,Que_paper_id:id})
    console.log(respose);
    res.send("deleted");
}

const Practicepaper = async(req,res)=>{

try{
    const practices=[];

    const papers=await Question.find({Type:"Practice"});

 //   console.log(papers);
    const paperidsmap=[]
    Que_paperids=papers.map((paper)=>paper.Que_paper_id);

    papers.map((paper)=>paperidsmap[paper.Que_paper_id]=paper);
   // console.log(Que_paperids);
   const lists= await paperlist.find({Que_paper_id:Que_paperids},{List:1,Que_paper_id:1});
   //console.log(lists);
    const email=req.user;

   lists.forEach((list)=>{
      // console.log(list.List.length);

       if(list.List.length===0)
       {
           practices.push({"id":list.Que_paper_id,"title":paperidsmap[list.Que_paper_id].Title,
           "course":paperidsmap[list.Que_paper_id].Course_name,
           "college":paperidsmap[list.Que_paper_id].College_name,
           "prof":paperidsmap[list.Que_paper_id].Professor_name});
       }
       else
       {
           index=list.List.find(function(element){  return element===email});
          // console.log(index);

           if(typeof index==='undefined')
           {
           }
           else
           {
            practices.push({"id":list.Que_paper_id,"title":paperidsmap[list.Que_paper_id].Title,
            "course":paperidsmap[list.Que_paper_id].Course_name,
            "college":paperidsmap[list.Que_paper_id].College_name,
            "prof":paperidsmap[list.Que_paper_id].Professor_name});
 
           }
       }
   });

   console.log(practices);

    res.send(practices);
}
catch(err){
    res.status(400).json({
        "error":err
    })
}
}


router.route('/wishlist')
      .get(verify,showWishlist)

router.route('/wishlist')
      .post(verify,InsertWishlist)
      .delete(verify,DeleteWishlist)

router.route('/practice')
       .get(verify,Practicepaper)



module.exports=router
