import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { BaseService } from '../common/services/base.service';
import { Organization } from './entities/organization.entity';
import { Connection, Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationAdmin } from '../organization-admin/entities/organization-admin.entity';

@Injectable()
export class OrganizationService extends BaseService<Organization> {
  constructor(
    @InjectRepository(Organization)
    organizationRepository: Repository<Organization>,
    @InjectRepository(OrganizationAdmin)
    private organizationAdminRepository: Repository<OrganizationAdmin>,
    private readonly connection: Connection,
  ) {
    super(organizationRepository);
  }

  findOne(organizationId: string) {
    return this.baseRepository.findOne({
      where: {
        id: organizationId,
      },
      relations: {
        organizationAdmin: {
          user: true,
        },
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  async findAll() {
    const organizations = await this.baseRepository.find();

    const promises = organizations.map(async (organization) => {
      const admins = await this.organizationAdminRepository.find({
        where: {
          organization: {
            id: organization.id,
          },
          isDeleted: false,
          isRegistered: true,
        },
      });

      return { ...organization, admins: admins.length };
    });

    return Promise.all(promises);
  }
}
