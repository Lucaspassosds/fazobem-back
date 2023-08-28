import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationAdminModule } from '../organization-admin/organization-admin.module';
import { OrganizationAdmin } from '../organization-admin/entities/organization-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, OrganizationAdmin]),
    OrganizationAdminModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
