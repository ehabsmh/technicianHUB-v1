import User from "../models/users.js";

export const getTechnician = async (req, res) => {
    const techId = req.params.id;
    const projection = {
        firstName: 1, lastName: 1, picture: 1, technicianDetails: 1
    }

    const user = await User.findOne({ _id: techId, role: 'technician' }, projection);
    if (!user) {
        return res.status(404).json({ "error": "Technician not found" });
    }

    res.json(user);
}


export const getTechniciansByService = async (req, res) => {
    const service = req.query.service;

    try {
        const technicians = await User.find({
            'technicianDetails.service': service,
            'technicianDetails.isAvailable': true
        });
        res.json(technicians);
    } catch (error) {
        res.status(401).json({ "error": "Failed to get technicians", err: error });
    }
}

export const getTechnicianProfile = async (req, res) => {

}
