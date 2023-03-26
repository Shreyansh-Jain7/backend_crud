const express=require("express")
const {NoteModel}=require("../model/note.model")
const noteRouter=express.Router();


noteRouter.get("/",async (req,res)=>{
    // const decoded=jwt.verify(req.headers.authorization,"jain");
    let _id=req.query;
    // console.log(_id);
    try{
        const notes=await NoteModel.find({user:_id});
        res.status(200).send(notes);
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

noteRouter.post("/add",async (req,res)=>{
    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"note has been created"})    
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

noteRouter.patch("/update/:noteId",async (req,res)=>{
    let noteId=req.params.noteId;
    let payload=req.body;
    try{
        await NoteModel.findByIdAndUpdate({_id:noteId},payload)
        res.status(200).send(`Note with user id ${noteId} has been updated`)
    }catch(err){
        console.log(err)
        res.status(400).send({"err":"something went wrong"})
    }
})

noteRouter.delete("/delete/:noteId",async (req,res)=>{
    let noteId=req.params.noteId;
    try{
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.status(200).send(`Note with user id ${noteId} has been deleted from the database`)
    }catch(err){
        console.log(err)
        res.status(400).send({"err":"something went wrong"})
    }
})

module.exports={noteRouter};