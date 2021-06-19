const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const commentSchema=new Schema({
    que_paper_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("comments",commentSchema);