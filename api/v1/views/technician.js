import express from 'express'
import User from '../../../models/users.js';
import { getTechnician, getTechnicians } from '../../../Controllers/technician.js';

const techRouter = express.Router();

techRouter.get('/technicians', getTechnicians);

techRouter.get('/technicians/:id', getTechnician);

export default techRouter;
