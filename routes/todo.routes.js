const express=require("express")
const {TodoModel}=require("../model/todo.model")
const todoRouter=express.Router();
const jwt=require("jsonwebtoken");

todoRouter.get("/",async (req,res)=>{
    const query=req.query;
    const token=req.headers.authorization;
    let flag=0;
    jwt.verify(token, 'jain', function(err, decoded) {
        decoded?flag=1:flag=0;
    });
    if(flag==1){
        try{
            const users=await TodoModel.find(query);
            res.status(200).send(users);
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(400).send({"err":"login required"});
    }
})

todoRouter.post("/register",async (req,res)=>{
    const data=req.body
    try{
        const user=new TodoModel(data)
        await user.save()
        res.status(200).send({"msg":"user has been created"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

todoRouter.post("/login",async (req,res)=>{
    const {name,password}=req.body;
    try{
        const user=await TodoModel.find({name,password});
        user.length>0? res.status(200).send({"msg":"login succesful","token":jwt.sign({names:"Shreyansh"},"jain",{expiresIn: '1h'})}):
            res.status(400).send({"err":"login failed"});
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

todoRouter.patch("/:todoId",async (req,res)=>{
    const userID=req.params.todoId;
    const payload=req.body;
    const token=req.headers.authorization;
    let flag=0;
    let error="login required";
    jwt.verify(token, 'jain', function(err, decoded) {
        err?error=err.message:0;
        decoded?flag=1:flag=0;
    });
    if(flag==1){
        try{
            await TodoModel.findByIdAndUpdate({_id:userID},payload)
            res.status(200).send(`User with user id ${userID} has been updated`)
        }catch(err){
            console.log(err)
            res.status(400).send({"err":"something went wrong"})
        }
    }else{
        res.status(400).send({"err":error});
    }
})
todoRouter.delete("/:todoId",async (req,res)=>{
    const userID=req.params.todoId
    const token=req.headers.authorization;
    let flag=0;
    jwt.verify(token, 'jain', function(err, decoded) {
        decoded?flag=1:flag=0;
    });
    if(flag==1){
        try{
            await TodoModel.findByIdAndDelete({_id:userID})
            res.status(200).send(`User with user id ${userID} has been deleted from the database`)
        }catch(err){
            console.log(err)
            res.status(400).send({"err":"something went wrong"})
        }
    }else{
        res.status(400).send({"err":"login required"});
    }
})

module.exports={todoRouter}