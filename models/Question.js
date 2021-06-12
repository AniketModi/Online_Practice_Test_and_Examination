const mongoose = require('mongoose');

const quizSchema=new mongoose.Schema({
    qid:{
        type:Number,
        unique:true,
        required:true
    },
    question:{
        type:string,
        required:true
    },
    answer:{
        type:string,
        required:true
    },
    option:
    {
        type:[string]
    }
})

const decriptiveSchema=new mongoose.Schema({
    qid:{
        type:Number,
        unique:true,
        required:true
    },
    question:{
        type:string,
        required:true
    },
    answer:{
        type:string,
    }
})

const QuestionSchema = new mongoose.Schema({
    Que_paper_id:{
        type:Number,
        unique:true,
        required:true
    },
    Type:{
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
    Total_duration:{
        type:time,
    },
    Start_date:{
        type:Date,
    },
    Instructions:{
        type:[String],
    },
    Marks:{
        type:Number,
    },
    Quiz:quizSchema,
    Descriptive:descriptiveSchema
}) 

const Question = mongoose.model('questions',QuestionSchema);
module.exports = Question