import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { OrganizationAdminService } from './organization-admin.service';
import { CreateOrganizationAdminDto } from './dto/create-organization.admin.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationAdmin } from './entities/organization-admin.entity';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';

@ApiTags('organization-admin')
@Controller('organization-admin')
export class OrganizationAdminController {
  constructor(
    private readonly organizationAdminService: OrganizationAdminService,
  ) {}

  @Post()
  @ApiBody({ type: CreateOrganizationAdminDto })
  @ApiOperation({
    description: 'Invites a new organization admin to the system',
  })
  @ApiCreatedResponse({
    description: 'Organization admin has been invited.',
    type: OrganizationAdmin,
  })
  @UserAuth(UserRole.systemAdmin)
  create(@Body() dto: CreateOrganizationAdminDto) {
    return this.organizationAdminService.invite(dto);
  }

  @Delete(':organizationAdminId')
  @ApiOperation({ description: 'Deletes organization admin' })
  @ApiOkResponse({
    description: 'Organization admin has been deleted.',
    type: OrganizationAdmin,
  })
  @ApiParam({
    name: 'organizationAdminId',
    required: true,
    description: 'The Id of an organization admin',
  })
  @UserAuth(UserRole.systemAdmin)
  remove(@Param('organizationAdminId') organizationAdminId: string) {
    return this.organizationAdminService.delete(organizationAdminId);
  }
}
