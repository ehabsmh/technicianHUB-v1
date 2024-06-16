import express from 'express'
import User from '../../../models/users.js';

const techRouter = express.Router();

techRouter.get('/technicians', async (req, res) => {
    const users = await User.find({ role: 'technician' });
    res.json(users);
});

techRouter.get('/technicians/:id', async (req, res) => {
    const techId = req.params.id;
    const user = await User.findOne({ _id: techId, role: 'technician' }, {
        firstName: 1,
        lastName: 1,
        phone: 1,
        picture: 1,
        technicianDetails: 1

    });
    res.json(user);
});

export default techRouter;
