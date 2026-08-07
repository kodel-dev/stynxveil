export interface Genre {
  genre_id: string;
  name: string;
}

export interface Author {
  author_id: string;
  name: string;
}

export interface Artist {
  artist_id: string;
  name: string;
}

export interface Manga {

  manga_id: string;

  title: string;

  alternative_title?: string;

  description?: string;

  cover: string;

  cover_portrait: string;

  status: string;

  release_year: number;

  country: string;

  rating: number;

  views: number;

  bookmarks: number;

  latest_chapter: string;

  latest_chapter_id: string;

  latest_chapter_time: string;

  is_recommended: boolean;

  genres: Genre[];

  authors: Author[];

  artists: Artist[];

  format: string;

  type: string;
}

export interface HomeResponse {

  latest: Manga[];

  recommended: Manga[];

  popular: Manga[];
}