import mongoose, { Schema, Types } from "mongoose";

const jobRequestSchema = new Schema({
  requestTo: {
    types: Types.ObjectId(),
    ref: 'User',
    required: true,
    validate: {
      validator: async function (technicianId) {
        const user = await mongoose.model('User').findById(technicianId);
        return user && user.role === 'technician';
      },
      message: props => `${props.value} Is not a valid technician ID`
    }
  },
  requestBy: {
    types: Types.ObjectId(),
    ref: 'User',
    required: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findById(userId);
        return user && user.role === 'user';
      },
      message: props => `${props.value} Is not a valid client ID`
    }
  },
  title: {
    types: String,
    required: [true, 'title is required.'],
    min: [8, 'Minimum is 8 characters.'],
    max: [30, 'Title is too long, Maximum of 30 characters.']
  },
  description: {
    types: String,
    required: [true, 'description is required.']
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);
export default JobRequest
