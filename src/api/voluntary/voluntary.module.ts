import { Module } from '@nestjs/common';
import { VoluntaryService } from './voluntary.service';
import { VoluntaryController } from './voluntary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntary } from './entities/voluntary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voluntary])],
  controllers: [VoluntaryController],
  providers: [VoluntaryService],
  exports: [VoluntaryService],
})
export class VoluntaryModule {}
