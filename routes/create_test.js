const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const xlsxFile = require('read-excel-file/node');
const verify=require('../auth/verifytoken');
const xlsx=require("xlsx");
const Question=require('../models/Question');
const mongoose=require('mongoose');
//import models
var Info = require('../models/que_info_admin');
var List = require('../models/paper_list')

const get_create_test = async(req,res)=>{
    try {
        res.send("create test");
    } catch (error) {
        console.log(error);
    }
}

const post_create_test = async(req,res)=>{
    try {
        //console.log(req.body);
        const [title,college_name,course_name,prof_name,type,start_date,end_date,marks] =   req.body ;
        console.log(college_name+" "+course_name+" "+prof_name+" "+type+" "+start_date+" "+end_date+" "+marks+" "+title);
        var obj={
            Type:type,
            Course_name:course_name,
            College_name:college_name,
            Professor_name:prof_name,
            Start_date:start_date,
            End_date:end_date,
            Marks:marks,
            Title:title,
            Que_pdf:null,
            Student_list:[]
        }
        const answer  = await Info.insertMany(obj);
        const id = answer[0]._id;
        console.log(id);
        res.status(200);
        res.send(id);

    }catch(error){
        console.log(error);
    }
        
}

const post_create_test_own=async(req,res)=>{

    try{
        const [title,college_name,course_name,prof_name,type,start_date,end_date,marks] =   req.body ;
        const r="abc@gmail.com"
        console.log(college_name+" "+course_name+" "+prof_name+" "+type+" "+start_date+" "+end_date+" "+marks+" "+title);
        var obj={
            Type:type,
            Course_name:course_name,
            College_name:college_name,
            Professor_name:prof_name,
            Prof_email:r,
            Start_date:start_date,
            End_date:end_date,
            Marks:marks,
            Title:title,
            Quiz:[],
            Que_paper_id:"",
            Descriptive:[]
        }
        const answer  = await Question.insertMany(obj);
        const id = answer[0]._id;
        console.log(id);
        res.status(200);
        res.send(id);

    }catch(error){
        console.log(error);
    }
 


    // await Info.findOne({_id:req.params.id})
    // .then(async(question_info)=>{
    //    // console.log(question);
    //   // console.log(req.user);
    //    const question= new Question({
    //     Que_paper_id:req.params.id,
    //     Title:question_info.Title,
    //     Type:question_info.Type,
    //     Course_name:question_info.Course_name,
    //     College_name:question_info.College_name,
    //     Start_date:question_info.Start_date,
    //     End_date:question_info.End_date,
    //     Professor_name:question_info.Professor_name,
    //     Prof_email:req.user,
    //     Marks:question_info.Marks,
    //     Quiz:data,
    //     Descriptive:data1
    //    })
    //    await question.save();
    //    await Info.findOneAndDelete({_id:req.params.id});
    //     //console.log(question);
    //     res.send(question);
    // })
    // .catch((err)=>{
    //     res.status(400).json({
    //         "error":err
    //     })
    // })

}

const post_paper_own = async(req,res)=>{

        
    var wb=xlsx.readFile(path.join(path.resolve("./") +'\\uploads' + `\\${req.params.id}_question.xlsx`));
    var ws=wb.Sheets["Quiz"];

    var ws1=wb.Sheets["Descriptive"];

    var data1=xlsx.utils.sheet_to_json(ws1);

    console.log("Descriptive::");
    console.log(data1);


    var qdata=xlsx.utils.sheet_to_json(ws);
  

    const data=[];
    qdata.forEach((qdata)=>{
        var option=[qdata.A,qdata.B,qdata.C,qdata.D];

        if(typeof qdata.answer==='undefined' && typeof qdata.marks==='undefined')
        {
            data.push({"qid":qdata.qid,"question":qdata.question,"option":option})            
        }
        else if(typeof qdata.answer==='undefined')
        {
            data.push({"qid":qdata.qid,"question":qdata.question,"marks":qdata.marks,"option":option})
        }
        else if(typeof qdata.marks==='undefined')
        {
            data.push({"qid":qdata.qid,"question":qdata.question,"answer":qdata.answer,"option":option})
        }
        else
        {
            data.push({"qid":qdata.qid,"question":qdata.question,"marks":qdata.marks,"answer":qdata.answer,"option":option})
        }
    })

    console.log(data);
    Question.findOne({_id:req.params.id}).then((e)=>{
        e.Que_paper_id=req.params.id,
        e.Quiz=data,
        e.Descriptive=data1,
        e.save();
        console.log(e);
        var obj= {
            Que_paper_id:req.params.id
        }
        List.insertMany(obj).then(()=>{
            res.send("done");
            res.status(200);
        }).catch((err)=>{
            console.log(err);
            res.status(404);
        })
        
    }).catch((err)=>{
        console.log(err)

        
})

}

const post_create_test_paper = async(req,res)=>{
    try {
        var obj= {
            Que_paper_id:req.params.id
        }
        List.insertMany(obj).then(()=>{
            res.send("done");
            res.status(200);
        }).catch((err)=>{
            console.log(err);
            res.status(404);
        })

      
    } catch (error) {
        console.log(error);
        res.status(404);
    }
}

const post_create_test_list = async(req,res)=>{
    try {
    
        const answer=[];
        var wb=xlsx.readFile(path.join(path.resolve("./") +'\\uploads' + `\\${req.params.id}_list.xlsx`));
        var ws=wb.Sheets["Sheet1"];
        var data1=xlsx.utils.sheet_to_json(ws);
        data1.forEach((data)=>{
        console.log(data.List);
        answer.push(data.List);
        })
        console.log(answer);    
        List.findOne({Que_paper_id:req.params.id}).then((e)=>{
                        e.List = answer;
                        e.save();
                        console.log(e);
                        res.send(e);
                        res.status(200);
                    }).catch((err)=>{
                        console.log(err)
        })
    
    } catch (error) {
        console.log(error);
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },       
      filename: function (req, file, cb) {
        cb(null,`${req.params.id}_question.pdf`)
      }
             
})

const upload = multer({storage:storage,});

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },       
      filename: function (req, file, cb) {
        cb(null,`${req.params.id}_list.xlsx`)
      }
             
})

var storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },       
      filename: function (req, file, cb) {
        cb(null,`${req.params.id}_question.xlsx`)
      }
             
})


const upload2 = multer({storage:storage2})  
const upload3 = multer({storage:storage3})  

//route for create test_form detail


router.route('')
      .get(get_create_test)
      .post(post_create_test)

router.route('/own')
      .post(post_create_test_own)

router.route('/paper/:id')
      .post(upload.single('file'),post_create_test_paper)

router.route('/paper_xl/:id')
      .post(upload3.single('file'),post_paper_own)

router.route('/list/:id')
      .post(upload2.single('file'),post_create_test_list)


module.exports = router;
