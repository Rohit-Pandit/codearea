import Problem from "../models/Problem.model.js";
import TestCase from "../models/TestCase.model.js";

const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      starterCode,
      referenceSolutions,
      testCases,
    } = req.body;

    const existingProblem = await Problem.findOne({
      title,
    });

    if (existingProblem) {
      return res.status(400).json({
        success: false,
        message: "Problem already exists",
      });
    }

    const problem = await Problem.create({
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      starterCode,
      referenceSolutions,
      createdBy: req.user._id,
    });

    if (testCases?.length) {
      await TestCase.insertMany(
        testCases.map((testCase) => ({
          ...testCase,
          problemId: problem._id,
        })),
      );
    }

    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: problem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .select("title difficulty tags createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const sampleTestCases = await TestCase.find({
      problemId: problem._id,
      isHidden: false,
    }).select("input expectedOutput isHidden");

    return res.status(200).json({
      success: true,
      data: {
        problem,
        sampleTestCases,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: updatedProblem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(
      req.params.id
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    await TestCase.deleteMany({
      problemId: problem._id,
    });

    await Problem.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createProblem, getProblems, getProblemById, updateProblem, deleteProblem };
