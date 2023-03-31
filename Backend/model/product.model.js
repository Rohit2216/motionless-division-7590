const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    
        title: String,
        link: String,
        condition: String,
        price: {
          currency: String, 
          value: Number
        },
        shipping: String,
        location: String,
        extensions: [
          {
            name: String
          }
        ],
        thumbnail: String
      },
    {
        versionKey:false
    }
)

const ProductModel=mongoose.model("product",userSchema)

module.exports={
    ProductModel
}