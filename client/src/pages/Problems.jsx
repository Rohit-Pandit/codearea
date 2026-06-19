import { useEffect, useState } from "react";
import { getProblems } from "../api/problems";
import { Link } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await getProblems();

      setProblems(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Problems</h1>

      {problems.map((problem) => (
        <div key={problem._id}>
          <Link to={`/problems/${problem._id}`} key={problem._id}>
            <div>
              <h3>{problem.title}</h3>
              <p>{problem.difficulty}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Problems;
