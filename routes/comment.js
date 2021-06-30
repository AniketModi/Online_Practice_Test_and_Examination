const User=require('../models/user');

const Comment=require('../models/comment');

const express=require('express');

const router=express.Router();
const verify=require('../auth/verifytoken');

router.get('/getcomment/:id',verify,async(req,res)=>{

    const quepaper_id=req.params.id;

    await Comment.find({que_paper_id:quepaper_id}).
    then(async (comments)=>{
            const userids=comments.map(comment=>comment.user_id);

            const usernamesmap=[];

           // console.log(userids);
           // console.log('reached2');
            await User.find({email:userids}).
            then((users)=>{
                users.map(user=>usernamesmap[user.email]=user.name);
            }).catch((err)=>{
                    res.status(400).json({
                        error:err
                    })
            });

           console.log(usernamesmap);
            try{
                const ans=[];
                //console.log('reached1');
               comments.forEach((comment) => {
                    //console.log(comment.user_id);
                    ans.push({ "comment": comment.comment, "username": usernamesmap[comment.user_id] });
                })

                res.json(
                    ans
                )
            }
            catch(err){
                res.status(400).json({
                    error:err
                })
            }
    })
})

router.post('/postcomment',verify,async(req,res)=>{

    const commentobj=new Comment({
        que_paper_id:req.body.que_paper_id,
        user_id:req.user,
        comment:req.body.comment
    })

    try{
        await commentobj.save();

        res.json("comment saved");
    }
    catch(err){
        res.status(400).json({
            error:err
        })
    }

})

module.exports=router