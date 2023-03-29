const express=require("express")
const {connection}=require("./data")
require("dotenv").config()

const {userRouter}=require("./routes/user.router")
const app=express()

app.use(express.json())


app.use("/users",userRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("mongo is connected to successfully!")
    }catch(error){
        console.log("mongo is not connected ")
        console.log(error.message)
    }
    console.log(`server is running on ${process.env.port}`)
})