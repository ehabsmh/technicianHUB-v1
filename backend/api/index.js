import express from 'express'
import 'dotenv/config'
import db from '../db/db.js'
import { auth } from './v1/middlewares/auth.js';
import userRouter from './v1/views/user.js';
import authRouter from './v1/views/auth.js';
import techRouter from './v1/views/technician.js';
import cors from 'cors'
import { Server } from 'socket.io'

export const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'))
app.use("/api/v1/auth/", authRouter);
app.use(auth);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/technicians/", techRouter);
const server = app.listen(port, () => console.log(`Technician HUB listening on port ${port}!`));

const io = new Server(server, {
    cors: "*"
});

io.on('connection', (socket) => {
    console.log('user connected!');
    socket.on('chat message', (msg) => {
        console.log(msg);
    })
    socket.on('disconnect', () => {
        console.log("Disconnected");
    })
})
