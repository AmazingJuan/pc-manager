// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { ComponentsModule } from '@components/components.module';
import { ComputersHistoryModule } from '@computers-history/computers-history.module';
import { ComputersModule } from '@computers/computers.module';
import { UsersModule } from '@users/users.module';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'test'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ComponentsModule,
    ComputersModule,
    ComputersHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
