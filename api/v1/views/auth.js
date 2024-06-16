import express from 'express'
import User from '../../../models/users.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, address,
        birthDate, role, picture } = req.body;

    const [mm, dd, yyyy] = birthDate.split('-');

    try {
        let newUser;

        if (role === 'user') {
            newUser = new User({
                firstName, lastName, email, password,
                phone, address, birthDate: new Date(yyyy, mm, dd),
                role, picture, customerDetails: { assignedTechIds: [] }
            });
        }

        if (role === 'technician') {

            newUser = new User({
                firstName, lastName, email, password,
                phone, address, birthDate: new Date(yyyy, mm, dd),
                role, picture, technicianDetails: req.body.technicianDetails,
            });
        }

        await newUser.save();
        res.json({ "message": "User created successfully", newUser });

    } catch (err) {
        if (err.errmsg?.includes("duplicate key") && err.errmsg.includes("email")) {
            return res.status(409).json({ "error": "Email already exists" });
        }

        if (err.errmsg?.includes("duplicate key") && err.errmsg.includes("phone")) {
            return res.status(409).json({ "error": "Phone number already registered" });
        }

        res.status(400).json({ "error": err });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(404).json({ "error": "Incorrect email or password" });
    }

    res.json({ "message": "Login successful", token: user })
});

export default authRouter;
