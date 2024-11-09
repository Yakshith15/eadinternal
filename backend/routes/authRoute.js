const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const {username, email, password,role} = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({message: "User already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            role
        });
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign(
          { id: user._id, role: user.role },
          jwtSecret,
          { expiresIn: "1h" }
        );
        res.status(200).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
})

module.exports = router;