// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { ComputersHistoryController } from '@computers-history/computers-history.controller';
import { ComputersHistoryService } from '@computers-history/computers-history.service';
import { ComputerStatusHistory } from '@computers-history/entities/computer-status-history.entity';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComputerStatusHistory])],
  controllers: [ComputersHistoryController],
  providers: [ComputersHistoryService],
})
export class ComputersHistoryModule {}
