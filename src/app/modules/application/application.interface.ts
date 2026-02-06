import { Types } from "mongoose";

export interface IApplication {
  userId: Types.ObjectId;   // User _id
  jobId: Types.ObjectId;    // Job _id

  fullName: string;
  email: string;
  phoneNumber: string;

  resumeOrPortfolioUrl: string;
  coverLetter?: string;

  status: "pending" | "reviewed" | "accepted" | "rejected";

  createdAt?: Date;
  updatedAt?: Date;
}
