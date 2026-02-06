import { Schema, model, Types } from "mongoose";
import { IApplication } from "./application.interface.js";

const applicationSchema = new Schema<IApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    resumeOrPortfolioUrl: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Enforce uniqueness on combination of userId + jobId inside schema
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export const Application = model<IApplication>("Application", applicationSchema);