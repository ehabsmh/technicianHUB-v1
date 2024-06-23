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
  acceptedReq: {
    type: Types.ObjectId,
    ref: 'job_request',
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed']
  }
}, { timestamps: true });

const JobState = mongoose.model('job_state', jobStateSchema);
export default JobState;
