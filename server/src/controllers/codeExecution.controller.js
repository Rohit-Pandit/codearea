import languageMap from "../utils/languageMap.js";
import  executeCode  from "../services/codeExecution.service.js";

const runCode = async (req, res) => {
  try {
    const { sourceCode, language, stdin = "" } = req.body;

    if (!sourceCode || !language) {
      return res.status(400).json({
        success: false,
        message: "Source code and language are required",
      });
    }

    const languageId = languageMap[language];

    if (!languageId) {
      return res.status(400).json({
        success: false,
        message: "Unsupported language",
      });
    }

    const result = await executeCode({
      sourceCode,
      languageId,
      stdin,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default runCode;
