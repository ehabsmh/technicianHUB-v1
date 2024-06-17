import User from "../models/users.js";

export const getUsers = async (req, res) => {
    const users = await User.find({ role: 'user' });
    res.json(users);
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        res.json(user);
    } catch (err) {
        res.json({ "error": "User not found" })
    }
}
