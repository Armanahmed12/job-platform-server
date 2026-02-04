import { Schema, model } from 'mongoose';
import { IJob } from './job.interface.js';

const salaryRangeSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: {
      type: String,
      enum: ["BDT", "USD", "INR"],
      required: true,
    },
  },
  { _id: false }
);

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Intern'],
      required: true,
    },
    category: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    salaryRange: { type: salaryRangeSchema, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    requirements: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    status: {
      type: String,
      enum: ['active', 'inactive', 'closed', 'draft'],
      default: 'active',
    },
    hr_email: { type: String, required: true },
    hr_name: { type: String, required: true },
    company_logo: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Job = model<IJob>('Job', jobSchema);
