import JobRequest from "../../../models/jobRequest.js";
import JobState from "../../../models/jobState.js";
import User from "../../../models/users.js";
import jwt from 'jsonwebtoken';
import { sendCompleteJobEmail } from "../../../utils/sendCompleteJobEmail.js";

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
        jobDetails: {
          requestNo,
          title: jobReq.title,
          description: jobReq.description
        },
        status: 'pending'
      },);

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

    const token = jwt.sign({ user, jobState }, process.env.JWT_CONFIRM_EMAIL_SECRET);
    await sendCompleteJobEmail(user, token);

    res.json({ message: 'Email sent to the user to confirm job completion' });
  }

  static async completeJobRequest(req, res) {
    const jobToken = req.params.token;

    try {
      const { jobState } = jwt.verify(jobToken, process.env.JWT_CONFIRM_EMAIL_SECRET);

      if (jobState.status !== 'pending confirmation') {
        res.status(400).json({ error: 'Job not yet completed' });
      }

      const job = await JobState.findByIdAndUpdate({ _id: jobState._id }, { status: 'completed' })

      if (!jobState) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.status(200).json({ message: 'Job completed successfully', job });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async jobStatus(req, res) {
    const { jobId } = req.params;
    try {
      const jobState = await JobState.findById(jobId, { status: 1, userId: 1 });
      if (!jobState) {
        return res.status(404).json({ error: 'Job not found' });
      }
      console.log(jobState);
      res.json({ status: jobState.status, userId: jobState.userId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getCompletedJobs(req, res) {
    const { techId } = req.params;
    try {
      const completedJobs = await JobState.find({ techId, status: 'completed' }, { jobDetails: 1 });
      if (!completedJobs) {
        res.status(404).json({ completedJobs: [] });
      }
      res.json({ completedJobs });
    } catch (error) {
      console.log(error);
    }
  }
}
export default JobStateController;
