import express from 'express'
import AuthController from '../Controllers/auth.js';
import { auth } from '../middlewares/auth.js';
const authRouter = express.Router();


authRouter.post('/register', AuthController.register);
authRouter.get('/confirmEmail', AuthController.confirmEmail);
authRouter.post('/login', AuthController.login);
authRouter.post('/refreshToken', auth, AuthController.refreshToken);

export default authRouter;
