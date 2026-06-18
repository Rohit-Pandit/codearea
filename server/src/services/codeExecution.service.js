import judge0 from "./judge0.service.js";

const executeCode = async ({ sourceCode, languageId, stdin = "" }) => {
  try {
    const response = await judge0.post(
      "/submissions?base64_encoded=false&wait=true",
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Judge0 Error:", error.response?.data || error.message);

    throw error;
  }
};

export default executeCode;
