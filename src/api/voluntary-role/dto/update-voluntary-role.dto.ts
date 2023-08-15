import { PartialType } from '@nestjs/swagger';
import { CreateVoluntaryRoleDto } from './create-voluntary-role.dto';

export class UpdateVoluntaryRoleDto extends PartialType(
  CreateVoluntaryRoleDto,
) {}
