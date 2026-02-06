import { Router } from "express";

const router = Router();

import { jobController } from './job.controller.js';
import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

router.post('/', auth(), authorize("candidate"), jobController.createJob);
router.get('/', jobController.getJobs);
router.get('/my', auth(), jobController.getMyJobPosts);
router.get('/:id', jobController.getJobById);
router.patch('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

export const jobRoutes = router;
