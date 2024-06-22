import express from 'express'
import { userAuthorizations } from '../../../middlewares/auth.js';
import ReviewController from './../../../Controllers/review.js';
import UserController from './../../../Controllers/user.js';
import JobRequestController from '../../../Controllers/jobRequest.js';

const userRouter = express.Router();

/* User view to the technicians */
// Get technicians by service
userRouter.get('/technicians/', userAuthorizations, UserController.getTechniciansByService);

// Get technician by id
userRouter.get('/technicians/:techId', userAuthorizations, UserController.getTechnician);

/* User view to technicians Reviews */
// Create a user review for a technician
userRouter.post('/createReview', userAuthorizations,
  ReviewController.createTechnicianReview);

// Get technician reviews
userRouter.get('/technicians/:techId/reviews', ReviewController.getTechnicianReviews);

// Update a user review for a technician
userRouter.put('/technicians/reviews/:reviewId', userAuthorizations,
  ReviewController.updateTechnicianReview);

// Delete a user review for a technician
userRouter.delete('/technicians/reviews/:reviewId', userAuthorizations,
  ReviewController.deleteTechnicianReview);

/* User view to job requests sent to technicians */
// Create a job request
userRouter.post('/jobRequests', userAuthorizations, JobRequestController.createJobRequest);

export default userRouter;
