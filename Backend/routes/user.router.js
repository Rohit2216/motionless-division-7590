const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/product.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


userRouter.post("/register",async(req,res)=>{
    const {email,password,name,mobile}=req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash)=> {
            // Store hash in your password DB.
            const user= new UserModel({email,name,mobile,password:hash})

            await user.save()
        res.status(200).send({"msg":"register successfully"})
        });
        // const user=await UserModel(req.body)
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email})
    //    console.log(user)
    if(user){
        bcrypt.compare(password, user.password, async (err, result)=> {
            // result == true
            if(result){
                res.status(200).send({"msg":"login successfully","token":jwt.sign({"userId":user._id}, 'shhhhh')})
            }else{
                res.status(400).send({"msg":"Wrong Credentials"})

            }
        });
    }
        // user.length>0? res.status(200).send({"msg":"login successfully","token":jwt.sign({ foo: 'bar' }, 'shhhhh')}):
        // res.status(400).send({"msg":"Login failed"})

    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
})

userRouter.get("/details",(req,res)=>{
    // const {token}=req.query;
    const token=req.headers.authorization
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        decoded? res.status(200).send("users details"):res.status(400).send({"msg":"login required,users details not match"}) // bar
      });
    //   console.log(token)
    // if(token=="abc@jfksdi"){
    //     res.status(200).send("users details")
    // }else{
    //     res.status(400).send({"msg":"login required,users details not match"})
    // }
})

module.exports={
    userRouter
}