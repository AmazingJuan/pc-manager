// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AppModule } from '@/app.module';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap().catch(console.error);
