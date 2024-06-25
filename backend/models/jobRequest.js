import mongoose, { Schema, Types } from "mongoose";

const jobRequestSchema = new Schema({
  requestTo: {
    type: Types.ObjectId,
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
    type: Types.ObjectId,
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
    type: String,
    required: [true, 'title is required.'],
    min: [8, 'Minimum is 8 characters.'],
    max: [30, 'Title is too long, Maximum of 30 characters.']
  },
  description: {
    type: String,
    required: [true, 'description is required.']
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

const JobRequest = mongoose.model('job_request', jobRequestSchema);
export default JobRequest
