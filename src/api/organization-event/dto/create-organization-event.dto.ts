import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationEventDto {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  eventDate: Date;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ type: 'boolean', required: true })
  isPublished: boolean;

  @ApiProperty({ required: true })
  locationId: string;
}
