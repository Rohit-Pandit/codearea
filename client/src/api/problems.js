import api from "./axios";

export const getProblems = () => {
  return api.get("/problems/all-problems");
};

export const getProblemById = (id) => {
  return api.get(`/problems/get-problem/${id}`);
};

export const createProblem = (data) => {
  return api.post("/problems/create-problem", data);
};

export const updateProblem = (id, data) => {
  return api.put(`/problems/update-problem/${id}`, data);
};

export const deleteProblem = (id) => {
  return api.delete(`/problems/delete-problem/${id}`);
};
