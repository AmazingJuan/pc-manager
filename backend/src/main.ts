// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AppModule } from '@/app.module';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap().catch(console.error);
