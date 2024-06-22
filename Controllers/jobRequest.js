import JobRequest from "../models/jobRequest.js";

class JobRequestController {
    static async createJobRequest(req, res) {
        const requestBy = req.user._id;
        const requestTo = req.header('technician_id');

        if (!requestTo) {
            return res.status(400).json({ error: "No technician_id header found." });
        }

        const { title, description } = req.body;
        try {
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
}

export default JobRequestController;
