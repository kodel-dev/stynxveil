// apps/api/src/app.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('comic/shinigami')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  getHome() {
    return this.appService.getHomeData();
  }

  @Get('slider/:category')
  getSliderWithCategory(@Param('category') category: string) {
    return this.appService.getSliderData(category);
  }

  @Get('slider')
  getSliderDefault() {
    return this.appService.getSliderData();
  }

  @Get('explore/:category')
  getExplore(
    @Param('category') category: string,
    @Query('page') page: string = '1',
    @Query('page_size') pageSize: string = '10',
  ) {
    return this.appService.getExploreData(category, Number(page), Number(pageSize));
  }

  // Endpoint Latest Manga dengan Pagination
  @Get('latest')
  getLatestManga(
    @Query('page') page: string = '1',
    @Query('page_size') pageSize: string = '20',
  ) {
    return this.appService.getLatestManga(Number(page), Number(pageSize));
  }
}