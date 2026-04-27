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
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Lol225533*',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
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
