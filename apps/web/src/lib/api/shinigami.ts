// apps/web/src/lib/api/shinigami.ts
import axios from 'axios';
import { Manga } from '@/types/manga';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  timeout: 30000,
});

export interface ApiResponse<T> {
  status: string;
  creator: string;
  source: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total_record: number;
    page_size: number;
  };
  data: T;
}

// 1. Katalog / Daftar Komik Terbaru (GET /comic/shinigami/latest)
export const getLatest = async (page: number = 1, limit: number = 20) => {
  const response = await apiClient.get<ApiResponse<Manga[]>>(`/comic/shinigami/latest?page=${page}&limit=${limit}`);
  return response.data;
};

// 2. Pencarian Komik (GET /comic/shinigami/search/:query)
export const searchManga = async (query: string, page: number = 1) => {
  const encodedQuery = encodeURIComponent(query);
  const response = await apiClient.get<ApiResponse<Manga[]>>(`/comic/shinigami/search/${encodedQuery}?page=${page}`);
  return response.data;
};

// 3. Detail Komik (GET /comic/shinigami/detail/:manga_id)
export const getDetail = async (mangaId: string) => {
  const response = await apiClient.get<{ status: string; creator: string; source: string; data: any }>(`/comic/shinigami/detail/${mangaId}`);
  return response.data;
};

// 4. Daftar Chapter (GET /comic/shinigami/chapters/:manga_id)
export const getChapters = async (mangaId: string, page: number = 1) => {
  const response = await apiClient.get<ApiResponse<any[]>>(`/comic/shinigami/chapters/${mangaId}?page=${page}`);
  return response.data;
};

// 5. Reader Chapter (GET /comic/shinigami/read/:chapter_id)
export const readChapter = async (chapterId: string) => {
  const response = await apiClient.get<{ status: string; creator: string; source: string; data: any }>(`/comic/shinigami/read/${chapterId}`);
  return response.data;
};

// 6. Explore List / Daftar Komik Berdasarkan Kategori (GET /comic/shinigami/explore/:category)
export const getExploreList = async (category: string = 'explore-list-1') => {
  const response = await apiClient.get<ApiResponse<Manga[]>>(`/comic/shinigami/explore/${category}`);
  return response.data;
};