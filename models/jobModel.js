import mongoose from "mongoose";
import { JOB_STAUTS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STAUTS),
      default: JOB_STAUTS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my City",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      refer: "User",
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job", JobSchema);

export default jobModel;
