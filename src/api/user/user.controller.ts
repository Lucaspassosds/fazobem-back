import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ description: 'Returns list of users' })
  @ApiOkResponse({
    description: 'Users have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(User) } },
  })
  @UserAuth(UserRole.systemAdmin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ description: 'Returns single user based on Id' })
  @ApiOkResponse({
    description: 'User have been returned',
    type: User,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The Id of a user',
  })
  @UserAuth(UserRole.systemAdmin)
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch(':id')
  @UserAuth(UserRole.voluntary)
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.update(id, UpdateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ description: 'Deletes user' })
  @ApiOkResponse({
    description: 'User has been deleted.',
    type: User,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The Id of a user',
  })
  @UserAuth(UserRole.systemAdmin, UserRole.voluntary)
  remove(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
