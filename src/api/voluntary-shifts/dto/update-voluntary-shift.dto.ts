import { PartialType } from '@nestjs/swagger';
import { CreateVoluntaryShiftDto } from './create-voluntary-shift.dto';

export class UpdateVoluntaryShiftDto extends PartialType(
  CreateVoluntaryShiftDto,
) {}
