// apps/web/src/data/exploreDummy.ts

export interface Genre {
  name: string;
  slug: string;
}

export interface ExploreComic {
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
  format: 'Manga' | 'Manhwa' | 'Manhua';
  type: 'Project' | 'Mirror';
  genres: Genre[];
}

// Data Mentah Asli dari Endpoint Explore List Shinigami
const rawExploreData: ExploreComic[] = [
  {
    manga_id: "f0a8f3d7-d509-4ea7-b55f-b0a8127fdb99",
    title: "Absolute Sword Sense",
    alternative_title: "절대검감",
    description: "Dari author yang sama dengan Nano Machine...",
    cover: "https://assets.shngm.id/thumbnail/cover/97d484ecb5fa.jpeg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/d6d7458f-60d0-4bd9-a819-7ae7265e205f.jpg",
    status: "Ongoing",
    release_year: "2022",
    country: "KR",
    rating: 8.4,
    views: 24067990,
    bookmarks: 36730,
    latest_chapter: 195,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Action", slug: "action" }, { name: "Adventure", slug: "adventure" }, { name: "Martial Arts", slug: "martial-arts" }]
  },
  {
    manga_id: "df972fcd-4b13-4121-924e-d7c044301cb5",
    title: "Academy’s Genius Swordmaster",
    alternative_title: "아카데미의 천재칼잡이",
    description: "Ronan hidup dengan dipenuhi rasa penyesalan...",
    cover: "https://assets.shngm.id/thumbnail/cover/banner_1778941047876_cceu1b.jpg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/28614fd6-9240-411e-a0f3-56c5d5cdc50d.jpg",
    status: "Ongoing",
    release_year: "2023",
    country: "KR",
    rating: 8.7,
    views: 23287711,
    bookmarks: 54046,
    latest_chapter: 148,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Action", slug: "action" }, { name: "Fantasy", slug: "fantasy" }]
  },
  {
    manga_id: "a0b5651b-584b-4f5b-a4aa-8a68c15320c0",
    title: "Childhood Friend Of The Zenith",
    alternative_title: "천하제일인의 소꿉친구",
    description: "Gu Yangchun orang yang mengkhianati sekte-sekte ortodoks...",
    cover: "https://assets.shngm.id/thumbnail/image/460dac20-6978-422f-9008-67755cf38ee2.jpg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/ddd67840-4706-416b-91df-2701ef9a4aab.jpg",
    status: "Completed",
    release_year: "2024",
    country: "KR",
    rating: 8.7,
    views: 14387824,
    bookmarks: 45105,
    latest_chapter: 104,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Action", slug: "action" }, { name: "Martial Arts", slug: "martial-arts" }]
  },
  {
    manga_id: "2a6bd6e1-9afe-4242-8a77-58da7cb77b4f",
    title: "Absolute Regression",
    alternative_title: "절대회귀",
    description: "Oleh studio yang membawakan The Return of the Crazy Demon...",
    cover: "https://assets.shngm.id/thumbnail/cover/610e37537db5.jpeg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/1ab5dff2-e1ab-443a-a9f8-e5a5ba0d3b56.jpg",
    status: "Ongoing",
    release_year: "2024",
    country: "KR",
    rating: 8.6,
    views: 13615859,
    bookmarks: 37183,
    latest_chapter: 112,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Action", slug: "action" }, { name: "Fantasy", slug: "fantasy" }]
  },
  {
    manga_id: "294e2b53-bd51-416e-9831-4b2832363ec5",
    title: "Boundless Necromancer",
    alternative_title: "나 혼자 특성빨로 무한 성장",
    description: "Dari Studio Solo Leveling...",
    cover: "https://assets.shngm.id/thumbnail/cover/222a52a4abe4.jpeg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/38d19795-8b46-4f4e-ad94-10508daeac0d.jpg",
    status: "Ongoing",
    release_year: "2022",
    country: "KR",
    rating: 8.2,
    views: 13590856,
    bookmarks: 21055,
    latest_chapter: 177,
    format: "Manhwa",
    type: "Mirror",
    genres: [{ name: "Action", slug: "action" }, { name: "Magic", slug: "magic" }]
  },
  {
    manga_id: "0ee5001f-242f-439a-838b-1505a1a49cb7",
    title: "Absolute Dominion",
    alternative_title: "절대군림",
    description: "Aku akan melahap Jianghu ini...",
    cover: "https://assets.shngm.id/thumbnail/cover/66f0eee7f473.jpeg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/eddff826-dabb-4bbc-b61b-7cd901c31724.jpg",
    status: "Ongoing",
    release_year: "2024",
    country: "KR",
    rating: 8.8,
    views: 11455254,
    bookmarks: 34871,
    latest_chapter: 103,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Comedy", slug: "comedy" }, { name: "Martial Arts", slug: "martial-arts" }]
  },
  {
    manga_id: "79d24cc4-1cfa-49a7-9f03-56af5e085471",
    title: "Becoming the Swordmaster Rank Young Lord",
    alternative_title: "사천당가의 검신급 소가주가 되었다",
    description: "Keluarga Tang Sichuan kini telah mengalami kemunduran...",
    cover: "https://assets.shngm.id/thumbnail/image/e8f91c9c-ee5b-4a7c-9c5b-e9d532a63f1c.jpg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/f47c72c8-2fd6-40aa-93af-e60c3e5d5386.jpg",
    status: "Hiatus",
    release_year: "2024",
    country: "KR",
    rating: 8.4,
    views: 10972200,
    bookmarks: 22049,
    latest_chapter: 120,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Action", slug: "action" }, { name: "Adventure", slug: "adventure" }]
  },
  {
    manga_id: "a6f14516-e806-4184-a823-402e6244a8ad",
    title: "Bad Born Blood",
    alternative_title: "배드 본 블러드",
    description: "Dari Redice Studio yang mengerjakan Solo Leveling...",
    cover: "https://assets.shngm.id/thumbnail/image/14a3f6b7-063e-4062-94cd-3269b4170d30.jpg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/f76621c5-ce8d-40a7-933b-7ef6f6935f81.jpg",
    status: "Ongoing",
    release_year: "2024",
    country: "KR",
    rating: 8.3,
    views: 4933891,
    bookmarks: 27899,
    latest_chapter: 93,
    format: "Manhwa",
    type: "Mirror",
    genres: [{ name: "Action", slug: "action" }, { name: "Sci-fi", slug: "sci-fi" }]
  },
  {
    manga_id: "eb144391-253f-48cd-b7a8-411ab74656d4",
    title: "Bones",
    alternative_title: "본즈",
    description: "Sang protagonis Kang Jihyoung ingin menjadi seorang Hunter...",
    cover: "https://assets.shngm.id/thumbnail/cover/ba5692796672.jpeg",
    cover_portrait: "https://assets.shngm.id/thumbnail/image/5bc3da20-edbd-474b-a4d0-16d7f5e7d609.jpg",
    status: "Hiatus",
    release_year: "2024",
    country: "KR",
    rating: 8.1,
    views: 1922245,
    bookmarks: 8303,
    latest_chapter: 30,
    format: "Manhwa",
    type: "Project",
    genres: [{ name: "Action", slug: "action" }, { name: "Adventure", slug: "adventure" }]
  }
];

// Menggandakan data mentah agar total ada 27 komik (mendukung multiple pagination pages)
export const exploreComicsData: ExploreComic[] = [
  ...rawExploreData,
  ...rawExploreData.map((item, index) => ({
    ...item,
    manga_id: `${item.manga_id}-dup1-${index}`,
    title: `${item.title} (Season 2)`
  })),
  ...rawExploreData.map((item, index) => ({
    ...item,
    manga_id: `${item.manga_id}-dup2-${index}`,
    title: `${item.title} Special`
  }))
];