// apps/api/src/app.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
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
}