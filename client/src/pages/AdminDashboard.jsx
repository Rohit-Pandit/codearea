import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createProblem,
  getProblems,
  deleteProblem,
  updateProblem,
} from "../api/problems";

const AdminDashboard = () => {
  const [problems, setProblems] = useState([]);

  const [editingId, setEditingId] = useState(null);

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

    examples: "",
    constraints: "",
    hints: "",
    editorial: "",
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
      const payload = {
        title: form.title,
        description: form.description,
        difficulty: form.difficulty,

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        examples: form.examples ? JSON.parse(form.examples) : [],

        constraints: form.constraints
          ? form.constraints
              .split("\n")
              .map((c) => c.trim())
              .filter(Boolean)
          : [],

        hints: form.hints,

        editorial: form.editorial,

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
      };
      if (editingId) {
        await updateProblem(editingId, payload);

        alert("Problem Updated Successfully");
      } else {
        await createProblem({
          ...payload,
          testCases: JSON.parse(form.testCases),
        });

        alert("Problem Created Successfully");
      }

      setEditingId(null);

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

        examples: "",
        constraints: "",
        hints: "",
        editorial: "",
      });

      await fetchProblems();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create problem");
    }
  };

  const handleEdit = (problem) => {
    setEditingId(problem._id);

    setForm({
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,

      tags: problem.tags?.join(",") || "",

      examples: JSON.stringify(problem.examples || [], null, 2),

      constraints: problem.constraints?.join("\n") || "",

      hints: problem.hints || "",
      editorial: problem.editorial || "",

      starterCodeJS: problem.starterCode?.javascript || "",

      starterCodePython: problem.starterCode?.python || "",

      starterCodeCpp: problem.starterCode?.cpp || "",

      referenceJS: problem.referenceSolutions?.javascript || "",

      referencePython: problem.referenceSolutions?.python || "",

      referenceCpp: problem.referenceSolutions?.cpp || "",

      testCases: form.testCases,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this problem?");

    if (!confirmDelete) return;

    try {
      await deleteProblem(id);

      setProblems((prev) => prev.filter((problem) => problem._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <form
        onSubmit={handleCreate}
        className="bg-slate-900 p-6 rounded-xl space-y-5 mb-10"
      >
        <h2 className="text-2xl font-semibold">
          {editingId ? "Edit Problem" : "Create Problem"}
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

        <h3 className="text-xl font-semibold">Examples (JSON)</h3>

        <textarea
          value={form.examples}
          onChange={(e) =>
            setForm({
              ...form,
              examples: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
          placeholder={`[
  {
    "input":"2 3",
    "output":"5",
    "explanation":"2 + 3 = 5"
  }
]`}
        />

        <h3 className="text-xl font-semibold">Constraints</h3>

        <textarea
          value={form.constraints}
          onChange={(e) =>
            setForm({
              ...form,
              constraints: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-28"
          placeholder={`1 <= a,b <= 1000
Input values are integers`}
        />

        <h3 className="text-xl font-semibold">Hints</h3>

        <textarea
          value={form.hints}
          onChange={(e) =>
            setForm({
              ...form,
              hints: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-24"
          placeholder="Use the + operator"
        />

        <h3 className="text-xl font-semibold">Editorial</h3>

        <textarea
          value={form.editorial}
          onChange={(e) =>
            setForm({
              ...form,
              editorial: e.target.value,
            })
          }
          className="w-full p-3 bg-slate-800 rounded h-40"
          placeholder="Read two integers and print their sum."
        />

        <h3 className="text-xl font-semibold">JavaScript Starter Code</h3>

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

        <h3 className="text-xl font-semibold">Python Starter Code</h3>

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

        <h3 className="text-xl font-semibold">C++ Starter Code</h3>

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

        <h3 className="text-xl font-semibold">JavaScript Reference Solution</h3>

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

        <h3 className="text-xl font-semibold">Python Reference Solution</h3>

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

        <h3 className="text-xl font-semibold">C++ Reference Solution</h3>

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

        <h3 className="text-xl font-semibold">Test Cases (JSON)</h3>

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

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg cursor-pointer hover:scale-105 transition"
          >
            {editingId ? "Update Problem" : "Create Problem"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);

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

                  examples: "",
                  constraints: "",
                  hints: "",
                  editorial: "",
                });
              }}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6">Existing Problems</h2>

        {problems.length === 0 ? (
          <p>No problems found.</p>
        ) : (
          <div className="space-y-4">
            {problems.map((problem) => (
              <div
                key={problem._id}
                className="flex justify-between items-center border-b border-slate-800 pb-4"
              >
                <div className="flex gap-2">
                  <Link
                    to={`/problems/${problem._id}`}
                    className="font-semibold text-lg text-blue-400 hover:underline "
                  >
                    {problem.title}
                  </Link>

                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
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

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(problem)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded cursor-pointer hover:scale-105 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(problem._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition cursor-pointer hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
