import { Router } from 'express';
import { jobRoutes } from '../modules/job/job.route.js';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { UserRoutes } from '../modules/user/user.route.js';
import { ApplicationRoutes } from '../modules/application/application.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/jobs',
    route: jobRoutes,
  },
  {
    path : "/auth",
    route : AuthRoutes
  },
  {
    path : "/users",
    route : UserRoutes
  },
  {
    path : "/applications",
    route : ApplicationRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
