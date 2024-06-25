import db from "../../../db/db.js";
import Review from "../../../models/reviews.js";

class ReviewController {
  static async createTechnicianReview(req, res) {
    const technicianId = req.body.technicianId;

    if (!technicianId) return res.status(400).json({ error: "technicianId is required" });

    try {
      const userId = req.user._id;
      const alreadyReviewed = await Review.findOne({
        reviewedBy: userId,
        reviewedFor: technicianId
      });

      if (alreadyReviewed) {
        return res.status(400).json({ error: "You have already reviewed this technician" });
      }

      const review = new Review({
        reviewedBy: userId,
        reviewedFor: technicianId,
        content: req.body.content,
        rate: req.body.rate
      });

      await review.save();

      const technicianUpdated = await db.updateReviewsCount(technicianId, 1);

      if (!technicianUpdated) {
        return res.status(400).json({ error: "Failed to update technician reviews count" });
      }
      const result = await db.updateTechRate(technicianId);

      if (!result) throw new Error('Failed to update technician rate');

      res.status(201).json({ review });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  static async getTechnicianReviews(req, res) {
    const reviewedFor = req.params.techId;
    const techReviews = await Review.find({ reviewedFor }, { "reviewedFor": 0 })
      .populate('reviewedBy', 'firstName lastName picture');

    if (!techReviews) return res.status(404).json({ reviews: [] });
    res.json({ reviews: techReviews });
  }

  static async updateTechnicianReview(req, res) {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.reviewedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not allowed to update this review" });
    }

    if (req.body.rate) {
      const result = await db.updateTechRate(review.reviewedFor);
      if (!result) throw new Error('Failed to update technician rate');
    }

    await Review.updateOne({ _id: reviewId }, req.body);

    res.json({ message: "Review updated successfully" });
  }

  static async deleteTechnicianReview(req, res) {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.reviewedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not allowed to delete this review" });
    }

    const technicianUpdated = await db.updateReviewsCount(review.reviewedFor, -1);

    if (!technicianUpdated) {
      return res.status(400).json({ error: "Failed to update technician reviews count" });
    }

    await Review.deleteOne({ _id: reviewId });

    res.json({ message: "Review deleted successfully" });
  }
}

export default ReviewController;
