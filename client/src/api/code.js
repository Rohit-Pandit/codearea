import api from "./axios.js";

export const runCode = (data) =>
  api.post("/code/run", data);

export const submitCode = (data) =>
  api.post("/submissions", data);