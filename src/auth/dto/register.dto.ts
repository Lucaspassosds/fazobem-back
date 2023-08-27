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

  @ApiProperty({ required: true })
  securityQuestion: string;

  @ApiProperty({ required: true })
  securityAnswer: string;
}

export class OrganzationAdminRegisterDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  securityQuestion: string;

  @ApiProperty({ required: true })
  securityAnswer: string;
}

export class LoginDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}

export class RequestChangePasswordDto {
  @ApiProperty({ required: true })
  email: string;
}

export class ChangePasswordDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  securityAnswer: string;
}
