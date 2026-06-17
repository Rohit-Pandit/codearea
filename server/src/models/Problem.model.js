import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    example: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    starterCode: {
      type: String,
      default: "",
    },

    constraints: [String],
  },
  {},
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
