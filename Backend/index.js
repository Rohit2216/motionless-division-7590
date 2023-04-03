const express = require("express");
const { connection } = require("./data");
const app = express();
const { userRouter } = require("./routes/user.router");
require("dotenv").config();

const cors = require("cors");

const { productRouter } = require("./routes/product.router");
const { authenticate } = require("./middleware/middleware.auth");
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/product", productRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.log("MongoDB is not connected.");
    console.log(error.message);
  }
  console.log(`Server is running on port ${process.env.PORT}.`);
});
