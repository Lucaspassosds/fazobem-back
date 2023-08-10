import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { BaseService } from '../common/services/base.service';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService extends BaseService<Organization> {}
