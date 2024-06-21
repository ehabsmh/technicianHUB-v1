import Review from "../models/reviews.js";
class ReviewController {
    static async createTechnicianReview(req, res) {
        const technicianId = req.headers.technician_id;

        if (!technicianId) return res.status(400).json({ error: "technicianId is required" });

        try {
            const review = new Review({
                userId: req.user._id,
                technicianId: technicianId,
                content: req.body.content,
                rate: req.body.rate
            });

            await review.save();

            res.status(201).json({ review });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export default ReviewController;
