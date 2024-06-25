import JobRequest from "../../../models/jobRequest.js";
import JobState from "../../../models/jobState.js";
import User from "../../../models/users.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../../utils/sendEmail.js";

class JobStateController {
  static async acceptJobRequest(req, res) {
    const techId = req.user._id;
    const requestNo = req.body.requestNo;

    if (!requestNo) {
      return res.status(400).json({ error: 'requestNo required' });
    }

    try {
      const jobReq = await JobRequest.findById(requestNo);
      if (!jobReq) {
        return res.status(404).json({ error: 'Job request not found' });
      }

      const jobState = await JobState.create({
        techId,
        userId: jobReq.requestBy,
        requestNo,
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

    jobState.status = 'pending confirmation';
    jobState.save();

    const token = await sendEmail(user, 'jobComplete.html', { jobState });

    if (!token) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.json({ message: 'Email sent to the user to confirm job completion', token });
  }

  static async completeJobRequest(req, res) {
    const jobToken = req.params.token;

    try {
      const { jobState } = jwt.verify(jobToken, process.env.JWT_CONFIRM_EMAIL_SECRET);
      console.log(jobState.status);
      if (jobState.status !== 'pending confirmation') {
        res.status(400).json({ error: 'Job not yet completed' });
      }

      await JobState.updateOne({ _id: jobState._id }, { status: 'completed' })

      if (!jobState) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.status(200).json({ message: 'Job completed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default JobStateController;
