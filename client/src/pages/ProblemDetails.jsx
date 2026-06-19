import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById } from "../api/problems";
import CodeEditor from "../components/CodeEditor.jsx";

const ProblemDetails = () => {
  const { id } = useParams();

  const [problemDetails, setProblemDetails] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, []);

  const fetchProblem = async () => {
    try {
      const res = await getProblemById(id);

      console.log("problem details:", res.data.data);

      setProblemDetails(res.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  if (!problemDetails) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
        <h1>Problem Details</h1>
      <h1>{problemDetails.problem.title}</h1>

      <p>{problemDetails.problem.description}</p>

      <p>{problemDetails.problem.difficulty}</p>
      <CodeEditor />
    </div>
  );
};

export default ProblemDetails;