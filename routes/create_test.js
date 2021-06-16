const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();


//import models
var Info = require('../models/que_info_admin');

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
        const [title,college_name,course_name,prof_name,type,start_date,end_date,marks,mode] =   req.body;
        //console.log(college_name+" "+course_name+" "+prof_name+" "+type+" "+start_date+" "+end_date+" "+marks);
        var obj={
            Type:type,
            Course_name:course_name,
            College_name:college_name,
            Professor_name:prof_name,
            Start_date:start_date,
            End_date:end_date,
            Marks:marks,
            Title:title,
            Mode:mode,
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
        console.log(req.params);
        const answer = await Info.findOne({_id:req.params.id});
       // console.log(path.join(__dirname + '/uploads/' + 'questions.pdf');
        //const data= fs.readFileSync(path.join(path.resolve("./") +'\\uploads' + '\\questions.pdf'));
        //  console.log(data);
        // answer.Que_pdf = Binary(data);
        // answer.save();
        // console.log(answer.Que_pdf);
        res.send("hello");
        res.status(200);
    } catch (error) {
        console.log(error);
    }
}

const post_create_test_list = async(req,res)=>{
    try {
        console.log(req.params);
        const answer = await Info.findOne({_id:req.params.id});
       // console.log(path.join(__dirname + '/uploads/' + 'questions.pdf');
        //const data= fs.readFileSync(path.join(path.resolve("./") +'\\uploads' + '\\questions.pdf'));
        //console.log(data);
        //answer.Que_pdf = Binary(data);
        // answer.save();
        // console.log(answer.Que_pdf);
        res.send("hello");
        res.status(200);
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
