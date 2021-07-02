const express = require('express');

const router=express.Router();

const question=require('../models/Question');
const verify=require('../auth/verifytoken');

router.get('/view/:id',verify,async(req,res)=>{
   // console.log('reached1');

    var paper_id=req.params.id;

    const que=await question.findOne({Que_paper_id:paper_id});

    if(!que)
    {
        res.status(400).json({
            "error":"There is no paper in DB of that id"
        })
    }
    else
    {
      //  console.log(que);
        const que_info={"Type":que.Type,"Title":que.Title,"course":que.Course_name,"college":que.College_name,"prof":que.Professor_name,"marks":que.Marks};

        const mcq=[];

      //  console.log(Array.isArray(mcq));
         (que.Quiz).forEach((que)=>{
             mcq.push({"qid":que.qid,"que":que.question,"option":que.option,"marks":que.marks,"answer":que.answer});
         })

         const desc=[];
         (que.Descriptive).forEach((que)=>{
             desc.push({"qid":que.qid,"que":que.question,"marks":que.marks,"answer":que.answer});
         })
        res.json({
            que_info,
            mcq,
            desc
        })

    }

});





module.exports=router
