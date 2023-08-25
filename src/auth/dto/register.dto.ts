import { ApiProperty } from '@nestjs/swagger';

export class VoluntaryRegisterDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  birthdate: string;

  @ApiProperty({ required: true })
  password: string;
}
