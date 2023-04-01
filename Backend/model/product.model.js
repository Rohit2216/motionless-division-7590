const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
        name:String,
        title:String,
        price:Number,
        image:String

      },
    {
        versionKey:false
    }
)

const ProductModel=mongoose.model("product",userSchema)

module.exports={
    ProductModel
}