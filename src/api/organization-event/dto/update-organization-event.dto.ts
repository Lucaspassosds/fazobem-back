import { PartialType } from '@nestjs/swagger';
import { CreateOrganizationEventDto } from './create-organization-event.dto';

export class UpdateOrganizationEventDto extends PartialType(CreateOrganizationEventDto) {}
