import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // WAJIB ADA agar Next.js diizinkan mengambil data ke NestJS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5000);
  console.log(`Backend API berhasil berjalan di: http://localhost:5000`);
}
bootstrap();