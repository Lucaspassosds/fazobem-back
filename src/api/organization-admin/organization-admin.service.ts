import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { OrganizationAdmin } from './entities/organization-admin.entity';

@Injectable()
export class OrganizationAdminService extends BaseService<OrganizationAdmin> {
  getAdminCompanies(userId: string) {
    return this.baseRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        organization: true,
      },
    });
  }
}
