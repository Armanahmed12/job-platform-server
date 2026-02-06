// services/application.service.ts
import { Types } from "mongoose";
import { Application } from "./application.model.js";
import { IApplication } from "./application.interface.js";

// 1.------------ Create application
const createApplication = async (data : IApplication): Promise<IApplication> => {
  
  const userId = new Types.ObjectId(data.userId);
  const jobId = new Types.ObjectId(data.jobId);
  const application = await Application.create(data);
  return application;
};

// 2.------------ Get all applications (optionally filter by user or job)
const getApplications = async (filter?: {
  userId?: string;
  jobId?: string;
}): Promise<IApplication[]> => {
  const query: any = {};
  if (filter?.userId) query.userId = new Types.ObjectId(filter.userId);
  if (filter?.jobId) query.jobId = new Types.ObjectId(filter.jobId);

  return Application.find(query).sort({ createdAt: -1 }).lean();
};

// 3. ------------ Get a single application by ID
const getApplicationById = async (id: string): Promise<IApplication | null> =>
  Application.findById(id).lean();

// Update application status
const updateApplicationStatus = async (
  applicationId: string,
  status: "pending" | "reviewed" | "accepted" | "rejected"
): Promise<IApplication | null> =>
  Application.findByIdAndUpdate(applicationId, { status }, { new: true }).lean();

// Delete application
const deleteApplication = async (applicationId: string): Promise<IApplication | null> =>
  Application.findByIdAndDelete(applicationId).lean();

// Export all service functions together
export const ApplicationService = {
  createApplication,
  getApplications,
//   getApplicationById,
//   updateApplicationStatus,
//   deleteApplication,
};
