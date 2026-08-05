// apps/web/src/data/dummy.ts

export interface Genre {
  name: string;
  slug: string;
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

export interface ShinigamiManga {
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
  format: 'Manga' | 'Manhwa' | 'Manhua';
  type: 'Project' | 'Mirror';
}

// --- DATA SLIDER ASLI DARI ENDPOINT SHINIGAMI (DITAMBAHKAN KATA EXPORT) --- //
export const initialHeroSlides: HeroSlide[] = [
  {
    id: 11,
    title: "Solo Leveling: Ragnarok",
    rating: "9.4",
    background_image: "https://storage.shngm.id/thumbnail/image/6854dd69-5e2a-4b53-96ce-18d524f8d76e.jpg",
    chara_image: "https://storage.shngm.id/thumbnail/image/93d655e4-2a39-4807-b7d2-3f6cd6195dbe.jpg",
    manga_id: "935b0a6e-1fcb-4ea4-b9ae-dcf6540a9f10",
    blur_color: "#000000",
    category: "explore-1",
    description: "Keberadaan Bumi sekali lagi mendapatkan ancaman ketika Itarim gods dari universe lain ingin mengisi kekosongan yang ditinggalkan oleh Absolute Being Sung Jinwoo tidak memiliki pilihan selain mengirimkan Beru sang Shadow Ant King untuk membangkitkan kekuatan anaknya dan membawanya menuju jalan yang dulu pernah dia tempuh Suho harus menaklukkan Shadow Dungeon dan mendapatkan posisinya di dunia Hunter selagi dia menjalani dunia yang baru melawan kejahatan baru yang berusaha melahap seisi dunia",
    badges: [
      { name: "New", color: "#F79F1F" },
      { name: "Popular", color: "#e84118" }
    ]
  },
  {
    id: 12,
    title: "Pick Me Up!",
    rating: "9.2",
    background_image: "https://storage.shngm.id/thumbnail/image/c5000464-9ed1-4435-9fe8-dbe7ad947f7f.jpg",
    chara_image: "https://storage.shngm.id/thumbnail/image/78ce6a0e-7b22-4964-b547-5f3b98ee8eb4.jpg",
    manga_id: "f96af365-8bf3-4b23-ab53-7bb6994a375d",
    blur_color: "#000000",
    category: "explore-1",
    description: "Dalam game gacha yang terkenal dengan kesulitannya yang mengerikan Master peringkat ke5 di dunia Loki kehilangan kesadaran saat menyerbu Dungeon\nApa Aku karakter game sekarang\nSetelah bangun Loki menyadari bahwa dia telah berubah menjadi Pahlawan Level 1 Bintang 1Han Yslat Untuk kembali ke Bumi dia harus memimpin para master dan hero pemula dan membersihkan lantai 100 Dungeon\nKau macammacam dengan orang yang salah\nIni adalah kisah perjuangan keras Master Loki yang belum pernah mengalami satu kekalahan pun",
    badges: [
      { name: "Thrill", color: "#222f3e" },
      { name: "Action", color: "#b91c1c" }
    ]
  },
  {
    id: 13,
    title: "Chronicles Of The Martial God’s Return",
    rating: "8.3",
    background_image: "https://storage.shngm.id/thumbnail/image/7503eeec-f4f0-42be-a06d-f16562c251ac.jpg",
    chara_image: "https://storage.shngm.id/thumbnail/image/1c31a9a8-2da9-4a63-88d5-fe2fe619f336.jpg",
    manga_id: "724e04ff-14cd-4172-9ebf-980eaf6b8510",
    blur_color: "#000000",
    category: "explore-1",
    description: "Manhwa Baru dari Studio DC Webtoon yang juga mengerjakan Leveling With God\nUltimate Martial Divine Demon Dan Woohyun disegel karena dia terlalu kuat untuk ditangani dunia Setelah satu milenium berlalu dia dilepaskan dari segelnya dan merasa semuanya tidak ada artinya saat dia berkeliaran di ganggang belakang Tepat saat dia jatuh karena dia muak dengan dunia sebuah tangan kecil muncul di depannya Apa ini tanya Dan Woohyun Sebuah pangsit jawabnya Ini adalah pertama kalinya dalam hidupnya ada seseorang yang bersikap baik padanya tanpa niat tersembunyi dan itu mengubah nasibnya Chronicle dari seorang Martial God yang melintasi ribuan tahun ruang dan waktu",
    badges: [
      { name: "Murim", color: "#273c75" },
      { name: "Daddy", color: "#22c55e" }
    ]
  }
];

// Data Komik Hot & Latest
const apiResponse = {
  "status": "success",
  "data": {
    "latest": [
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
        "views": 782636,
        "bookmarks": 3437,
        "latest_chapter": 112,
        "latest_chapter_id": "0e3565fa-317a-4889-bf75-59e604ccebe0",
        "latest_chapter_time": "2026-08-04T19:03:46Z",
        "is_recommended": false,
        "genres": [{ "name": "Romance", "slug": "romance" }, { "name": "Drama", "slug": "drama" }],
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
        "views": 3181383,
        "bookmarks": 11497,
        "latest_chapter": 147,
        "latest_chapter_id": "7daa19eb-938e-417c-958f-559ac15098b7",
        "latest_chapter_time": "2026-08-04T17:46:45Z",
        "is_recommended": false,
        "genres": [{ "name": "Action", "slug": "action" }, { "name": "Fantasy", "slug": "fantasy" }],
        "format": "Manhwa",
        "type": "Mirror"
      },
      {
        "manga_id": "cc733648-a57e-448f-82e8-5576b2b087f1",
        "title": "The Demonic Sect Master’s Secret Apprentice",
        "alternative_title": "魔教教主苟在我身边看我偷偷修炼",
        "description": "He Yun, yang dijual ke Istana Iblis Sembilan Nether saat dia masih muda...",
        "cover": "https://assets.shngm.id/thumbnail/cover/banner_1782468229767_5ra2my.jpg",
        "cover_portrait": null,
        "status": "Ongoing",
        "release_year": "2025",
        "country": "CN",
        "rating": 7,
        "views": 442576,
        "bookmarks": 2480,
        "latest_chapter": 82,
        "latest_chapter_id": "2fb07be4-2b2a-4426-97bd-cd47e8be6f74",
        "latest_chapter_time": "2026-08-04T17:24:54Z",
        "is_recommended": false,
        "genres": [{ "name": "Action", "slug": "action" }, { "name": "Martial Arts", "slug": "martial-arts" }],
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
        "views": 1894346,
        "bookmarks": 8239,
        "latest_chapter": 119,
        "latest_chapter_id": "00de7065-29b1-4655-af3c-e563708e25a9",
        "latest_chapter_time": "2026-08-04T17:21:52Z",
        "is_recommended": false,
        "genres": [{ "name": "Adventure", "slug": "adventure" }],
        "format": "Manhua",
        "type": "Mirror"
      },
      {
        "manga_id": "db64192e-f547-42cf-b302-b40060870ab1",
        "title": "What’s Wrong With Being the Villainess?",
        "alternative_title": "악녀라서 편하고 좋은데요?",
        "description": "“Jadi memang kenapa kalau aku penjahatnya? Gaya hidup yang menyenangkan...”",
        "cover": "https://assets.shngm.id/thumbnail/cover/banner_1780567759866_sv31fl.jpg",
        "cover_portrait": null,
        "status": "Ongoing",
        "release_year": "2022",
        "country": "KR",
        "rating": 7,
        "views": 388732,
        "bookmarks": 2127,
        "latest_chapter": 102,
        "latest_chapter_id": "3407086e-8893-4724-9417-86b09e3e7050",
        "latest_chapter_time": "2026-08-04T17:15:23Z",
        "is_recommended": false,
        "genres": [{ "name": "Romance", "slug": "romance" }, { "name": "Comedy", "slug": "comedy" }],
        "format": "Manhwa",
        "type": "Mirror"
      },
      {
        "manga_id": "4f9bfa2f-ab32-475d-be7c-83c804ae4bea",
        "title": "First Time as a Loved Youngest Child",
        "alternative_title": "사랑받는 막내는 처음이라",
        "description": "Seorang bayi perempuan telah lahir!",
        "cover": "https://assets.shngm.id/thumbnail/cover/banner_1785860670483_qemltq.png",
        "cover_portrait": null,
        "status": "Ongoing",
        "release_year": "2023",
        "country": "KR",
        "rating": 7,
        "views": 2070,
        "bookmarks": 37,
        "latest_chapter": 105,
        "latest_chapter_id": "c55c7e09-5985-4245-a322-5b304e2dacc2",
        "latest_chapter_time": "2026-08-04T17:13:18Z",
        "is_recommended": false,
        "genres": [{ "name": "Romance", "slug": "romance" }],
        "format": "Manhwa",
        "type": "Mirror"
      },
      {
        "manga_id": "ae79b0d9-8af2-458d-a313-0849cb4f1c54",
        "title": "A Veteran Player Is Needed In The Apocalypse",
        "alternative_title": "아포칼립스엔 고인물이 필요해요",
        "description": "Kami semua seolah-olah dibawa masuk ke dalam permainan itu...",
        "cover": "https://assets.shngm.id/thumbnail/cover/banner_1782828033600_hghhmh.png",
        "cover_portrait": "https://assets.shngm.id/thumbnail/cover/banner_1783481696362_piha3d.jpg",
        "status": "Ongoing",
        "release_year": "2026",
        "country": "KR",
        "rating": 8.5,
        "views": 1054563,
        "bookmarks": 12596,
        "latest_chapter": 28,
        "latest_chapter_id": "d1a9db2a-35d2-4199-80d0-6b0ae7aa4f92",
        "latest_chapter_time": "2026-08-04T16:26:33Z",
        "is_recommended": true,
        "genres": [{ "name": "Action", "slug": "action" }],
        "format": "Manhwa",
        "type": "Mirror"
      }
    ],
    "recommended": [
      {
        "manga_id": "c0f1d049-ff7f-474d-8c6a-3a55e4c44147",
        "title": "Demonic Emperor",
        "alternative_title": "Magic Emperor, 魔皇大管家",
        "description": "Karena dia memiliki warisan Ancient Demonic emperor...",
        "cover": "https://assets.shngm.id/thumbnail/image/8c4fdbee-ffb8-427d-ace7-f21fe6b72f77.jpg",
        "cover_portrait": "https://assets.shngm.id/thumbnail/image/d00e4253-656d-481e-b3ef-701e4c6d451e.jpg",
        "status": "Ongoing",
        "release_year": "2019",
        "country": "CN",
        "rating": 8.6,
        "views": 72680071,
        "bookmarks": 48439,
        "latest_chapter": 889,
        "latest_chapter_id": "825d0326-3dfe-47c8-8468-153725735068",
        "latest_chapter_time": "2026-08-02T00:24:32Z",
        "is_recommended": true,
        "genres": [{ "name": "Action", "slug": "action" }, { "name": "Fantasy", "slug": "fantasy" }],
        "format": "Manhua",
        "type": "Mirror"
      },
      {
        "manga_id": "f166beb7-67d8-47ea-9fa2-54aea1df6dd7",
        "title": "The Villain Of Destiny",
        "alternative_title": "I Am The Fated Villain",
        "description": "Begitu Gu Changge menyadari dia telah masuk ke sebuah dunia fantasi...",
        "cover": "https://assets.shngm.id/thumbnail/image/4629d00c-a3c0-414b-a8bd-b64a53f45723.jpg",
        "cover_portrait": "https://assets.shngm.id/thumbnail/image/e6ba24d4fbd0.jpeg",
        "status": "Ongoing",
        "release_year": "2021",
        "country": "CN",
        "rating": 8.7,
        "views": 33386665,
        "bookmarks": 35741,
        "latest_chapter": 348,
        "latest_chapter_id": "49cd0ed8-8f8f-41c9-a57b-8c2ff3bc6d99",
        "latest_chapter_time": "2026-08-03T01:07:02Z",
        "is_recommended": true,
        "genres": [{ "name": "Martial Arts", "slug": "martial-arts" }],
        "format": "Manhua",
        "type": "Mirror"
      },
      {
        "manga_id": "ff55b7a1-3c32-4c60-8172-1127980de3e1",
        "title": "Ending Maker",
        "alternative_title": "엔딩메이커",
        "description": "Ada dua orang yang sangat tergila-gila dengan game Legend of Heroes 2...",
        "cover": "https://assets.shngm.id/thumbnail/cover/banner_1777380848584_opwx8l.jpg",
        "cover_portrait": "https://assets.shngm.id/thumbnail/cover/banner_1777548104386_s7kl8b.jpg",
        "status": "Ongoing",
        "release_year": "2022",
        "country": "KR",
        "rating": 8.6,
        "views": 4796589,
        "bookmarks": 23900,
        "latest_chapter": 82,
        "latest_chapter_id": "0a2e8954-c563-4988-954a-abbf8d1a47a9",
        "latest_chapter_time": "2026-07-31T15:05:07Z",
        "is_recommended": true,
        "genres": [{ "name": "Game", "slug": "game" }, { "name": "Fantasy", "slug": "fantasy" }],
        "format": "Manhwa",
        "type": "Mirror"
      },
      {
        "manga_id": "48270276-bd79-4a46-b15e-fdd2cf5655b1",
        "title": "One Piece",
        "alternative_title": "Updating",
        "description": "Bercerita tentang seorang laki-laki bernama Monkey D Luffy...",
        "cover": "https://assets.shngm.id/thumbnail/cover/f9325dbc0a80.jpeg",
        "cover_portrait": null,
        "status": "Ongoing",
        "release_year": "1997",
        "country": "JP",
        "rating": 9,
        "views": 5623885,
        "bookmarks": 8457,
        "latest_chapter": 1189,
        "latest_chapter_id": "9c25dd9c-9ae5-497e-a544-1e862b7fa381",
        "latest_chapter_time": "2026-07-25T02:26:31Z",
        "is_recommended": true,
        "genres": [{ "name": "Adventure", "slug": "adventure" }, { "name": "Shounen", "slug": "shounen" }],
        "format": "Manga",
        "type": "Mirror"
      }
    ],
    "popular": [
      {
        "manga_id": "703f6c7a-ad78-4d50-b5cc-c768c0a12fdb",
        "title": "Revenge Of The Iron-Blooded Sword Hound",
        "alternative_title": "철혈검가 사냥개의 회귀",
        "description": "Anjing pemburu dari keluarga Baskerville...",
        "cover": "https://assets.shngm.id/thumbnail/cover/f99039ce619f.jpeg",
        "cover_portrait": "https://assets.shngm.id/thumbnail/image/d96303ba-bada-4003-aba8-08192706a941.jpg",
        "status": "Ongoing",
        "release_year": "2023",
        "country": "KR",
        "rating": 9.7,
        "views": 39229827,
        "bookmarks": 78425,
        "latest_chapter": 174,
        "latest_chapter_id": "619ca310-ab4b-4eaa-b3ea-204c415a1723",
        "latest_chapter_time": "2026-08-02T14:27:22Z",
        "is_recommended": false,
        "genres": [{ "name": "Action", "slug": "action" }],
        "format": "Manhwa",
        "type": "Mirror"
      },
      {
        "manga_id": "f96af365-8bf3-4b23-ab53-7bb6994a375d",
        "title": "Pick Me Up",
        "alternative_title": "Pick Me Up, Infinite Gacha",
        "description": "Dalam game gacha yang terkenal dengan kesulitannya...",
        "cover": "https://assets.shngm.id/thumbnail/cover/banner_1778080928768_j48q5q.jpg",
        "cover_portrait": "https://assets.shngm.id/thumbnail/image/97526c67-93d8-48e2-a287-dfd4f21f9674.jpg",
        "status": "Ongoing",
        "release_year": "2022",
        "country": "KR",
        "rating": 9.2,
        "views": 38763362,
        "bookmarks": 75591,
        "latest_chapter": 212,
        "latest_chapter_id": "a1ad631d-a72e-46e6-a6eb-1cb370461907",
        "latest_chapter_time": "2026-07-29T14:55:41Z",
        "is_recommended": false,
        "genres": [{ "name": "Fantasy", "slug": "fantasy" }],
        "format": "Manhwa",
        "type": "Mirror"
      },
      {
        "manga_id": "d3b05787-4c8e-42bb-ba9a-6b2fafd92f3c",
        "title": "Nano Machine",
        "alternative_title": "나노마신",
        "description": "Setelah direndahkan dan menghabiskan hidupnya dalam bahaya...",
        "cover": "https://assets.shngm.id/thumbnail/image/27994c6a-415a-41cf-8569-de7e9b6ae7d9.jpg",
        "cover_portrait": "https://assets.shngm.id/thumbnail/image/38e34bb8-29c2-43f6-a2cc-ec9d4991ff5a.jpg",
        "status": "Ongoing",
        "release_year": "2020",
        "country": "KR",
        "rating": 9.4,
        "views": 55960494,
        "bookmarks": 70525,
        "latest_chapter": 323,
        "latest_chapter_id": "4fa9d762-7586-4188-99d2-a0720d9757d0",
        "latest_chapter_time": "2026-07-29T18:43:50Z",
        "is_recommended": false,
        "genres": [{ "name": "Martial Arts", "slug": "martial-arts" }],
        "format": "Manhwa",
        "type": "Mirror"
      }
    ]
  }
};

