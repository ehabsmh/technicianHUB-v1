import express from 'express'
import User from '../../../models/users.js';
import { getUsers } from '../../../Controllers/user.js';

const userRouter = express.Router();

userRouter.get('/users', getUsers);

export default userRouter;
