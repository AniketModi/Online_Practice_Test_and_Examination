const mongoose = require("mongoose");

const list = new mongoose.Schema({
    Que_paper_id:{
        type:String,
        unique:true,
        required:true
    },
    List:{
        type:[String],
        default:[]
    }
})

module.exports = mongoose.model('student_list',list);
