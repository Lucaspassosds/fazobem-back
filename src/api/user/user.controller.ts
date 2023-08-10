import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Creates new user' })
  @ApiCreatedResponse({
    description: 'User has been created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of users' })
  @ApiOkResponse({
    description: 'Users have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(User) } },
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ description: 'Returns single user based on Id' })
  @ApiOkResponse({
    description: 'Answer have been returned',
    type: User,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The Id of a user',
  })
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(+userId);
  }

  @Patch(':userId')
  @ApiOperation({ description: 'Updates User' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    description: 'User has been updated.',
    type: User,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The Id of a user',
  })
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+userId, updateUserDto);
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
  remove(@Param('userId') userId: string) {
    return this.userService.delete(+userId);
  }
}
