import express from 'express'
import { auth, userAuthorizations } from '../../../middlewares/auth.js';
import { getTechnician, getTechniciansByService } from '../../../Controllers/user.js';

const userRouter = express.Router();

userRouter.get('/users/technicians/', auth, userAuthorizations, getTechniciansByService);
userRouter.get('/users/technicians/:id', auth, userAuthorizations, getTechnician);

export default userRouter;
