import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  addressLine1: string;

  @ApiProperty({ required: false })
  addressLine2 = '';

  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  state: string;

  @ApiProperty({ required: true })
  zipcode: string;

  @ApiProperty({ required: true })
  country: string;

  @ApiProperty({ required: true })
  description: string;
  @ApiProperty({
    required: true,
    description: 'Never pass this value. It is overwritten by the server.',
  })
  organizationId: string;
}
