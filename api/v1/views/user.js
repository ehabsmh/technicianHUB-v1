import express from 'express'
import { userAuthorizations } from '../../../middlewares/auth.js';
import ReviewController from './../../../Controllers/review.js';
import UserController from './../../../Controllers/user.js';
import JobRequestController from '../../../Controllers/jobRequest.js';

const userRouter = express.Router();

// User view to the technicians
userRouter.get('/technicians/', userAuthorizations, UserController.getTechniciansByService);
userRouter.get('/technicians/:techId', userAuthorizations, UserController.getTechnician);

// User view to technicians Reviews
userRouter.post('/createReview', userAuthorizations,
    ReviewController.createTechnicianReview);
userRouter.get('/technicians/:techId/reviews', ReviewController.getTechnicianReviews);
userRouter.put('/technicians/reviews/:reviewId', userAuthorizations,
    ReviewController.updateTechnicianReview);
userRouter.delete('/technicians/reviews/:reviewId', userAuthorizations,
    ReviewController.deleteTechnicianReview);

// User view to job requests sent to technicians
userRouter.post('/jobRequests', userAuthorizations, JobRequestController.createJobRequest);
export default userRouter;
