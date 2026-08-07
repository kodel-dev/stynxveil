import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan CORS. Di production, set CORS_ORIGIN (misal https://stynxveil.com)
  // agar tidak semua origin diizinkan mengakses API.
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Menjalankan Backend di port 5000 agar tidak bentrok dengan Frontend
  await app.listen(5000);
  console.log(`Backend API berhasil berjalan di: http://localhost:5000`);
}
bootstrap();