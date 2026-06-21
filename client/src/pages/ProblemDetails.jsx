import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProblemById } from "../api/problems";
import { runCode } from "../api/code.js";

import CodeEditor from "../components/CodeEditor.jsx";
import OutputPanel from "../components/OutputPanel.jsx";

import { submitSolution } from "../api/submission.js";

const ProblemDetails = () => {
  const { id } = useParams();

  const [problemData, setProblemData] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`function solve() {}`);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [stdin, setStdin] = useState("");

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const res = await getProblemById(id);
      const data = res?.data?.data;

      console.log("problem details:", data);
      setProblemData(data);

      const starterCode = data?.problem?.starterCode?.[language];
      if (starterCode) {
        setCode(starterCode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const starterCode = problemData?.problem?.starterCode?.[language];
    if (starterCode) {
      setCode(starterCode);
    }
  }, [language, problemData]);

  const handleRun = async () => {
    try {
      setRunning(true);

      const res = await runCode({
        sourceCode: code,
        language,
        stdin,
      });

      const result = res.data.data;

      console.log("problemDetails", result);

      setOutput(
        result.stdout ||
          result.stderr ||
          result.compile_output ||
          result.message ||
          result.status?.description,
      );
    } catch (error) {
      console.error(error);
      setOutput("Execution failed");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const res = await submitSolution({
        problemId: problem._id,
        sourceCode: code,
        language,
      });

      setVerdict(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!problemData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { problem, sampleTestCases = [] } = problemData;
  const examples = problem?.examples || sampleTestCases || [];
  const constraints = problem?.constraints || [];

  return (
    <div className="grid grid-cols-2 gap-4 h-[85vh]">
      <div className="bg-slate-900 rounded-lg p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">{problem?.title}</h1>

        <span className="inline-block bg-green-700 px-3 py-1 rounded text-sm mb-4">
          {problem?.difficulty}
        </span>

        <p className="text-slate-300 mb-6">{problem?.description}</p>

        {examples.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Examples</h2>

            {examples.map((example, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded mb-3">
                <p>
                  <strong>Input:</strong>{" "}
                  {example?.input || example?.stdin || "N/A"}
                </p>

                <p>
                  <strong>Output:</strong>{" "}
                  {example?.output || example?.expectedOutput || "N/A"}
                </p>

                {example?.explanation && (
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {constraints.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Constraints</h2>

            <ul className="list-disc ml-6">
              {constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
        />

        <textarea
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          placeholder="Custom Input"
          className="w-full h-24 bg-slate-900 border border-slate-700 rounded p-3 text-white"
        />

        <div className="flex gap-3">
          <button
            onClick={handleRun}
            disabled={running}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            {running ? "Running..." : "Run Code"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        <OutputPanel output={output} />

        {verdict && (
          <div className="bg-slate-900 p-4 rounded">
            <h3 className="font-bold text-lg">{verdict.verdict}</h3>

            <p>
              Passed {verdict.passed} / {verdict.total}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;
