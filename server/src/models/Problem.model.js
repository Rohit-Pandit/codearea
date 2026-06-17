import mongoose from "mongoose";


const exampleSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
    },
  },
  { _id: false }
);

const starterCodeSchema = new mongoose.Schema(
  {
    javascript: String,
    python: String,
    cpp: String,
  },
  { _id: false }
);

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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    example: [exampleSchema],
    starterCode: starterCodeSchema,
   
    constraints: [String],
  },
  {timestamps: true},
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
