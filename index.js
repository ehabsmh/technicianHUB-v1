import express from 'express'
import 'dotenv/config'
import db from './db/db.js'
import { auth } from './middlewares/auth.js';
import userRouter from './api/v1/views/user.js';
import authRouter from './api/v1/views/auth.js';
import techRouter from './api/v1/views/technician.js';

export const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/v1/auth/", authRouter);
app.use(auth);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/technicians/", techRouter);

export const server = app.listen(port, () => console.log(`Technician HUB listening on port ${port}!`));
