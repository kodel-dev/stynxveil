// apps/web/src/types/manga.ts

export interface Genre {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  slug: string;
}

export interface Artist {
  name: string;
  slug: string;
}

export interface Manga {
  manga_id: string;
  title: string;
  alternative_title?: string | null;
  description?: string;
  cover: string;
  cover_portrait?: string | null;
  status: string;
  release_year: string; 
  country: string;
  rating: number | null;
  views: number;
  bookmarks: number;
  latest_chapter: number;
  latest_chapter_id: string;
  latest_chapter_time: string;
  is_recommended: boolean;
  genres: Genre[];
  authors: Author[];
  artists: Artist[];
  format: string;
  type: string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_record: number;
  page_size: number;
}

export interface HomeResponse {
  status: string;
  creator: string;
  source: string;
  data: {
    latest: Manga[];
    recommended: Manga[];
    popular: Manga[];
  };
}

export interface PaginatedResponse {
  status: string;
  creator: string;
  source: string;
  pagination: Pagination;
  data: Manga[];
}


export interface Badge {
  name: string;
  color: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  rating: string;
  background_image: string;
  chara_image: string;
  manga_id: string;
  blur_color: string;
  category: string;
  description: string;
  badges: Badge[];
}