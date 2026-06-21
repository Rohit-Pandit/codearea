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
  <div className="max-w-6xl mx-auto">

    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        Problems
      </h1>

      <p className="text-slate-400 mt-2">
        Solve coding challenges and improve your skills.
      </p>
    </div>

    {/* Stats Header */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-slate-900 p-4 rounded-xl">
        <h3 className="text-slate-400">Total Problems</h3>
        <p className="text-3xl font-bold">
          {problems.length}
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <h3 className="text-slate-400">Easy</h3>
        <p className="text-3xl font-bold text-green-400">
          {
            problems.filter(
              (p) => p.difficulty === "EASY"
            ).length
          }
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <h3 className="text-slate-400">Medium + Hard</h3>
        <p className="text-3xl font-bold text-yellow-400">
          {
            problems.filter(
              (p) => p.difficulty !== "EASY"
            ).length
          }
        </p>
      </div>
    </div>

    <div className="grid gap-4">
      {problems.map((problem) => (
        <Link
          key={problem._id}
          to={`/problems/${problem._id}`}
        >
          <div className="bg-slate-900 hover:bg-slate-800 transition-all rounded-xl p-5 border border-slate-800 hover:border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  {problem.title}
                </h2>

                <div className="flex gap-2 mt-2">
                  {problem.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  problem.difficulty === "EASY"
                    ? "bg-green-500/20 text-green-400"
                    : problem.difficulty === "MEDIUM"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {problem.difficulty}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

  </div>
);
};

export default Problems;
