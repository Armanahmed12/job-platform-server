import { Router } from "express";
import { ApplicationController } from "./application.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth(), ApplicationController.applyToJob);
router.get("/", auth(), ApplicationController.getApplications);
// router.get("/:id", ApplicationController.getApplicationById);
// router.patch("/:id/status", ApplicationController.updateApplicationStatus);
// router.delete("/:id", ApplicationController.deleteApplication);

export const ApplicationRoutes = router;
