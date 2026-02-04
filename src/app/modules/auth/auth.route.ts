import { Router } from 'express';
import { AuthControllers } from './auth.controller.js';
import { verifyFirebase } from '../../middlewares/verifyFirebase.js';

const router = Router();

router.post(
  '/login',
  verifyFirebase,
  AuthControllers.loginUser
);

router.post(
  "/refresh-token",
  AuthControllers.refreshAccessToken
);

router.post(
  "/logout",
  AuthControllers.logoutUser
);

export const AuthRoutes = router;
