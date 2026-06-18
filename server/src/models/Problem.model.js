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
      default: "",
    },
  },
  {
    _id: false,
  },
);

const codeSchema = new mongoose.Schema(
  {
    javascript: {
      type: String,
      default: "",
    },

    python: {
      type: String,
      default: "",
    },

    cpp: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    examples: [exampleSchema],

    constraints: [
      {
        type: String,
        trim: true,
      },
    ],

    hints: {
      type: String,
      default: "",
    },

    editorial: {
      type: String,
      default: "",
    },

    starterCode: {
      type: codeSchema,
      default: () => ({}),
    },

    referenceSolutions: {
      type: codeSchema,
      default: () => ({}),
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
