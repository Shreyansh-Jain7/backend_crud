const express=require("express")
const {connection}=require("./db")
require("dotenv").config();
const {todoRouter}=require("./routes/todo.routes")
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.status(200).send("Welcome")
})

app.use("/todos",todoRouter)
    
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