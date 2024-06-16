import express from 'express'
import User from '../../../models/users.js';

const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
  const users = await User.find({ role: 'user' });
  res.json(users);
});

export default userRouter;
