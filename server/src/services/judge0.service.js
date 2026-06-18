import axios from "axios";
import { JUDGE0_API_URL} from "../config/env.js";

const judge0 = axios.create({
  baseURL: "https://ce.judge0.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default judge0;