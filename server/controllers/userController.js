import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
        return res.status(403).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered",
            data: newUser
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing Field" });
    }

    try {
        const getUser = await User.findOne({ email });

        if (!getUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const passwordCheck = await bcrypt.compare(password, getUser.password);

        if (!passwordCheck) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const payload = {
            _id: getUser._id,
            email: getUser.email,
            fullName: getUser.fullName
        };

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: getUser,
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};