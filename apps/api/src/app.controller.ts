// apps/api/src/app.controller.ts
import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('comic/shinigami') // Membuat base route /comic/shinigami
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('latest') // Membuat sub-route /latest
  getLatestManga(
    @Query('page') page: string = '1',
    @Query('page_size') pageSize: string = '20',
  ) {
    // Melempar parameter ke AppService
    return this.appService.getLatestManga(Number(page), Number(pageSize));
  }

  @Get('search/:query')
  searchManga(
    @Param('query') query: string,
    @Query('page') page: string = '1',
  ) {
    return this.appService.searchManga(query, Number(page));
  }

  @Get('detail/:manga_id')
  getDetail(@Param('manga_id') mangaId: string) {
    return this.appService.getDetail(mangaId);
  }

  @Get('chapters/:manga_id')
  getChapters(
    @Param('manga_id') mangaId: string,
    @Query('page') page: string = '1',
  ) {
    return this.appService.getChapters(mangaId, Number(page));
  }

  @Get('read/:chapter_id')
  readChapter(@Param('chapter_id') chapterId: string) {
    return this.appService.readChapter(chapterId);
  }

  @Get('explore/:category')
  getExploreList(@Param('category') category: string) {
    return this.appService.getExploreList(category);
  }
}