import express from 'express'
import AuthController from '../../../Controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/register', AuthController.register);
authRouter.get('/emailConfirmation', AuthController.confirmEmail);
authRouter.post('/login', AuthController.login);

export default authRouter;
