import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/constants/constants';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: UserRole = UserRole.voluntary;
}
