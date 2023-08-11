import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserSessionDto {
  @ApiProperty({ required: false })
  fcmToken: string;

  @ApiProperty({ required: false })
  platform: string;

  @ApiProperty({ required: false })
  deviceInfo?: string;
}