// Ekspansi Data Hot & Latest
const baseHot = apiResponse.data.recommended as ShinigamiManga[];
export const hotComics = [...baseHot, ...baseHot, ...baseHot]
  .slice(0, 10)
  .map((comic, i) => ({ ...comic, manga_id: `${comic.manga_id}-${i}` }));

const baseLatest = apiResponse.data.latest as ShinigamiManga[];
export const latestUpdates = [...baseLatest, ...baseLatest, ...baseLatest]
  .slice(0, 20)
  .map((comic, i) => ({ ...comic, manga_id: `${comic.manga_id}-${i}` }));

export const popularComics = apiResponse.data.popular as ShinigamiManga[];

export const topComments = [
  { id: 1, username: 'ShadowMonarch', avatar: 'https://picsum.photos/seed/user1/100', comicId: '6b942d3b-32f9-470e-b073-e5bb04497e46', comicTitle: 'Tears on a Withered Flower', text: 'Sumpah artnya gila banget chapter ini! Berinding bacanya parah 🔥', likes: 2450, timeAgo: '2 jam lalu' },
  { id: 2, username: 'DokjaReader', avatar: 'https://picsum.photos/seed/user2/100', comicId: 'c0f1d049-ff7f-474d-8c6a-3a55e4c44147', comicTitle: 'Demonic Emperor', text: 'Gak sabar nunggu Zhuo Yifan ngamuk lagi, plotnya makin kesini makin mindblowing 😭', likes: 1892, timeAgo: '5 jam lalu' },
];

export const communityLeaders = [
  { id: 1, category: 'Top Pembaca', name: 'KutuBuku99', avatar: 'https://picsum.photos/seed/reader/100', value: '4,521 Chapter', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 2, category: 'Top Donatur', name: 'SultanKhilaf', avatar: 'https://picsum.photos/seed/sultan/100', value: 'Rp 5.500.000', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 3, category: 'Top Komentator', name: 'SiPalingSuhu', avatar: 'https://picsum.photos/seed/commenter/100', value: '2,134 Komentar', color: 'text-green-400', bg: 'bg-green-500/20' },
];

export const genresList: string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Isekai', 'Magic', 'Martial Arts', 'Mecha', 'Mystery', 'Romance', 'School Life', 'Sci-Fi', 'Shounen'];