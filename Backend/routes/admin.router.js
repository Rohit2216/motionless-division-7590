const express = require("express");
const adminRouter = express.Router();
const { AdminModel } = require("../model/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register an admin user
adminRouter.post("/register", async (req, res) => {
    const { email, password, name, mobile } = req.body;
    try {
        bcrypt.hash(password, 10, async (err, hash) => { // Increased rounds for bcrypt
            if (err) {
                throw new Error(err);
            }
            const user = new AdminModel({ email, name, mobile, password: hash });
            await user.save();
            res.status(200).send({ msg: "Registered successfully" });
        });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});// Login for admin user
adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AdminModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    throw new Error(err);
                }
                if (result) {
                    const token = jwt.sign({ userId: user._id }, 'shhhhh', { expiresIn: '1h' }); // Added expiresIn
                    res.status(200).send({ msg: "Login successful", token });
                } else {
                    res.status(400).send({ msg: "Wrong Credentials" });
                }
            });
        } else {
            res.status(400).send({ msg: "User not found" });
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});


module.exports = { adminRouter };
