import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext.js";
import { getMySubmissions } from "../api/submission.js";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await getMySubmissions();

      setSubmissions(res.data.data);
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-slate-900 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold">
          {user?.name}
        </h1>

        <p className="text-slate-400">
          {user?.email}
        </p>

        <p className="mt-2">
          Role: {user?.role}
        </p>

        <p className="mt-2">
          Total Submissions: {submissions.length}
        </p>
      </div>

      {/* Submission History */}
      <div className="bg-slate-900 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Submission History
        </h2>

        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3">
                  Problem
                </th>

                <th className="text-left p-3">
                  Language
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Passed
                </th>

                <th className="text-left p-3">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="border-b border-slate-800"
                >
                  <td className="p-3">
                    {submission.problemId?.title}
                  </td>

                  <td className="p-3">
                    {submission.language}
                  </td>

                  <td
                    className={`p-3 ${
                      submission.status === "Accepted"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submission.status}
                  </td>

                  <td className="p-3">
                    {submission.passedTestCases}/
                    {submission.totalTestCases}
                  </td>

                  <td className="p-3">
                    {new Date(
                      submission.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;