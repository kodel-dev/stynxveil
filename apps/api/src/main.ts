import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan CORS agar Next.js (localhost:3000) diizinkan mengambil data
  app.enableCors({
    origin: '*', // Untuk tahap development, kita izinkan dari mana saja
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Menjalankan Backend di port 5000 agar tidak bentrok dengan Frontend
  await app.listen(5000);
  console.log(`Backend API berhasil berjalan di: http://localhost:5000`);
}
bootstrap();