import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoluntaryRoleService } from './voluntary-role.service';
import { CreateVoluntaryRoleDto } from './dto/create-voluntary-role.dto';
import { UpdateVoluntaryRoleDto } from './dto/update-voluntary-role.dto';
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
import { VoluntaryRole } from './entities/voluntary-role.entity';
import { UserRole } from 'src/constants/constants';
import { UserAuth } from 'src/auth/auth.decorator';

@Controller('voluntary-role')
@ApiTags('voluntary-role')
export class VoluntaryRoleController {
  constructor(private readonly voluntaryRoleService: VoluntaryRoleService) {}

  @Post()
  @ApiBody({ type: CreateVoluntaryRoleDto })
  @ApiOperation({ description: 'Creates new role' })
  @ApiCreatedResponse({
    description: 'Role has been created.',
    type: VoluntaryRole,
  })
  @UserAuth(UserRole.organizationAdmin)
  create(@Body() createVoluntaryRoleDto: CreateVoluntaryRoleDto) {
    return this.voluntaryRoleService.create(createVoluntaryRoleDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of roles' })
  @ApiOkResponse({
    description: 'Roles have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(VoluntaryRole) } },
  })
  @UserAuth(UserRole.organizationAdmin)
  findAll() {
    return this.voluntaryRoleService.findAll();
  }

  @Get(':roleId')
  @ApiOperation({ description: 'Returns single role based on Id' })
  @ApiOkResponse({
    description: 'Role have been returned',
    type: VoluntaryRole,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'The Id of a role',
  })
  @UserAuth(UserRole.organizationAdmin)
  findOne(@Param('roleId') roleId: string) {
    return this.voluntaryRoleService.findOne(roleId);
  }

  @Patch(':roleId')
  @ApiOperation({ description: 'Updates VoluntaryRole' })
  @ApiBody({ type: UpdateVoluntaryRoleDto })
  @ApiResponse({
    description: 'VoluntaryRole has been updated.',
    type: VoluntaryRole,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'The Id of a role',
  })
  @UserAuth(UserRole.organizationAdmin)
  update(
    @Param('roleId') roleId: string,
    @Body() updateVoluntaryRoleDto: UpdateVoluntaryRoleDto,
  ) {
    return this.voluntaryRoleService.update(roleId, updateVoluntaryRoleDto);
  }

  @Delete(':roleId')
  @ApiOperation({ description: 'Deletes role' })
  @ApiOkResponse({
    description: 'VoluntaryRole has been deleted.',
    type: VoluntaryRole,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'The Id of a role',
  })
  @UserAuth(UserRole.organizationAdmin)
  remove(@Param('roleId') roleId: string) {
    return this.voluntaryRoleService.delete(roleId);
  }
}
