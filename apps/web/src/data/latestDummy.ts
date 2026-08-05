// apps/web/src/data/latestDummy.ts

export interface Genre {
  name: string;
  slug: string;
}

export interface AuthorArtist {
  name: string;
  slug: string;
}

export interface LatestMangaItem {
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
  authors: AuthorArtist[];
  artists: AuthorArtist[];
  format: 'Manga' | 'Manhwa' | 'Manhua';
  type: 'Project' | 'Mirror';
}

export interface LatestApiResponse {
  status: string;
  creator: string;
  source: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total_record: number;
    page_size: number;
  };
  data: LatestMangaItem[];
}

// Data Murni dari API (Tanpa Duplikat Buatan)
export const latestApiResponse: LatestApiResponse = {
  "status": "success",
  "creator": "Sanka Vollerei",
  "source": "Shinigami",
  "pagination": {
    "current_page": 1,
    "total_pages": 50,
    "total_record": 1000,
    "page_size": 20
  },
  "data": [
    {
      "manga_id": "07cba925-da21-497e-a5e0-b2ca712917df",
      "title": "The Rebel Of The Tyrant Noble Family",
      "alternative_title": "暴君名家の反逆者-Aster-",
      "description": "Ash mengabdikan seluruh hidupnya kepada ayah angkatnya...",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1779114031941_12wx50.jpg",
      "cover_portrait": "https://assets.shngm.id/thumbnail/cover/banner_1779114042625_r6y8oj.jpg",
      "status": "Ongoing",
      "release_year": "2026",
      "country": "KR",
      "rating": 8.5,
      "views": 3160242,
      "bookmarks": 24068,
      "latest_chapter": 34,
      "latest_chapter_id": "17f81ceb-9786-4c21-8173-abd03161e520",
      "latest_chapter_time": "2026-08-04T21:38:14Z",
      "is_recommended": false,
      "genres": [{"name": "Action", "slug": "action"}],
      "authors": [{"name": "Menyusul", "slug": "menyusul"}],
      "artists": [{"name": "Menyusul", "slug": "menyusul-0"}],
      "format": "Manhwa",
      "type": "Project"
    },
    {
      "manga_id": "2f7d8e13-c8f7-4a5f-a86f-186fbfa8a861",
      "title": "Sword God's Livestream",
      "alternative_title": "검술 고인물의 게임방송",
      "description": "“Apa gunanya menjadi Sword God di kehidupan masa laluku?”",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1780413143206_40jdhv.jpg",
      "cover_portrait": "https://assets.shngm.id/thumbnail/cover/banner_1780413155065_vkbur1.jpg",
      "status": "Ongoing",
      "release_year": "2026",
      "country": "KR",
      "rating": 8.2,
      "views": 1700965,
      "bookmarks": 13391,
      "latest_chapter": 29,
      "latest_chapter_id": "e7716abb-b756-4a5d-9d4c-d16469065438",
      "latest_chapter_time": "2026-08-04T21:37:58Z",
      "is_recommended": false,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Fantasy", "slug": "fantasy"}, {"name": "Martial Arts", "slug": "martial-arts"}, {"name": "Game", "slug": "game"}],
      "authors": [{"name": "Menyusul", "slug": "menyusul"}],
      "artists": [{"name": "Menyusul", "slug": "menyusul-0"}],
      "format": "Manhwa",
      "type": "Project"
    },
    {
      "manga_id": "a61d6822-6001-45f1-99f5-501c81441583",
      "title": "Chronicles Of The Demon-Slaying Cultivator",
      "alternative_title": "멸귀수도전",
      "description": "Balas dendamku baru akan berakhir setelah aku memusnahkan seluruh Demon Spirit.",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1785771328032_dlamcp.jpg",
      "cover_portrait": "https://assets.shngm.id/thumbnail/cover/banner_1785771346656_hbk7dd.jpg",
      "status": "Ongoing",
      "release_year": "2026",
      "country": "KR",
      "rating": null,
      "views": 348554,
      "bookmarks": 8719,
      "latest_chapter": 8,
      "latest_chapter_id": "a8309f87-ae6b-4fcc-88ae-d04477f1acad",
      "latest_chapter_time": "2026-08-04T21:37:43Z",
      "is_recommended": true,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Fantasy", "slug": "fantasy"}, {"name": "Martial Arts", "slug": "martial-arts"}, {"name": "Murim", "slug": "murim"}, {"name": "Demon", "slug": "demon"}],
      "authors": [{"name": "Salty Dog", "slug": "salty-dog-author"}],
      "artists": [{"name": "Redice Studio", "slug": "redice-studio"}],
      "format": "Manhwa",
      "type": "Project"
    },
    {
      "manga_id": "6b942d3b-32f9-470e-b073-e5bb04497e46",
      "title": "Tears on a Withered Flower",
      "alternative_title": "시든 꽃에 눈물을",
      "description": "Kehidupan Na Hae-soo berubah ketika suaminya mengkhianatinya...",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1773139434038_qu4lmw.webp",
      "cover_portrait": null,
      "status": "Ongoing",
      "release_year": "2024",
      "country": "KR",
      "rating": 7,
      "views": 783212,
      "bookmarks": 3442,
      "latest_chapter": 112,
      "latest_chapter_id": "0e3565fa-317a-4889-bf75-59e604ccebe0",
      "latest_chapter_time": "2026-08-04T19:03:46Z",
      "is_recommended": false,
      "genres": [{"name": "Romance", "slug": "romance"}, {"name": "Drama", "slug": "drama"}],
      "authors": [{"name": "Gae", "slug": "gae-author"}],
      "artists": [{"name": "Gae", "slug": "gae-artist"}],
      "format": "Manhwa",
      "type": "Mirror"
    },
    {
      "manga_id": "60371b6a-0993-4f09-a201-42a0fe490697",
      "title": "The Rebirth of the Hero’s Party’s Archmage",
      "alternative_title": "용사파티 대마법사의 환생",
      "description": "Pertempuran dengan archnemesis dilanjutkan setelah 300 tahun...",
      "cover": "https://assets.shngm.id/thumbnail/image/84d2fa56-3c80-40b3-ae22-8c589e7528b9.jpg",
      "cover_portrait": null,
      "status": "Ongoing",
      "release_year": "2024",
      "country": "KR",
      "rating": 7.5,
      "views": 3182137,
      "bookmarks": 11502,
      "latest_chapter": 147,
      "latest_chapter_id": "7daa19eb-938e-417c-958f-559ac15098b7",
      "latest_chapter_time": "2026-08-04T17:46:45Z",
      "is_recommended": false,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Fantasy", "slug": "fantasy"}],
      "authors": [{"name": "Potetorusu", "slug": "potetorusu"}],
      "artists": [{"name": "Potetorusu", "slug": "potetorusu-0"}],
      "format": "Manhwa",
      "type": "Mirror"
    },
    {
      "manga_id": "cc733648-a57e-448f-82e8-5576b2b087f1",
      "title": "The Demonic Sect Master’s Secret Apprentice",
      "alternative_title": "魔教教主苟在我身边看我偷偷修炼",
      "description": "He Yun, yang dijual ke Istana Iblis Sembilan Nether...",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1782468229767_5ra2my.jpg",
      "cover_portrait": null,
      "status": "Ongoing",
      "release_year": "2025",
      "country": "CN",
      "rating": 7,
      "views": 443000,
      "bookmarks": 2483,
      "latest_chapter": 82,
      "latest_chapter_id": "2fb07be4-2b2a-4426-97bd-cd47e8be6f74",
      "latest_chapter_time": "2026-08-04T17:24:54Z",
      "is_recommended": false,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Martial Arts", "slug": "martial-arts"}],
      "authors": [{"name": "人加可以", "slug": "人加可以-author"}],
      "artists": [{"name": "人加可以", "slug": "人加可以-artist"}],
      "format": "Manhua",
      "type": "Mirror"
    },
    {
      "manga_id": "2f0e9280-3b55-4139-88f7-1c0493523da2",
      "title": "My Unbeatable Passive Skill Lets Me Deal Massive Damage!",
      "alternative_title": "My Empress Disciple Is About to Turn Dark",
      "description": "Di kehidupan sebelumnya, Cheng Qianmo mendapatkan gelar dewa...",
      "cover": "https://assets.shngm.id/thumbnail/image/adae61df-5b8d-4b09-801c-350b1d95f53c.jpg",
      "cover_portrait": null,
      "status": "Ongoing",
      "release_year": "2023",
      "country": "CN",
      "rating": 7.5,
      "views": 1894732,
      "bookmarks": 8243,
      "latest_chapter": 119,
      "latest_chapter_id": "00de7065-29b1-4655-af3c-e563708e25a9",
      "latest_chapter_time": "2026-08-04T17:21:52Z",
      "is_recommended": false,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Fantasy", "slug": "fantasy"}],
      "authors": [{"name": "Xia Zi Wu Hui", "slug": "xia-zi-wu-hui"}],
      "artists": [],
      "format": "Manhua",
      "type": "Mirror"
    },
    {
      "manga_id": "db64192e-f547-42cf-b302-b40060870ab1",
      "title": "What’s Wrong With Being the Villainess?",
      "alternative_title": "악녀라서 편하고 좋은데요?",
      "description": "“Jadi memang kenapa kalau aku penjahatnya?”",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1780567759866_sv31fl.jpg",
      "cover_portrait": null,
      "status": "Ongoing",
      "release_year": "2022",
      "country": "KR",
      "rating": 7,
      "views": 389331,
      "bookmarks": 2132,
      "latest_chapter": 102,
      "latest_chapter_id": "3407086e-8893-4724-9417-86b09e3e7050",
      "latest_chapter_time": "2026-08-04T17:15:23Z",
      "is_recommended": false,
      "genres": [{"name": "Romance", "slug": "romance"}, {"name": "Comedy", "slug": "comedy"}],
      "authors": [{"name": "Mang Go-Kim", "slug": "mang-go-kim-author"}],
      "artists": [{"name": "Yoteh", "slug": "yoteh-artist"}],
      "format": "Manhwa",
      "type": "Mirror"
    },
    {
      "manga_id": "ae79b0d9-8af2-458d-a313-0849cb4f1c54",
      "title": "A Veteran Player Is Needed In The Apocalypse",
      "alternative_title": "아포칼립스엔 고인물이 필요해요",
      "description": "Kami semua seolah-olah dibawa masuk ke dalam permainan itu.",
      "cover": "https://assets.shngm.id/thumbnail/cover/banner_1782828033600_hghhmh.png",
      "cover_portrait": "https://assets.shngm.id/thumbnail/cover/banner_1783481696362_piha3d.jpg",
      "status": "Ongoing",
      "release_year": "2026",
      "country": "KR",
      "rating": 8.5,
      "views": 1056390,
      "bookmarks": 12613,
      "latest_chapter": 28,
      "latest_chapter_id": "d1a9db2a-35d2-4199-80d0-6b0ae7aa4f92",
      "latest_chapter_time": "2026-08-04T16:26:33Z",
      "is_recommended": true,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Fantasy", "slug": "fantasy"}],
      "authors": [{"name": "Ulemma", "slug": "ulemma-author"}],
      "artists": [{"name": "Carrotoon", "slug": "carrotoon"}],
      "format": "Manhwa",
      "type": "Project"
    },
    {
      "manga_id": "05bbcbc4-56a6-47e6-ac36-1d482339a322",
      "title": "Eleceed",
      "alternative_title": "일렉시드",
      "description": "Kaiden Pengguna kemampuan misterius yang bersembunyi...",
      "cover": "https://assets.shngm.id/thumbnail/image/08d8cb84-973a-4995-8b3e-bdfd9e305174.jpg",
      "cover_portrait": "https://assets.shngm.id/thumbnail/image/6c83f3db-948b-426f-a0ad-7074d8118632.jpg",
      "status": "Ongoing",
      "release_year": "2020",
      "country": "KR",
      "rating": 8.7,
      "views": 43770066,
      "bookmarks": 54640,
      "latest_chapter": 412,
      "latest_chapter_id": "46e312a1-b31b-4150-a50d-3be5396c1c9c",
      "latest_chapter_time": "2026-08-04T16:24:22Z",
      "is_recommended": false,
      "genres": [{"name": "Action", "slug": "action"}, {"name": "Comedy", "slug": "comedy"}],
      "authors": [{"name": "Son Jeho", "slug": "son-jeho"}],
      "artists": [{"name": "Naver", "slug": "naver"}],
      "format": "Manhwa",
      "type": "Project"
    }
  ]
};