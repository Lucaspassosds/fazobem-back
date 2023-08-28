import { Organization } from './entities/organization.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
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
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';
@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiBody({ type: CreateOrganizationDto })
  @ApiOperation({ description: 'Creates new organization' })
  @ApiCreatedResponse({
    description: 'Organization has been created.',
    type: Organization,
  })
  @UserAuth(UserRole.systemAdmin)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of organizations' })
  @ApiOkResponse({
    description: 'Organizations have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Organization) } },
  })
  @UserAuth(UserRole.systemAdmin)
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':organizationId')
  @ApiOperation({ description: 'Returns single organization based on Id' })
  @ApiOkResponse({
    description: 'Organization have been returned',
    type: Organization,
  })
  @ApiParam({
    name: 'organizationId',
    required: true,
    description: 'The Id of a organization',
  })
  @UserAuth(UserRole.systemAdmin)
  findOne(@Param('organizationId') organizationId: string) {
    return this.organizationService.findOne(organizationId);
  }

  @Patch(':organizationId')
  @ApiOperation({ description: 'Updates Organization' })
  @ApiBody({ type: UpdateOrganizationDto })
  @ApiResponse({
    description: 'Organization has been updated.',
    type: Organization,
  })
  @ApiParam({
    name: 'organizationId',
    required: true,
    description: 'The Id of a organization',
  })
  @UserAuth(UserRole.systemAdmin)
  update(
    @Param('organizationId') organizationId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(
      organizationId,
      updateOrganizationDto,
    );
  }

  @Delete(':organizationId')
  @ApiOperation({ description: 'Deletes organization' })
  @ApiOkResponse({
    description: 'Organization has been deleted.',
    type: Organization,
  })
  @ApiParam({
    name: 'organizationId',
    required: true,
    description: 'The Id of a organization',
  })
  @UserAuth(UserRole.systemAdmin)
  remove(@Param('organizationId') organizationId: string) {
    return this.organizationService.delete(organizationId);
  }
}
