import  executeCode  from "./codeExecution.service.js";

const executeAgainstTestCases = async ({
  sourceCode,
  languageId,
  testCases,
}) => {
  const results = [];

  for (const testCase of testCases) {
    const result = await executeCode({
      sourceCode,
      languageId,
      stdin: testCase.input,
    });

    results.push({
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.stdout?.trim() || "",
      status: result.status?.description,
      memory: result.memory,
      time: result.time,
      stderr: result.stderr,
      compileOutput: result.compile_output,
    });
  }

  return results;
};

export default executeAgainstTestCases;