import JobRequest from "../../../models/jobRequest.js";

class JobRequestController {
  static async createJobRequest(req, res) {
    const requestBy = req.user._id;
    const requestTo = req.header('technician_id');

    if (!requestTo) {
      return res.status(400).json({ error: "No technician_id header found." });
    }

    const { title, description } = req.body;


    try {
      const alreadyRequested = await JobRequest.findOne({ requestBy, requestTo });
      if (alreadyRequested) throw new Error("You have already hired this technician");

      const jobRequest = await JobRequest.create({
        requestBy,
        requestTo,
        title,
        description
      })

      res.status(201).json({ message: "Job request created successfully", jobRequest })
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getJobRequests(req, res) {
    const techId = req.user._id;

    const projection = {
      requestTo: 0,
      title: 0,
      description: 0,
      __v: 0
    }

    const jobs = await JobRequest.find({ requestTo: techId }, projection)
      .populate('requestBy', "firstName lastName picture");

    if (jobs.length === 0) {
      return res.status(404).json({ jobs });
    }

    res.status(200).json({ jobs });
  }

  static async getJobRequest(req, res) {
    const techId = req.user._id;
    const requestId = req.params.id;

    const projection = {
      requestTo: 0,
      __v: 0
    }

    const job = await JobRequest.findOne({ _id: requestId, requestTo: techId }, projection)
      .populate('requestBy', "firstName lastName address phone picture");

    if (!job) {
      return res.status(404).json({ error: "Job request not found" });
    }

    res.status(200).json({ job });
  }

  static async refuseJobRequest(req, res) {
    const techId = req.user._id;
    const requestId = req.params.id;

    const job = await JobRequest.findOneAndDelete({ _id: requestId, requestTo: techId });

    if (!job) {
      return res.status(404).json({ error: "Job request not found" });
    }

    res.status(200).json({ message: "Job request refused successfully" });

  }
}

export default JobRequestController;