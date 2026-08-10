import axios from "axios";

// NOTE: falls back to the external Shinigami mirror for now.
// Once apps/api exposes a real /comic/shinigami/home endpoint backed by
// packages/database, point NEXT_PUBLIC_API_URL at it instead
// (e.g. http://localhost:5000) — see architecture notes.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://www.sankavollerei.web.id",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});