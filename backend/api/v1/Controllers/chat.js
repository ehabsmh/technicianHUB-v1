import Chat from "../../../models/chat.js";

export default class ChatController {
  static async getConversation(req, res) {
    const loggedUser = req.user;
    const { userId } = req.params;
    try {
      const conversation = await Chat.find({
        $or: [
          { senderId: userId, receiverId: loggedUser._id },
          { receiverId: userId, senderId: loggedUser._id }
        ]
      }).sort({ createdAt: 1 });

      res.json(conversation);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
