// apps/api/src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getLatestManga(page: number, pageSize: number) {
    // 1. Data template (beberapa komik asli dari Shinigami)
    const templateComics = [
      {
        manga_id: "07cba925-da21-497e-a5e0-b2ca712917df",
        title: "The Rebel Of The Tyrant Noble Family",
        alternative_title: "暴君名家の反逆者-Aster-",
        description: "Ash mengabdikan seluruh hidupnya kepada ayah angkatnya...",
        cover: "https://assets.shngm.id/thumbnail/cover/banner_1779114031941_12wx50.jpg",
        cover_portrait: "https://assets.shngm.id/thumbnail/cover/banner_1779114042625_r6y8oj.jpg",
        status: "Ongoing",
        release_year: "2026",
        country: "KR",
        rating: 8.5,
        views: 3160242,
        bookmarks: 24068,
        is_recommended: false,
        genres: [{ name: "Action", slug: "action" }],
        format: "Manhwa",
      },
      {
        manga_id: "2f7d8e13-c8f7-4a5f-a86f-186fbfa8a861",
        title: "Sword God's Livestream",
        alternative_title: "검술 고인물의 게임방송",
        description: "“Apa gunanya menjadi Sword God di kehidupan masa laluku?”",
        cover: "https://assets.shngm.id/thumbnail/cover/banner_1780413143206_40jdhv.jpg",
        cover_portrait: "https://assets.shngm.id/thumbnail/cover/banner_1780413155065_vkbur1.jpg",
        status: "Ongoing",
        release_year: "2026",
        country: "KR",
        rating: 8.2,
        views: 1700965,
        bookmarks: 13391,
        is_recommended: false,
        genres: [{ name: "Fantasy", slug: "fantasy" }, { name: "Game", slug: "game" }],
        format: "Manhwa",
      },
      {
        manga_id: "a61d6822-6001-45f1-99f5-501c81441583",
        title: "Chronicles Of The Demon-Slaying Cultivator",
        alternative_title: "멸귀수도전",
        description: "Balas dendamku baru akan berakhir setelah aku memusnahkan seluruh Demon Spirit.",
        cover: "https://assets.shngm.id/thumbnail/cover/banner_1785771328032_dlamcp.jpg",
        cover_portrait: "https://assets.shngm.id/thumbnail/cover/banner_1785771346656_hbk7dd.jpg",
        status: "Ongoing",
        release_year: "2026",
        country: "KR",
        rating: 9.2,
        views: 348554,
        bookmarks: 8719,
        is_recommended: true,
        genres: [{ name: "Action", slug: "action" }, { name: "Murim", slug: "murim" }],
        format: "Manhwa",
      },
      {
        manga_id: "6b942d3b-32f9-470e-b073-e5bb04497e46",
        title: "Tears on a Withered Flower",
        alternative_title: "시든 꽃에 눈물을",
        description: "Kehidupan Na Hae-soo berubah ketika suaminya mengkhianatinya...",
        cover: "https://assets.shngm.id/thumbnail/cover/banner_1773139434038_qu4lmw.webp",
        cover_portrait: null,
        status: "Ongoing",
        release_year: "2024",
        country: "KR",
        rating: 7.0,
        views: 783212,
        bookmarks: 3442,
        is_recommended: false,
        genres: [{ name: "Romance", slug: "romance" }, { name: "Drama", slug: "drama" }],
        format: "Manhwa",
      }
    ];

    // 2. Fungsi untuk mencetak 20 komik (atau sesuai pageSize) secara dinamis
    const generatedData = Array.from({ length: pageSize }).map((_, index) => {
      // Mengambil template secara bergantian (0, 1, 2, 3, 0, 1, ...)
      const template = templateComics[index % templateComics.length];
      
      // Menghitung urutan item keseluruhan
      const globalItemNumber = (page - 1) * pageSize + (index + 1);

      return {
        ...template,
        // Memodifikasi ID dan Judul agar terlihat unik di setiap halamannya
        manga_id: `${template.manga_id}-page${page}-item${index}`,
        title: `${template.title} (Vol. ${globalItemNumber})`,
        latest_chapter: globalItemNumber, 
        latest_chapter_id: `chapter-id-${globalItemNumber}`,
        latest_chapter_time: new Date().toISOString(),
        authors: [{ name: "Menyusul", slug: "menyusul" }],
        artists: [{ name: "Menyusul", slug: "menyusul-0" }],
        type: "Project"
      };
    });

    // 3. Mengirimkan Response
    return {
      status: "success",
      creator: "Sanka Vollerei",
      source: "Shinigami",
      pagination: {
        current_page: page,
        total_pages: 50,
        total_record: 1000,
        page_size: pageSize
      },
      data: generatedData
    };
  }
}