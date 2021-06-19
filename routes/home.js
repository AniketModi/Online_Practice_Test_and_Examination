const express=require('express');

const router=express.Router();

const Question_paper=require('../models/Question');

router.get('/practice',async(req,res)=>{
    const practices=[];

    await Question_paper.find({Type:"Practice"}).
    then((papers)=>{
       // console.log(papers);
        papers.forEach((paper)=>{
           // console.log(paper);
            practices.push({"title":paper.Title,"course":paper.Course_name,"college":paper.College_name,"prof":paper.Professor_name});
        })

        res.json(practices);
    }).catch((err)=>{
        res.status(400).json({
            error:err
        })
    })
})

module.exports=router