import { Module } from '@nestjs/common';
import { VoluntaryService } from './voluntary.service';
import { VoluntaryController } from './voluntary.controller';

@Module({
  controllers: [VoluntaryController],
  providers: [VoluntaryService],
  exports: [VoluntaryService],
})
export class VoluntaryModule {}
