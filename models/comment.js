const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const commentSchema=new Schema({
    que_paper_id:{
        type:String,
        required:true,
        ref:"que_info_admin"
    },
    user_id:{
        type:String,
        ref:"users",
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("comments",commentSchema);