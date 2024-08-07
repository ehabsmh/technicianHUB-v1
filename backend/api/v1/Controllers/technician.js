import User from "../../../models/users.js";
import fs from 'fs';

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

  static async updateImage(req, res) {
    const tech = req.user;
    // Check file if exists
    if (fs.existsSync(`${req.file.destination}${tech.image}`)) {
      // Remove the file
      fs.unlink(`${req.file.destination}${tech.image}`, (err) => {
        if (err) console.log(err);
      });
    }

    console.log(req.file);
    const technician = await User.findByIdAndUpdate(tech._id, {
      "image": req.file.filename
    });

    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json({ message: 'Technician updated successfully' });
  }
}

export default TechnicianController;
