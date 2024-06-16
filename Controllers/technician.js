import User from "../models/users.js";

export const getTechnicians = async (req, res) => {
    const users = await User.find({ role: 'technician' });
    res.json(users);
}

export const getTechnician = async (req, res) => {
    const techId = req.params.id;
    const projection = {
        firstName: 1, lastName: 1, phone: 1, picture: 1, technicianDetails: 1
    }

    const user = await User.findOne({ _id: techId, role: 'technician' }, projection);
    if (!user) {
        return res.status(404).json({ "error": "Technician not found" });
    }

    res.json(user);
}
