import { Module } from '@nestjs/common';
import { VoluntaryRoleService } from './voluntary-role.service';
import { VoluntaryRoleController } from './voluntary-role.controller';

@Module({
  controllers: [VoluntaryRoleController],
  providers: [VoluntaryRoleService]
})
export class VoluntaryRoleModule {}
