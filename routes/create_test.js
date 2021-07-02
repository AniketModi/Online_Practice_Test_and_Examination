const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const xlsxFile = require('read-excel-file/node');
const verify=require('../auth/verifytoken');

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
        const id = req.params.id;
        var answer=[];
        xlsxFile(path.join(path.resolve("./") +'\\uploads' + `\\${id}_list.csv`)).
        then((rows)=>{
                for(i in rows)
                    answer.push(i);
                List.findOne({Que_paper_id:id}).then((e)=>{
                    e.List = answer;
                    e.save();
                    console.log(e);
                    res.send(e);
                    res.status(200);
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err);
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
        cb(null,`${req.params.id}_list.csv`)
      }
             
})

const upload2 = multer({storage:storage2})  

//route for create test_form detail


router.route('')
      .get(get_create_test)
      .post(post_create_test)

router.route('/paper/:id')
      .post(upload.single('file'),post_create_test_paper)

router.route('/list/:id')
      .post(upload2.single('file'),post_create_test_list)


module.exports = router;
