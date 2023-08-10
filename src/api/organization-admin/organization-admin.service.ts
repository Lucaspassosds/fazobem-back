import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { OrganizationAdmin } from './entities/organization-admin.entity';

@Injectable()
export class OrganizationAdminService extends BaseService<OrganizationAdmin> {}
