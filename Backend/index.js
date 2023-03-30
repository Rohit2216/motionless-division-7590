const express=require("express")

// const mongoose=require("mongoose")

const {connection}=require("./data")
const app=express()
const {userRouter}=require("./routes/user.router")
require("dotenv").config()

const cors=require("cors")
const { productRouter } = require("./routes/product.router")
const { authenticate } = require("./middleware/middleware.auth")
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(authenticate)
app.use("/product",productRouter)


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