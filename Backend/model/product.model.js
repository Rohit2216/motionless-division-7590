const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String
    },
    {
        versionKey:false
    }
)

const ProductModel=mongoose.model("product",userSchema)

module.exports={
    ProductModel
}