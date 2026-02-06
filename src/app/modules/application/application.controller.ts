// controllers/application.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js"; // adjust path if needed
import { ApplicationService } from "./application.service.js";

// 1.---------- Apply to a job (create application)
const applyToJob = catchAsync(async (req: Request, res: Response) => {

  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const data = {...req.body, userId : req.user?._id};

  // Check duplicate application
  const existing = await ApplicationService.getApplications({ userId: userId.toString(), jobId : data.jobId });
  if (existing.length > 0) {
    return res.status(400).json({ message: "You have already applied to this job" });
  }

  const application = await ApplicationService.createApplication(data);

  res.status(201).json({ message: "Application submitted successfully", application });
});

// 2. ------------ Get all applications (optional filter by userId or jobId)
const getApplications = catchAsync(async (req: Request, res: Response) => {
  const { userId, jobId } = req.user;

  const applications = await ApplicationService.getApplications({
    userId,
    jobId
  });

  res.status(200).json({ applications });
});

// 3. ------------ Get a single application by ID
// const getApplicationById = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const application = await ApplicationService.getApplicationById(id);
//   if (!application) {
//     return res.status(404).json({ message: "Application not found" });
//   }

//   res.status(200).json({ application });
// });

//  4. ------------ Update application status
// const updateApplicationStatus = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const updated = await ApplicationService.updateApplicationStatus(id, status);
//   if (!updated) {
//     return res.status(404).json({ message: "Application not found" });
//   }

//   res.status(200).json({ message: "Status updated successfully", application: updated });
// });

// 5.------------ Delete an application
// const deleteApplication = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const deleted = await ApplicationService.deleteApplication(id);
//   if (!deleted) {
//     return res.status(404).json({ message: "Application not found" });
//   }

//   res.status(200).json({ message: "Application deleted successfully" });
// });

// ✅ Export all controller functions together
export const ApplicationController = {
  applyToJob,
  getApplications,
//   getApplicationById,
//   updateApplicationStatus,
//   deleteApplication,
};
