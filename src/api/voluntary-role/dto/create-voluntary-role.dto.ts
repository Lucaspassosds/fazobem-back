import { ApiProperty } from '@nestjs/swagger';

export class CreateVoluntaryRoleDto {
  @ApiProperty({ required: true })
  name: string;
}
