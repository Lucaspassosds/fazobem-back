import { Module } from '@nestjs/common';
import { OrganizationAdminService } from './organization-admin.service';
import { OrganizationAdminController } from './organization-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationAdmin } from './entities/organization-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationAdmin])],
  controllers: [OrganizationAdminController],
  providers: [OrganizationAdminService],
  exports: [OrganizationAdminService],
})
export class OrganizationAdminModule {}
