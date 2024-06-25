import express from 'express'
import { technicianAuthorizations } from '../middlewares/auth.js';
import JobRequestController from '../Controllers/jobRequest.js';
import JobStateController from '../Controllers/jobState.js';
import TechnicianController from '../Controllers/technician.js';

const techRouter = express.Router();

/* Technician view to the users */

// Update a technician
techRouter.put('/:id', technicianAuthorizations,
    TechnicianController.updateTechnician);

// Get users job requests.
techRouter.get('/jobRequests', technicianAuthorizations,
    JobRequestController.getJobRequests);

// Get a user job request.
techRouter.get('/jobRequests/:id', technicianAuthorizations,
    JobRequestController.getJobRequest);

// Refuse a user job request.
techRouter.delete('/jobRequests/:id', technicianAuthorizations,
    JobRequestController.refuseJobRequest);

// Accept a user job request.
techRouter.post('/jobState', technicianAuthorizations,
    JobStateController.acceptJobRequest);

// Sends email to user to confirm job completion.
techRouter.put('/jobState/:id', technicianAuthorizations,
    JobStateController.pendingConfirmation);


export default techRouter;
