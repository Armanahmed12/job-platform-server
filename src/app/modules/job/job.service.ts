// src/app/modules/job/job.service.ts
import { Job } from './job.model.js';
import { IJob } from './job.interface.js';
import { Types } from 'mongoose';

// Create a new job
const createJob = async (jobData: IJob): Promise<IJob> => {
  const job = await Job.create(jobData);
  return job;
};

// Get all jobs, optional filter by status
const getJobs = async (email?: string): Promise<IJob[]> => {
  const query = email ? {hr_email: email} : {};
  return Job.find(query).sort({ createdAt: -1 });
};

// Get job by ID
const getJobById = async (jobId: string): Promise<IJob | null> => {
  if (!Types.ObjectId.isValid(jobId)) return null;
  return Job.findById(jobId);
};

// Update job by ID
const updateJob = async (jobId: string, updateData: Partial<IJob>): Promise<IJob | null> => {
  if (!Types.ObjectId.isValid(jobId)) return null;
  return Job.findByIdAndUpdate(jobId, updateData, { new: true });
};

// Delete job by ID
const deleteJob = async (jobId: string): Promise<IJob | null> => {
  if (!Types.ObjectId.isValid(jobId)) return null;
  return Job.findByIdAndDelete(jobId);
};

// Export all functions together
export const jobService = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
