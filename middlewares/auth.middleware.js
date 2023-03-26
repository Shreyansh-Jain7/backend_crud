const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,"jain");
        if(decoded){
            req.body.user=decoded.userId;
            req.query=decoded.userId
            next();
        }else{
            res.status(400).send({"msg":"please login"});
        }
    }else{
        res.status(400).send({"msg":"please login"});
    }
}
module.exports={auth};