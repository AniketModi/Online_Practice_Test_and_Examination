const mongoose = require('mongoose');

const quizSchema=new mongoose.Schema({
    qid:{
        type:Number,
        unique:true,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        default:null
    },
    option:
    {
        type:[String],
        required:true
    },
    marks:{
        type:Number,
        default:null
    }
})

const descriptiveSchema=new mongoose.Schema({
    qid:{
        type:Number,
        unique:true,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        default:null
    },
    marks:{
        type:Number,
        default:null
    }
})

const QuestionSchema = new mongoose.Schema({
    Que_paper_id:{
        type:String,
        unique:true,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Course_name:{
        type:String,
        required:true
    },
    College_name:{
        type:String,
        required:true
    },
    Professor_name:{
        type:String,
        required:true
    },
    Start_date:{
        type:Date,
        default:null
    },
    End_date:{
        type:Date,
        default:null
    },
    Instructions:{
        type:[String],
        default:null
    },
    Marks:{
        type:Number,
        default:null
    },
    Quiz:[quizSchema],
    Descriptive:[descriptiveSchema]
}) 

const Question = mongoose.model('questions',QuestionSchema);
module.exports = Question