import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getLatestManga(page: number, pageSize: number) {
    try {
      const response = await axios.get('https://www.sankavollerei.web.id/comic/shinigami/latest', {
        params: { page, page_size: pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from external API:', error);
      throw new HttpException('Failed to fetch manga data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchManga(query: string, page: number) {
    try {
      const response = await axios.get(`https://www.sankavollerei.web.id/comic/shinigami/search/${encodeURIComponent(query)}`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to search manga', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDetail(mangaId: string) {
    try {
      const response = await axios.get(`https://www.sankavollerei.web.id/comic/shinigami/detail/${mangaId}`);
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to get manga details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChapters(mangaId: string, page: number) {
    try {
      const response = await axios.get(`https://www.sankavollerei.web.id/comic/shinigami/chapters/${mangaId}`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to get manga chapters', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async readChapter(chapterId: string) {
    try {
      const response = await axios.get(`https://www.sankavollerei.web.id/comic/shinigami/read/${chapterId}`);
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to read chapter', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getExploreList(category: string) {
    try {
      const response = await axios.get(`https://www.sankavollerei.web.id/comic/shinigami/explore/${category}`);
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to get explore list', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}