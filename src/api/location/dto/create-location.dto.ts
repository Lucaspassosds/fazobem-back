import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  addressLine1: string;

  @ApiProperty({ required: false })
  addressLine2: string;

  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  state: string;

  @ApiProperty({ required: true })
  description: string;
  @ApiProperty({
    required: false,
    description: 'Never pass this value. It is overwritten by the server.',
  })
  organizationId: string;
}
