import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userRegister = async (req, res) => {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: "User already exists" });
    }
    else {
        const newUser = new User({
            email,
            name,
            password,
        });
        newUser.save();
        return res.json(newUser);
    }
}

const userLogin = async (req, res) => { 
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    }
    else {
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else return res.json({ token: token });
        });
    }
}

export { userLogin, userRegister };