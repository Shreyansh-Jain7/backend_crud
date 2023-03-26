const mongoose=require("mongoose")
const todoSchema=mongoose.Schema({
    name:String,
    age:Number,
    password:String
},{
    versionKey:false
})
const TodoModel=mongoose.model("user",todoSchema)
module.exports={TodoModel}