import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const technicianDetailsSchema = new Schema({
    service: { type: String, required: true },
    salary: { type: Number, required: true },
    bio: { type: String, required: true },
    rate: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
}, { _id: false }); // Disable _id for sub-document schema

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true },
    role: { type: String, required: true, enum: ['user', 'technician'] },
    picture: { type: String },
    customerDetails: {
        type: new Schema({
            assignedTechIds: [{ type: Types.ObjectId, ref: 'User' }]
        },
            { _id: false }
        )
    },
    emailConfirmed: { type: Boolean, default: false },
    technicianDetails: {
        type: technicianDetailsSchema,
        required: function () {
            return this.role === 'technician';
        }
    },
}, {
    timestamps: true
});

const User = model('User', userSchema);

export default User;
