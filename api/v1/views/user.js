import express from 'express'
import { auth, userAuthorizations } from '../../../middlewares/auth.js';
import { getTechnician, getTechniciansByService } from '../../../Controllers/user.js';
import ReviewController from './../../../Controllers/review.js';

const userRouter = express.Router();

// technicians views to the users
userRouter.get('/technicians/', auth, userAuthorizations, getTechniciansByService);
userRouter.get('/technicians/:id', auth, userAuthorizations, getTechnician);

// technicians Reviews views to the users
userRouter.post('/technicians/reviews', auth, userAuthorizations, ReviewController.createTechnicianReview);
// userRouter.get('/technicians/:id/reviews', auth, userAuthorizations, getTechnicianReviews);

export default userRouter;
