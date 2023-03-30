const express = require("express")
const productRouter = express.Router()
const { ProductModel } = require("../model/product.model")

productRouter.get("/", async (req, res) => {
    try {
        const products=await ProductModel.find()
        res.status(200).send(products)

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

productRouter.post("/create", async (req, res) => {
    const payload = req.body
    const product_note = new ProductModel(payload)
    await product_note.save()
    res.send({ "msg": "Note Created" })
})


productRouter.patch("/update/:productId", async (req, res) => {
    const payload=req.body
    const productId=req.params.noteId
    try{
        await ProductModel.findByIdAndUpdate({_id:productId},payload)
        res.status(200).send({"msg":"note updated succesfuly"})

    }catch(error){
        res.status(400).send({"msg":error.message})

    }
})

productRouter.delete("/delete/:productId", async (req, res) => {
    // const payload=req.body
    const productId=req.params.noteId
    try{
        await ProductModel.findByIdAndDelete({_id:productId})
        res.status(200).send({"msg":"note deleted succesfuly"})

    }catch(error){
        res.status(400).send({"msg":error.message})

    }
})


module.exports = {
    productRouter
}