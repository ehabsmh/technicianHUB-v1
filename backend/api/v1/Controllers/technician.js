import mongoose, { Types } from "mongoose";
import Chat from "../../../models/chat.js";
import User from "../../../models/users.js";
import fs from 'fs';

class TechnicianController {
  static async updateTechnician(req, res) {
    const techId = req.user._id;
    const { salary, bio } = req.body;

    const technician = await User.findByIdAndUpdate(techId, {
      "technicianDetails.salary": salary,
      "technicianDetails.bio": bio
    });

    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json({ message: 'Technician updated successfully' });
  }

  static async updateImage(req, res) {
    const tech = req.user;
    // Check file if exists
    if (fs.existsSync(`${req.file.destination}${tech.image}`)) {
      // Remove the file
      fs.unlink(`${req.file.destination}${tech.image}`, (err) => {
        if (err) console.log(err);
      });
    }

    console.log(req.file);
    const technician = await User.findByIdAndUpdate(tech._id, {
      "image": req.file.filename
    });

    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json({ message: 'Technician updated successfully' });
  }

  static async getChats(req, res) {
    const tech = req.user;

    const matchTechChats = { $match: { receiverId: new Types.ObjectId('' + tech._id) } }
    const sortChatsDesc = { $sort: { createdAt: -1 } }
    const groupSenders = { $group: { _id: "$senderId", lastMsg: { $first: "$$ROOT" } } }
    const replaceDoc = { $replaceRoot: { newRoot: "$lastMsg" } }

    const chats = await Chat.aggregate([
      matchTechChats,
      sortChatsDesc,
      groupSenders,
      {
        $lookup: {
          from: "users",
          localField: "lastMsg.senderId",
          foreignField: "_id",
          as: "lastMsg.senderData"
        }
      },
      replaceDoc
    ])

    for (let i = 0; i < chats.length; i++) {
      delete chats[i].senderData[0].password;
      delete chats[i].senderData[0].emailConfirmed;
      delete chats[i].senderData[0].createdAt;
      delete chats[i].senderData[0].updatedAt;
      delete chats[i].senderData[0].customerDetails;
    }
    res.json({ chats });
  }
}

export default TechnicianController;
