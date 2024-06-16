import express from 'express'
import DB from './db/db.js'
import userRouter from './api/v1/views/user.js';
import authRouter from './api/v1/views/auth.js';
import techRouter from './api/v1/views/technician.js';

const app = express();
const port = 3000;
const db = new DB();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", techRouter);



app.listen(port, () => console.log(`Technician HUB listening on port ${port}!`));
