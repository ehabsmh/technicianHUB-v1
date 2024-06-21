import mongoose from "mongoose";
import Review from "../models/reviews.js";
import User from "../models/users.js";

const calculateTechnicianRate = async (technicianId) => {
  const pipeline = [
    { $group: { _id: "$reviewedFor", rate: { $avg: "$rate" } } },
    { $match: { _id: new mongoose.Types.ObjectId('' + technicianId) } }
  ];
  const result = await Review.aggregate(pipeline);
  if (result.length === 0) return null;
  return result;
}

const updateTechRate = async (technicianId) => {
  const techRate = await calculateTechnicianRate(technicianId);
  if (!techRate) return false;
  const [{ rate }] = techRate;
  const technician = await User.findByIdAndUpdate(technicianId, { "technicianDetails.rate": rate });
  if (!technician) return false;
  return true;
}

const updateReviewsCount = async (technicianId, value) => {
  const technicianUpdated = await User.findByIdAndUpdate(technicianId, {
    $inc: {
      "technicianDetails.reviewsCount": value
    }
  })
  return technicianUpdated;
}

export { updateTechRate, updateReviewsCount };
