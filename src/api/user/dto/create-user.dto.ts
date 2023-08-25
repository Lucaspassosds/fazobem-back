import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../constants/constants';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: UserRole = UserRole.voluntary;
}
