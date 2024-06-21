import mongoose from "mongoose";
import { Types } from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewedBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (userId) {
                const user = await mongoose.model('User').findById(userId);
                return user && user.role === 'user';
            }
        }
    },

    reviewedFor: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (technicianId) {
                const user = await mongoose.model('User').findById(technicianId);
                return user && user.role === 'technician';
            }
        }
    },

    content: String,

    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema);
export default Review;
