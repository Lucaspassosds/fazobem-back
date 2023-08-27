import { Module } from '@nestjs/common';
import { VoluntaryShiftsService } from './voluntary-shifts.service';
import { VoluntaryShiftsController } from './voluntary-shifts.controller';

@Module({
  controllers: [VoluntaryShiftsController],
  providers: [VoluntaryShiftsService],
})
export class VoluntaryShiftsModule {}
