const mongoose = require('mongoose');
const app = require('./app');

const url='mongodb+srv://grp3:sri2021@cluster0.dipmh.mongodb.net/Test';

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

mongoose.connect(url,connectionParams)
    .then(()=>{console.log('db connected');
    }).catch((error)=>{
        console.log("connection failed");
})

const port=3000;
const host="127.0.0.1"
app.listen(port,host,()=>{
    console.log("app running on port 3000")
});