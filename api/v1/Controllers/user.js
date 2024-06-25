import User from "../../../models/users.js";

class UserController {
  static async getTechnician(req, res) {
    const techId = req.params.techId;

    const projection = {
      firstName: 1, lastName: 1, picture: 1, technicianDetails: 1
    }

    const technician = await User.findOne({ _id: techId, role: 'technician' }, projection);
    if (!technician) {
      return res.status(404).json({ "error": "Technician not found" });
    }

    res.json({ technician });
  }

  static async getTechniciansByService(req, res) {
    const service = req.query.service;
    if (!service) {
      return res.status(400).json({
        "usage": [{
          purpose: "Get technicians by service",
          example: "/api/v1/users/technicians?service=Electrician"
        },
        {
          purpose: "Get technician by Id",
          example: "/api/v1/users/technicians/:techId"
        }],
      });
    }

    try {
      const projection = {
        password: 0, role: 0,
      }
      const technicians = await User.find({
        'technicianDetails.service': service.toLowerCase(),
        'technicianDetails.isAvailable': true
      }, projection);

      res.json({ technicians });
    } catch (error) {
      res.status(401).json({ "error": error });
    }
  }
}

export default UserController;
