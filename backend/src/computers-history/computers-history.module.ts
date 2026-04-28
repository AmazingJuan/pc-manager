// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { AuthModule } from '@/auth/auth.module';
import { ComputersHistoryController } from '@computers-history/computers-history.controller';
import { ComputerStatusHistory } from '@computers-history/entities/computer-status-history.entity';
import { ComputersHistoryService } from '@computers-history/computers-history.service';
import { UsersModule } from '@users/users.module';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComputerStatusHistory]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ComputersHistoryController],
  providers: [ComputersHistoryService],
})
export class ComputersHistoryModule {}
