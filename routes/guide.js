const express =  require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');



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
    var filename = `List_temp.csv`
    req.header('Content-Transfer-Encoding', 'Binary')
    req.header("Content-Type", "application/csv");
    res.setHeader("Content-disposition",
                  "attachment; filename=" + filename + "Example.csv" );
    res.sendFile(`Template/List_temp.csv`, options
   );
// res.send("hi");
res.status(200);
    console.log("list");
}


router.route('/xlsx')
      .get(getPaper)

router.route('/csv')
      .get(getList)

module.exports = router;