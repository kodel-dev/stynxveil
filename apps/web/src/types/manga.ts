export interface Genre {
  name: string;
  slug: string;
}

export interface Creator {
  name: string;
  slug: string;
}

export interface MangaItem {
  manga_id: string;
  title: string;
  alternative_title: string;
  description: string;
  cover: string;
  cover_portrait: string | null;
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
  authors: Creator[];
  artists: Creator[];
  format: string;
  type: string;
}

export interface HomeData {
  latest: MangaItem[];
  recommended: MangaItem[];
  popular: MangaItem[];
  projectComics?: MangaItem[];
  mirrorComics?: MangaItem[];
}

export interface ShingamiResponse {
  status: string;
  creator: string;
  source: string;
  data: HomeData;
}