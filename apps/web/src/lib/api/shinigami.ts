import { api } from "./client";
import { HomeResponse } from "@/types/manga";

export async function getHome(): Promise<HomeResponse> {
  const { data } = await api.get("/comic/shinigami/home");

  return data;
}