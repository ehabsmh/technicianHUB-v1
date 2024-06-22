import mongoose from "mongoose";
import { hashSync } from "bcrypt";
import User from "../models/users.js";
import Review from "../models/reviews.js";

class DB {
    constructor() {
        const HOST = process.env.DB_HOST;
        const PORT = process.env.DB_PORT;
        const DB_NAME = process.env.DB_NAME;
        mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`).then(() => {
            console.log("Database connected");
        }).catch(() => {
            console.log("Error connecting to database");
        });
    }

    createUser(role, reqBody) {
        const { firstName, lastName, email, password, phone, address,
            birthDate, picture } = reqBody;

        const requiredFields = [
            "firstName", "lastName", "email", "password", "phone",
            "address", "birthDate", "role"
        ];

        const emptyField = requiredFields.find(field => !reqBody[field]);

        if (emptyField) {
            return emptyField;
        }
        const saltRounds = 10;
        const [mm, dd, yyyy] = birthDate.split('-');

        // Hash the password
        const hashed_pw = hashSync(password, saltRounds);

        const user = {
            firstName, lastName, email, password: hashed_pw,
            phone, address, birthDate: new Date(yyyy, mm, dd),
            role, picture
        }

        if (role === 'user') {
            user.customerDetails = {};
            user.customerDetails.assignedTechIds = [];
        }

        if (role === 'technician') {
            user.technicianDetails = reqBody.technicianDetails;
            if (!user.technicianDetails.service) return 'service';
            if (!user.technicianDetails.salary) return 'salary';
            if (!user.technicianDetails.bio) return 'bio';
        }

        const newUser = new User(user);

        return newUser;
    }

    async calculateTechnicianRate(technicianId) {
        const pipeline = [
            { $group: { _id: "$reviewedFor", rate: { $avg: "$rate" } } },
            { $match: { _id: new mongoose.Types.ObjectId('' + technicianId) } }
        ];

        const result = await Review.aggregate(pipeline);

        if (result.length === 0) return null;

        return result;
    }

    async updateTechRate(technicianId) {
        const techRate = await this.calculateTechnicianRate(technicianId);

        if (!techRate) return false;

        const [{ rate }] = techRate;
        const technician = await User.findByIdAndUpdate(technicianId, { "technicianDetails.rate": rate });

        if (!technician) return false;

        return true;
    }

    async updateReviewsCount(technicianId, value) {
        const technicianUpdated = await User.findByIdAndUpdate(technicianId, {
            $inc: {
                "technicianDetails.reviewsCount": value
            }
        })

        return technicianUpdated;
    }
}

const db = new DB();
export default db;
