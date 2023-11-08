import { Router } from 'express';
import { getAllJobs, getSingleJob, creteJob, editJob, deleteJob, showStats } from '../controllers/jobController.js';
import { checkTestUser, validateJobInput, validateParamID } from '../middlewares/validatorMiddleware.js';
const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, checkTestUser, creteJob);
router.route('/stats').get(showStats);
router
    .route('/:jobId')
    .patch(validateJobInput, validateParamID, checkTestUser, editJob)
    .delete(validateParamID, checkTestUser, deleteJob)
    .get(validateParamID, getSingleJob);

export default router;
