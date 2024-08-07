import express from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { technicianAuthorizations } from '../middlewares/auth.js';
import JobRequestController from '../Controllers/jobRequest.js';
import JobStateController from '../Controllers/jobState.js';
import TechnicianController from '../Controllers/technician.js';

const techRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    }
})

function fileFilter(req, file, cb) {

    // accept images only
    if (file.mimetype.startsWith('image')) cb(null, true)
    else cb(new Error('Only images supported.'), false)

}
const upload = multer({ storage, fileFilter })

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

techRouter.get('/jobState/:jobId/status', technicianAuthorizations,
    JobStateController.jobStatus);

techRouter.post('/updateImage', technicianAuthorizations, upload.single('image'),
    TechnicianController.updateImage);

export default techRouter;
