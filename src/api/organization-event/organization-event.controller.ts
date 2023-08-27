import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationEventService } from './organization-event.service';
import { CreateOrganizationEventDto } from './dto/create-organization-event.dto';
import { UpdateOrganizationEventDto } from './dto/update-organization-event.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('organization-event')
@ApiTags('organization-event')
export class OrganizationEventController {
  constructor(
    private readonly organizationEventService: OrganizationEventService,
  ) {}

  @Post()
  create(@Body() createOrganizationEventDto: CreateOrganizationEventDto) {
    return this.organizationEventService.create(createOrganizationEventDto);
  }

  @Get()
  findAll() {
    return this.organizationEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationEventService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationEventDto: UpdateOrganizationEventDto,
  ) {
    return this.organizationEventService.update(
      id,
      updateOrganizationEventDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationEventService.delete(id);
  }
}
