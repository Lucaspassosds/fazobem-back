import { Controller } from '@nestjs/common';
import { OrganizationAdminService } from './organization-admin.service';

@Controller('organization-admin')
export class OrganizationAdminController {
  constructor(
    private readonly organizationAdminService: OrganizationAdminService,
  ) {}
}
