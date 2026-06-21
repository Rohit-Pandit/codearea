import { useEffect, useState } from "react";
import {
  createProblem,
  getProblems,
  deleteProblem,
} from "../api/problems";

const AdminDashboard = () => {
  const [problems, setProblems] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "EASY",
    tags: "",

    starterCodeJS: "",
    starterCodePython: "",
    starterCodeCpp: "",

    referenceJS: "",
    referencePython: "",
    referenceCpp: "",

    testCases: "",
  });

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await getProblems();
      setProblems(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createProblem({
        title: form.title,
        description: form.description,
        difficulty: form.difficulty,

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        examples: [],

        constraints: [],

        hints: "",

        editorial: "",

        starterCode: {
          javascript: form.starterCodeJS,
          python: form.starterCodePython,
          cpp: form.starterCodeCpp,
        },

        referenceSolutions: {
          javascript: form.referenceJS,
          python: form.referencePython,
          cpp: form.referenceCpp,
        },

        testCases: JSON.parse(form.testCases),
      });

      alert("Problem Created Successfully");

      setForm({
        title: "",
        description: "",
        difficulty: "EASY",
        tags: "",

        starterCodeJS: "",
        starterCodePython: "",
        starterCodeCpp: "",

        referenceJS: "",
        referencePython: "",
        referenceCpp: "",

        testCases: "",
      });

      fetchProblems();
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Failed to create problem"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this problem?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProblem(id);

      setProblems((prev) =>
        prev.filter((problem) => problem._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <form
        onSubmit={handleCreate}
        className="bg-slate-900 p-6 rounded-xl space-y-5 mb-10"
      >
        <h2 className="text-2xl font-semibold">
          Create Problem
        </h2>

        <input
          type="text"
          placeholder="Problem Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded"
          required
        />

        <textarea
          placeholder="Problem Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-32"
          required
        />

        <select
          value={form.difficulty}
          onChange={(e) =>
            setForm({
              ...form,
              difficulty: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded"
        >
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>

        <input
          type="text"
          placeholder="Tags (arrays, strings, math)"
          value={form.tags}
          onChange={(e) =>
            setForm({
              ...form,
              tags: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded"
        />

        <h3 className="text-xl font-semibold">
          JavaScript Starter Code
        </h3>

        <textarea
          value={form.starterCodeJS}
          onChange={(e) =>
            setForm({
              ...form,
              starterCodeJS: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
        />

        <h3 className="text-xl font-semibold">
          Python Starter Code
        </h3>

        <textarea
          value={form.starterCodePython}
          onChange={(e) =>
            setForm({
              ...form,
              starterCodePython: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
        />

        <h3 className="text-xl font-semibold">
          C++ Starter Code
        </h3>

        <textarea
          value={form.starterCodeCpp}
          onChange={(e) =>
            setForm({
              ...form,
              starterCodeCpp: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
        />

        <h3 className="text-xl font-semibold">
          JavaScript Reference Solution
        </h3>

        <textarea
          value={form.referenceJS}
          onChange={(e) =>
            setForm({
              ...form,
              referenceJS: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
        />

        <h3 className="text-xl font-semibold">
          Python Reference Solution
        </h3>

        <textarea
          value={form.referencePython}
          onChange={(e) =>
            setForm({
              ...form,
              referencePython: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
        />

        <h3 className="text-xl font-semibold">
          C++ Reference Solution
        </h3>

        <textarea
          value={form.referenceCpp}
          onChange={(e) =>
            setForm({
              ...form,
              referenceCpp: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
        />

        <h3 className="text-xl font-semibold">
          Test Cases (JSON)
        </h3>

        <textarea
          placeholder={`[
  {
    "input": "2 3",
    "expectedOutput": "5"
  },
  {
    "input": "10 20",
    "expectedOutput": "30"
  }
]`}
          value={form.testCases}
          onChange={(e) =>
            setForm({
              ...form,
              testCases: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg cursor-pointer hover:scale-105"
        >
          Create Problem
        </button>
      </form>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Existing Problems
        </h2>

        {problems.length === 0 ? (
          <p>No problems found.</p>
        ) : (
          <div className="space-y-4">
            {problems.map((problem) => (
              <div
                key={problem._id}
                className="flex justify-between items-center border-b border-slate-800 pb-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {problem.title}
                  </h3>

                  <p className="text-slate-400">
                    {problem.difficulty}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDelete(problem._id)
                  }
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition cursor-pointer hover:scale-105"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;