const express =  require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const verify=require('../auth/verifytoken');



const getPaper = async(req,res)=>{
    var options = { 
        root:path.resolve("./")
    }; 
    //console.log(options);
    var filename = `Test_temp.xlsx`
    req.header('Content-Transfer-Encoding', 'Binary')
    req.header("Content-Type", "application/xlsx");
    res.setHeader("Content-disposition",
                  "attachment; filename=" + filename + "Example.xlsx" );
    res.sendFile(`Template/Test_temp.xlsx`, options
   );
// res.send("hi");
res.status(200);
    console.log("paper");
}


const getList = async(req,res)=>{
    var options = { 
        root:path.resolve("./")
    }; 
    //console.log(options);
    var filename = `List_temp.xlsx`
    req.header('Content-Transfer-Encoding', 'Binary')
    req.header("Content-Type", "application/xlsx");
    res.setHeader("Content-disposition",
                  "attachment; filename=" + filename + "Example.xlsx" );
    res.sendFile(`Template/List_temp.xlsx`, options
   );
// res.send("hi");
res.status(200);
    console.log("list");
}


router.route('/paper')
      .get(verify,getPaper)

router.route('/list')
      .get(verify,getList)

module.exports = router;