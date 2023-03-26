const express=require("express")
const {connection}=require("./db")
require("dotenv").config();
const {todoRouter}=require("./routes/todo.routes")
const {noteRouter}=require("./routes/note.routes");
const {auth}=require("./middlewares/auth.middleware");
const cors=require("cors");
const app=express()
app.use(cors());
app.use(express.json())
app.get("/",(req,res)=>{
    res.status(200).send("Welcome")
})

app.use("/todos",todoRouter);
app.use(auth);
app.use("/notes",noteRouter);
    
app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log("Connected to the db")
    }catch(err){
        console.log("Connection to db failed")
        console.log(err)
    }
    console.log(`Running the server at ${process.env.port}`)
})