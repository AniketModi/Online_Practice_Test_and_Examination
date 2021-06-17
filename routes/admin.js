const express =  require("express");
const router = express.Router();
const Info = require('../models/que_info_admin');
require('dotenv').config();
const fs = require('fs');
const path = require('path');


const HandlePassword = async(req,res)=>{
    try{
       // console.log(req.body);
        const password = req.body[0];
        console.log(password);
        console.log(process.env.ADMINPASSWORD);
        if(password==process.env.ADMINPASSWORD)
        {
            res.send("YES");
            res.status(200);
        }
        else{
            res.send("NO")
            res.status(200);
        }
    }catch(error){
        console.log(error);
    }
}

const getAllPaper = async(req,res)=>{
    console.log("getAllPaper")
    const data = await Info.find({});
    console.log(data);
    res.send(data);
    res.status(200);
}

const deletePaper = async(req,res)=>{
    const id = req.params.id;
    console.log("delete paper");
    const data = await Info.findOne({_id:id},{Type:1,_id:0});
    console.log(data.Type);
    const del = await Info.deleteOne({_id:id});
    fs.unlink(path.join(path.resolve("./") +'\\uploads' + `\\${id}_question.pdf`), (err => {
        if (err) console.log(err);
        else {
          console.log("file deleted");
        }
      }));
    if(data.Type=="exam"){
        fs.unlink(path.join(path.resolve("./") +'\\uploads' + `\\${id}_list.csv`), (err => {
            if (err) console.log(err);
            else {
              console.log("file deleted");
            }
          }));
    }
    res.send("deleted");
    res.status(200);
}

router.route('')
      .post(HandlePassword);

router.route('/main')
      .get(getAllPaper);
    
router.route('/main/:id')
      .delete(deletePaper)

module.exports = router;