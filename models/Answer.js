const mongoose = require('mongoose');

const quizresponse=new mongoose.Schema({
    qid:{
        type:Number,
        required:true,
    },
    answer:{
        type:string
    },
    Obtain_marks:{
        type:Number
    }
})

const descriptiveresponse=new mongoose.Schema({
    qid:{
        type:Number,
        required:true,
    },
    answer:{
        type:string
    },
    Obtain_marks:{
        type:Number
    }
})

const AnswerSchema = new mongoose.Schema({
    Que_paper_id:{
        type:Number,
        required:true,
        ref:"questions"
    },
    Student_email:{
        type:string,
        required:true,
        ref:"users"
    },
    Obtain_marks:{
        type:Number
    },
    Quiz:quizresponse,
    Descriptive:descriptiveresponse
}) 

const Answer = mongoose.model('answers',AnswerSchema);
module.exports = Answer