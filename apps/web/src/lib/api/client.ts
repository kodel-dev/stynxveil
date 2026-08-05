import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.sankavollerei.web.id",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});