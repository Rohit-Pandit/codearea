import api from "./axios";

export const submitSolution = (data) =>
  api.post("/submissions", data);

export const getMySubmissions = () =>
  api.get("/submissions/me");

export const getProblemSubmissions = (problemId) =>
  api.get(`/submissions/problem/${problemId}`);