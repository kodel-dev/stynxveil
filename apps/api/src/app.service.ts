import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getLatestManga(page: number, pageSize: number) {
    try {
      // Mengambil data asli dari API sankavollerei
      const response = await axios.get('https://www.sankavollerei.web.id/comic/shinigami/latest', {
        params: {
          page,
          page_size: pageSize
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from external API:', error);
      throw new HttpException(
        'Failed to fetch manga data',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}