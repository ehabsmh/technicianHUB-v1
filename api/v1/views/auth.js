import express from 'express'
import { confirmEmail, login, register } from '../../../Controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.get('/emailConfirmation', confirmEmail);
authRouter.post('/login', login);

export default authRouter;
