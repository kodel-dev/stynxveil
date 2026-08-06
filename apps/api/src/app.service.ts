// apps/api/src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private getUniqueComicsList() {
    return [
      {
        manga_id: 'com-01',
        title: 'Absolute Sword Sense',
        alternative_title: '절대검감',
        description: 'Seorang pembunuh bayaran terbangun kembali dengan membawa teknik pedang mutlak.',
        cover: 'https://assets.shngm.id/thumbnail/cover/97d484ecb5fa.jpeg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2022',
        country: 'KR',
        rating: 7.7,
        views: 116400,
        bookmarks: 5200,
        latest_chapter: 53,
        latest_chapter_id: 'ch-53-a',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        is_recommended: true,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Murim', slug: 'murim' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-02',
        title: "Academy’s Genius Swordmaster",
        alternative_title: '아카데미의 천재칼잡이',
        description: 'Ronan hidup kembali dan masuk akademi elit untuk membalas dendam.',
        cover: 'https://assets.shngm.id/thumbnail/cover/banner_1778941047876_cceu1b.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2023',
        country: 'KR',
        rating: 8.2,
        views: 147800,
        bookmarks: 6400,
        latest_chapter: 56,
        latest_chapter_id: 'ch-56-b',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        is_recommended: true,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Fantasy', slug: 'fantasy' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-03',
        title: 'Childhood Friend Of The Zenith',
        alternative_title: '천재 소꿉친구',
        description: 'Kisah persahabatan dengan seseorang yang ditakdirkan menjadi yang terkuat di dunia.',
        cover: 'https://assets.shngm.id/thumbnail/image/27994c6a-415a-41cf-8569-de7e9b6ae7d9.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2024',
        country: 'KR',
        rating: 8.7,
        views: 179200,
        bookmarks: 7800,
        latest_chapter: 59,
        latest_chapter_id: 'ch-59-c',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
        is_recommended: true,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Drama', slug: 'drama' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-04',
        title: 'Absolute Regression',
        alternative_title: '절대회귀',
        description: 'Kesempatan kedua untuk memperbaiki masa lalu di dunia seni bela diri.',
        cover: 'https://assets.shngm.id/thumbnail/cover/222a52a4abe4.jpeg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2023',
        country: 'KR',
        rating: 9.2,
        views: 210700,
        bookmarks: 9100,
        latest_chapter: 62,
        latest_chapter_id: 'ch-62-d',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        is_recommended: true,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Martial Arts', slug: 'martial-arts' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-05',
        title: 'Boundless Necromancer',
        alternative_title: '나 혼자 특성빨로 무한 성장',
        description: 'Menjadi seorang Necromancer tanpa batas di menara ujian mematikan.',
        cover: 'https://assets.shngm.id/thumbnail/cover/66f0eee7f473.jpeg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2022',
        country: 'KR',
        rating: 7.2,
        views: 242100,
        bookmarks: 10400,
        latest_chapter: 65,
        latest_chapter_id: 'ch-65-e',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        is_recommended: true,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Magic', slug: 'magic' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-06',
        title: 'Nano Machine',
        alternative_title: '나노마신',
        description: 'Penyisipan mesin nano ke dalam tubuh keturunan sekte iblis.',
        cover: 'https://assets.shngm.id/thumbnail/image/38e34bb8-29c2-43f6-a2cc-ec9d4991ff5a.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2020',
        country: 'KR',
        rating: 9.4,
        views: 5599000,
        bookmarks: 70500,
        latest_chapter: 324,
        latest_chapter_id: 'ch-324-f',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        is_recommended: false,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Sci-fi', slug: 'sci-fi' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-07',
        title: 'Pick Me Up',
        alternative_title: 'Pick Me Up, Infinite Gacha',
        description: 'Peringkat 5 dunia terjebak sebagai karakter level 1 dalam game gacha.',
        cover: 'https://assets.shngm.id/thumbnail/cover/banner_1778080928768_j48q5q.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2022',
        country: 'KR',
        rating: 9.1,
        views: 3880000,
        bookmarks: 75600,
        latest_chapter: 213,
        latest_chapter_id: 'ch-213-g',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        is_recommended: false,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Fantasy', slug: 'fantasy' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-08',
        title: 'Star-Embracing Swordmaster',
        alternative_title: '별을 품은 소드마스터',
        description: 'Anak gelandangan yang mendengar suara misterius setelah tersambar petir hitam.',
        cover: 'https://assets.shngm.id/thumbnail/image/8e38baef-c9c5-4662-adab-778237de2eb3.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2023',
        country: 'KR',
        rating: 8.5,
        views: 2454000,
        bookmarks: 61700,
        latest_chapter: 132,
        latest_chapter_id: 'ch-132-h',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        is_recommended: false,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Adventure', slug: 'adventure' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-09',
        title: 'Bad Born Blood',
        alternative_title: '배드 본 블러드',
        description: 'Perjuangan pemuda kumuh mengikuti ujian seleksi Imperial Guard di luar angkasa.',
        cover: 'https://assets.shngm.id/thumbnail/image/14a3f6b7-063e-4062-94cd-3269b4170d30.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2024',
        country: 'KR',
        rating: 8.3,
        views: 493000,
        bookmarks: 27900,
        latest_chapter: 94,
        latest_chapter_id: 'ch-94-i',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
        is_recommended: false,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Sci-fi', slug: 'sci-fi' }],
        format: 'Manhwa',
        type: 'Mirror'
      },
      {
        manga_id: 'com-10',
        title: 'The Former Absolute Supreme',
        alternative_title: '전직지존',
        description: 'Mantan seniman bela diri terhebat merebut kembali kekuatannya dari bawah.',
        cover: 'https://assets.shngm.id/thumbnail/cover/banner_1785929171809_wx41q2.jpg',
        cover_portrait: null,
        status: 'Ongoing',
        release_year: '2026',
        country: 'KR',
        rating: 8.5,
        views: 417000,
        bookmarks: 4500,
        latest_chapter: 10,
        latest_chapter_id: 'ch-10-j',
        latest_chapter_time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        is_recommended: false,
        genres: [{ name: 'Action', slug: 'action' }, { name: 'Murim', slug: 'murim' }],
        format: 'Manhwa',
        type: 'Mirror'
      }
    ];
  }

  async getHomeData() {
    const list = this.getUniqueComicsList();
    return {
      status: 'success',
      creator: 'Sanka Vollerei',
      source: 'Shinigami',
      data: {
        latest: list,
        recommended: list.slice(0, 5),
        popular: [...list].sort((a, b) => b.views - a.views),
        projectComics: [],
        mirrorComics: list,
      }
    };
  }

  async getSliderData(category?: string) {
    const list = this.getUniqueComicsList();
    return { status: "success", creator: "Sanka Vollerei", source: "Shinigami", data: list.slice(0, 3) };
  }

  async getExploreData(category: string, page = 1, pageSize = 10) {
    const list = this.getUniqueComicsList();
    return {
      status: "success",
      creator: "Sanka Vollerei",
      source: "Shinigami",
      pagination: { current_page: Number(page), total_pages: 1, total_record: list.length, page_size: Number(pageSize) },
      data: list
    };
  }

  async getLatestManga(page = 1, pageSize = 20) {
    const list = this.getUniqueComicsList();
    return {
      status: "success",
      creator: "Sanka Vollerei",
      source: "Shinigami",
      pagination: { current_page: Number(page), total_pages: 1, total_record: list.length, page_size: Number(pageSize) },
      data: list
    };
  }
}