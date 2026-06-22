import Problem from "../models/Problem.model.js";
import TestCase from "../models/testcase.model.js";
import Submission from "../models/Submission.model.js";
import User from "../models/User.model.js";

import languageMap from "../utils/languageMap.js";
import executeAgainstTestCases from "../services/submission.service.js";

const submitSolution = async (req, res) => {
  try {
    const { problemId, sourceCode, language } = req.body;

    if (!problemId || !sourceCode || !language) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const testCases = await TestCase.find({
      problemId,
    });

    const languageId = languageMap[language];

    if (!languageId) {
      return res.status(400).json({
        success: false,
        message: "Unsupported language",
      });
    }

    const results = await executeAgainstTestCases({
      sourceCode,
      languageId,
      testCases,
    });


    let verdict = "Accepted";

for (const result of results) {
  if (result.status !== "Accepted") {
    if (result.status.includes("Runtime Error")) {
      verdict = "Runtime Error";
    } else if (result.status.includes("Compilation Error")) {
      verdict = "Compilation Error";
    } else if (result.status.includes("Time Limit")) {
      verdict = "Time Limit Exceeded";
    } else if (result.status.includes("Memory Limit")) {
      verdict = "Memory Limit Exceeded";
    } else {
      verdict = result.status;
    }

    break;
  }

  if (result.actualOutput.trim() !== result.expectedOutput.trim()) {
    verdict = "Wrong Answer";
    break;
  }
}

    const passedCount = results.filter(
      (result) =>
        result.status === "Accepted" &&
        (result.actualOutput || "").trim() ===
          (result.expectedOutput || "").trim(),
    ).length;

    const submission = await Submission.create({
      userId: req.user._id,
      problemId,
      sourceCode,
      language,
      status: verdict,
      totalTestCases: results.length,
      passedTestCases: passedCount,
      memory: results[0]?.memory,
      time: results[0]?.time,
    });

    if (verdict === "Accepted") {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          solvedProblems: problemId,
        },
      });
    }

    return res.status(201).json({
      success: true,
      verdict,
      passed: passedCount,
      total: results.length,
      submission,
    });
  } catch (error) {
  console.error(error);

  if (error.errors) {
    console.log("Validation Errors:");
    Object.values(error.errors).forEach((err) =>
      console.log(err.path, err.message)
    );
  }

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.user._id,
    })
      .populate("problemId", "title difficulty")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProblemSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.user._id,
      problemId: req.params.problemId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { submitSolution, getMySubmissions, getProblemSubmissions };
