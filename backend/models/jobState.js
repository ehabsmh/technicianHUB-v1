import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const jobStateSchema = new Schema({
  techId: {
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
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, "User ID is required"],
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findById(userId);
        return user && user.role === 'user';
      },
      message: props => `${props.value} Is not a valid client ID`
    }
  },
  requestNo: {
    type: Types.ObjectId,
    ref: 'job_request',
    required: true,
    // unique: true
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'pending confirmation', 'completed'],
      message: '{VALUE} is not supported'
    }
  }
}, { timestamps: true });

const JobState = mongoose.model('job_state', jobStateSchema);
export default JobState;
