import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationAdminDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  organizationId: string;
}
