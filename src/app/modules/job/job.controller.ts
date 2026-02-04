// src/app/modules/job/job.controller.ts
import { Request, Response } from 'express';
import { jobService } from './job.service.js';

// Create Job
const createJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Jobs
const getJobs = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const jobs = await jobService.getJobs(status as string);
    res.status(200).json({ success: true, data: jobs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Job by ID
const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJobById(req.params.id as string);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Job
const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.updateJob(req.params.id as string, req.body);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Job
const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.deleteJob(req.params.id as string);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export all controller functions together
export const jobController = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
