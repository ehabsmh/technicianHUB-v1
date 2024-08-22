import express from 'express'
import ChatController from '../Controllers/chat.js';

const chatRouter = express.Router();
chatRouter.get('/conversation/:userId', ChatController.getConversation);

export default chatRouter;
