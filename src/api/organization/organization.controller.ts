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
  getSchemaPath,
} from '@nestjs/swagger';

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
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of organizations' })
  @ApiOkResponse({
    description: 'Organizations have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Organization) } },
  })
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Returns single organization based on Id' })
  @ApiOkResponse({
    description: 'Answer have been returned',
    type: Organization,
  })
  @ApiParam({
    name: 'organizationId',
    required: true,
    description: 'The Id of a organization',
  })
  findOne(@Param('organizationId') organizationId: string) {
    return this.organizationService.findOne(+organizationId);
  }

  @Patch(':id')
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
  update(
    @Param('organizationId') organizationId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(
      +organizationId,
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
  remove(@Param('organizationId') organizationId: string) {
    return this.organizationService.delete(+organizationId);
  }
}
