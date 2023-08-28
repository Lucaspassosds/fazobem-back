import { Module } from '@nestjs/common';
import { VoluntaryRoleService } from './voluntary-role.service';
import { VoluntaryRoleController } from './voluntary-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntaryRole } from './entities/voluntary-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoluntaryRole])],
  controllers: [VoluntaryRoleController],
  providers: [VoluntaryRoleService],
})
export class VoluntaryRoleModule {}
