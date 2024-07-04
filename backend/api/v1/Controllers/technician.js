import User from "../../../models/users.js";

class TechnicianController {
    static async updateTechnician(req, res) {
        const techId = req.user._id;
        const { salary, bio } = req.body;

        const technician = await User.findByIdAndUpdate(techId, {
            "technicianDetails.salary": salary,
            "technicianDetails.bio": bio
        });

        if (!technician) {
            return res.status(404).json({ error: 'Technician not found' });
        }

        res.json({ message: 'Technician updated successfully' });
    }
}

export default TechnicianController;
