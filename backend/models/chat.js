import { model, Schema, Types } from "mongoose";

const chatSchema = new Schema({
    senderId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: String,

}, { timestamps: true });

const Chat = model('chat', chatSchema);
export default Chat;
