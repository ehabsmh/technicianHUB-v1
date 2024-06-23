import JobState from "../../../models/jobState.js";

class JobStateController {
  static async acceptJobRequest(req, res) {
    const techId = req.user._id;
    const acceptedReq = req.header('accepted_req');

    if (!acceptedReq) {
      return res.status(400).json({ error: 'No acceptedReq header found.' });
    }

    try {
      const jobState = await JobState.create({
        techId,
        acceptedReq,
        status: 'pending'
      });
      res.status(201).json({ message: 'Job request created successfully', jobState });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async completeJobRequest(req, res) {
    const techId = req.user._id;
    const jobId = req.params.id;

    try {
      // Send an email to the user to make sure the job is completed.

      const jobState = await JobState.findOneAndUpdate({ techId, _id: jobId },
        { status: 'completed' },
        { new: true });
      if (!jobState) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.status(200).json({ message: 'Job completed successfully', jobState });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default JobStateController;
