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
   // console.log("delete paper");
    const data = await Info.findOne({_id:id},{Type:1,_id:0});
    //console.log(data.Type);
    const del = await Info.deleteOne({_id:id});
    fs.unlink(path.join(path.resolve("./") +'\\uploads' + `\\${id}_question.pdf`), (err => {
        if (err) console.log(err);
        else {
          console.log("paper deleted");
        }
      }));

    fs.unlink(path.join(path.resolve("./") +'\\uploads' + `\\${id}_list.xlsx`), (err => {
        if (err) console.log(err);
        else {
            console.log("list deleted");
            }
        }));
    res.send("deleted");
    res.status(200);
}


const getPDF = async(req,res)=>{
        const {id} = req.params;
        var options = { 
            root:path.resolve("./")
        }; 
        console.log(options);
        var filename = `${id}_question.pdf`
        req.header('Content-Transfer-Encoding', 'Binary')
        req.header("Content-Type", "application/pdf");
        res.setHeader("Content-disposition",
                      "attachment; filename=" + filename + "Example.pdf" );
        res.sendFile(`uploads/${id}_question.pdf`, options
       );
    // res.send("hi");
    res.status(200);
        console.log("1");
}


// const getList = async(req,res)=>{
//     const {id} = req.params;
//     var options = { 
//         root:path.resolve("./")
//     }; 
//     console.log(options);
//     var filename = `${id}_list.csv`
//     req.header('Content-Transfer-Encoding', 'Binary')
//     req.header("Content-Type", "application/csv");
//     res.setHeader("Content-disposition",
//                   "attachment; filename=" + filename + "Example.pdf" );
//     res.sendFile(`uploads/${id}_list.csv`, options
//    );
// // res.send("hi");
// res.status(200);
//     console.log("2");
// }


router.route('')
      .post(HandlePassword);

router.route('/main')
      .get(getAllPaper);
    
router.route('/main/:id')
      .delete(deletePaper)

router.route('/main/pdf/:id')
     .get(getPDF)

// router.route('/main/list/:id')
//       .get(getList)

module.exports = router;