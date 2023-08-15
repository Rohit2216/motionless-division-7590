const express = require("express")
const productRouter = express.Router()
const { ProductModel } = require("../model/product.model")

productRouter.get("/", async (req, res) => {
    try {
        const products = await ProductModel.find();
        console.log(products); // add this line to log the products in the console
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
});


productRouter.post("/create", async (req, res) => {
    const payload = req.body
    const product_things= new ProductModel(payload)
    await product_things.save()
    res.send({ msg: "Products Created" })
})


productRouter.get("/search", async (req, res) => {
    try {
        const { keyword } = req.query;

        // Search products based on the keyword using a case-insensitive regex
        const products = await ProductModel.find({
            $or: [
                { name: { $regex: new RegExp(keyword, "i") } },
                { title: { $regex: new RegExp(keyword, "i") } }
                // You can add more fields to search here if needed
            ]
        });

        console.log(products); // Log the searched products in the console

        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});




productRouter.patch("/update/:productId", async (req, res) => {
    const payload = req.body;
    const productId = req.params.productId; // Corrected to "productId" instead of "Id"

    console.log(payload,productId)

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            { _id: productId },
            payload
            // This option returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).send({ msg: "Product not found" });
        }

        res.status(200).send({ msg: "Updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});


productRouter.delete("/delete/:productId", async (req, res) => {
    const productId = req.params.productId; // Use req.params.productId
    try {
        await ProductModel.findByIdAndDelete({ _id: productId });
        res.status(200).send({ "msg": "Deleted successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});



module.exports = {
    productRouter
}