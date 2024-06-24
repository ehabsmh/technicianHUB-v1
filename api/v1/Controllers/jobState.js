import JobRequest from "../../../models/jobRequest.js";
import JobState from "../../../models/jobState.js";
import User from "../../../models/users.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../../utils/sendEmail.js";

class JobStateController {
  static async acceptJobRequest(req, res) {
    const techId = req.user._id;
    const acceptedReq = req.header('accepted_req');

    if (!acceptedReq) {
      return res.status(400).json({ error: 'No accepted_req header found.' });
    }

    try {
      const jobReq = await JobRequest.findById(acceptedReq);
      if (!jobReq) {
        return res.status(404).json({ error: 'Job request not found' });
      }

      const userId = jobReq.requestBy;

      const jobState = await JobState.create({
        techId,
        acceptedReq,
        userId,
        status: 'pending'
      });
      res.status(201).json({ message: 'Job request successfully accepted', jobState });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async pendingConfirmation(req, res) {
    const jobStateId = req.params.id;
    const jobState = await JobState.findById(jobStateId);

    if (!jobState) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if (jobState.status === 'completed') {
      return res.status(400).json({ error: 'Job already completed' });
    }

    const userId = jobState.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = await sendEmail(user, 'jobComplete.html', { jobState });
    await jobState.updateOne({ status: 'pending confirmation' });
    if (!token) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.json({ message: 'Email sent to the user to confirm job completion', token });
  }

  static async completeJobRequest(req, res) {
    const jobToken = req.params.token;

    try {
      const jobState = jwt.verify(jobToken, process.env.JWT_CONFIRM_EMAIL_SECRET);
      console.log(jobState);
      if (jobState.status !== 'pending confirmation') {
        res.status(400).json({ error: 'Job not yet completed' });
      }

      const jobUpdated = await jobState.updateOne({ status: 'completed' }, { new: true });

      if (!jobState) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.status(200).json({ message: 'Job completed successfully', jobUpdated });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default JobStateController;
