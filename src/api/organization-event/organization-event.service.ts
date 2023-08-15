import { Injectable } from '@nestjs/common';
import { CreateOrganizationEventDto } from './dto/create-organization-event.dto';
import { UpdateOrganizationEventDto } from './dto/update-organization-event.dto';
import { BaseService } from '../common/services/base.service';
import { OrganizationEvent } from './entities/organization-event.entity';

@Injectable()
export class OrganizationEventService extends BaseService<OrganizationEvent> {}
