import { Module } from '@nestjs/common';
import { VoluntaryShiftsService } from './voluntary-shifts.service';
import { VoluntaryShiftsController } from './voluntary-shifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntaryShift } from './entities/voluntary-shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoluntaryShift])],
  controllers: [VoluntaryShiftsController],
  providers: [VoluntaryShiftsService],
})
export class VoluntaryShiftsModule {}
