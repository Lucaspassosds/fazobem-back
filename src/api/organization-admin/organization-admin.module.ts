import { Module } from '@nestjs/common';
import { OrganizationAdminService } from './organization-admin.service';
import { OrganizationAdminController } from './organization-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationAdmin } from './entities/organization-admin.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationAdmin, User])],
  controllers: [OrganizationAdminController],
  providers: [OrganizationAdminService],
  exports: [OrganizationAdminService],
})
export class OrganizationAdminModule {}
