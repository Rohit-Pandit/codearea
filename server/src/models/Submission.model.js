import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    sourceCode: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Runtime Error",
        "Compilation Error",
        "Time Limit Exceeded",
        "Memory Limit Exceeded",
      ],
    },

    memory: String,

    time: String,
    judge0Token: String,

    totalTestCases: {
      type: Number,
      default: 0,
    },

    passedTestCases: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
