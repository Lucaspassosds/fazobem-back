import { Module } from '@nestjs/common';
import { OrganizationAdminService } from './organization-admin.service';
import { OrganizationAdminController } from './organization-admin.controller';

@Module({
  controllers: [OrganizationAdminController],
  providers: [OrganizationAdminService],
  exports: [OrganizationAdminService],
})
export class OrganizationAdminModule {}
