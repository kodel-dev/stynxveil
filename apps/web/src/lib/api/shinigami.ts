import { ShingamiResponse } from '@/types/manga';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getHomeData(): Promise<ShingamiResponse | null> {
  try {
    const res = await fetch(`${API_URL}/comic/shinigami/home`, {
      next: { revalidate: 1800 },
    });
    
    if (!res.ok) {
      console.error(`[API ERROR] Status: ${res.status} | Text: ${res.statusText} | URL: ${res.url}`);
      throw new Error('Gagal mengambil data beranda');
    }
    
    const json: ShingamiResponse = await res.json();
    return json;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export async function getSliderData(): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/comic/shinigami/slider`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Gagal mengambil data slider');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Slider Fetch Error:", error);
    return [];
  }
}

export async function getExploreComics(category: string, page = 1, pageSize = 10) {
  try {
    const res = await fetch(`${API_URL}/comic/shinigami/explore/${category}?page=${page}&page_size=${pageSize}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Gagal mengambil data explore');
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Explore Fetch Error:", error);
    return { status: "error", pagination: null, data: [] };
  }
}

export async function getLatestComics(page = 1, pageSize = 20) {
  try {
    const res = await fetch(`${API_URL}/comic/shinigami/latest?page=${page}&page_size=${pageSize}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Gagal mengambil data latest manga');
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Latest Fetch Error:", error);
    return { status: "error", pagination: null, data: [] };
  }
}