import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { Fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            Fullname,
            email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({ message: "User created successfully", user: {
            _id: createdUser._id,
            Fullname: createdUser.Fullname,
            email: createdUser.email,
        }});
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user: {
            _id: user._id,
            Fullname: user.Fullname,
            email: user.email
        }});
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
