import express from 'express'
import User from '../../../models/users.js';
import { getUser, getUsers } from '../../../Controllers/user.js';

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);

export default userRouter;
