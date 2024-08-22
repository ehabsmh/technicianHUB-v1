import express from 'express'
import 'dotenv/config'
import db from '../db/db.js'
import { auth } from './v1/middlewares/auth.js';
import userRouter from './v1/views/user.js';
import authRouter from './v1/views/auth.js';
import techRouter from './v1/views/technician.js';
import cors from 'cors'
import { Server } from 'socket.io'
import Chat from '../models/chat.js';
import chatRouter from './v1/views/chat.js';

export const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'))
app.use("/api/v1/auth/", authRouter);
app.use(auth);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/technicians/", techRouter);
app.use("/api/v1/", chatRouter);
const server = app.listen(port, () => console.log(`Technician HUB listening on port ${port}!`));

const io = new Server(server, {
  cors: "*"
});

export default io;

io.on('connection', (socket) => {
  let roomName;
  socket.on('joinRoom', ({ clientId, technicianId }) => {
    roomName = `${clientId}-${technicianId}`
    socket.join(roomName);
    console.log(`${socket.id} joined room ${roomName}`);
  })

  socket.on("leaveRoom", ({ clientId, technicianId }) => {
    roomName = `${clientId}-${technicianId}`;
    socket.leave(roomName);
    console.log(`${socket.id} left room ${roomName}`);
  })

  socket.on('chat message', async (msgInfo) => {
    // const roomName = `${msgInfo.senderId}-${msgInfo.receiverId}`;
    const message = await Chat.create(msgInfo);
    io.to(roomName).emit('chat message', message);
    io.emit('new-chat', msgInfo);
  });
  socket.on('disconnect', () => {
    console.log("Disconnected");
  });
});
