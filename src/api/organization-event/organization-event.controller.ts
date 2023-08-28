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
import { OrganizationEvent } from './entities/organization-event.entity';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';

@Controller('organization-event')
@ApiTags('organization-event')
export class OrganizationEventController {
  constructor(
    private readonly organizationEventService: OrganizationEventService,
  ) {}

  @Post()
  @ApiBody({ type: CreateOrganizationEventDto })
  @ApiOperation({ description: 'Creates new event' })
  @ApiCreatedResponse({
    description: 'Event has been created.',
    type: OrganizationEvent,
  })
  @UserAuth(UserRole.organizationAdmin)
  create(@Body() createOrganizationEventDto: CreateOrganizationEventDto) {
    return this.organizationEventService.create(createOrganizationEventDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of events' })
  @ApiOkResponse({
    description: 'Events have been returned.',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(OrganizationEvent) },
    },
  })
  @UserAuth(UserRole.organizationAdmin)
  findAll() {
    return this.organizationEventService.findAll();
  }

  @Get(':eventId')
  @ApiOperation({ description: 'Returns single event based on Id' })
  @ApiOkResponse({
    description: 'Event have been returned',
    type: OrganizationEvent,
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: 'The Id of a event',
  })
  @UserAuth(UserRole.organizationAdmin)
  findOne(@Param('eventId') eventId: string) {
    return this.organizationEventService.findOne(eventId);
  }

  @Patch(':eventId')
  @ApiOperation({ description: 'Updates OrganizationEvent' })
  @ApiBody({ type: UpdateOrganizationEventDto })
  @ApiResponse({
    description: 'OrganizationEvent has been updated.',
    type: OrganizationEvent,
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: 'The Id of a event',
  })
  @UserAuth(UserRole.organizationAdmin)
  update(
    @Param('eventId') eventId: string,
    @Body() updateOrganizationEventDto: UpdateOrganizationEventDto,
  ) {
    return this.organizationEventService.update(
      eventId,
      updateOrganizationEventDto,
    );
  }

  @Patch('publish/:eventId')
  @ApiOperation({ description: 'Publishes OrganizationEvent' })
  @ApiResponse({
    description: 'OrganizationEvent has been updated.',
    type: OrganizationEvent,
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: 'The Id of a event',
  })
  @UserAuth(UserRole.organizationAdmin)
  publish(@Param('eventId') eventId: string) {
    return this.organizationEventService.publish(eventId);
  }

  @Delete(':eventId')
  @ApiOperation({ description: 'Deletes event' })
  @ApiOkResponse({
    description: 'OrganizationEvent has been deleted.',
    type: OrganizationEvent,
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: 'The Id of a event',
  })
  @UserAuth(UserRole.organizationAdmin)
  remove(@Param('eventId') eventId: string) {
    return this.organizationEventService.delete(eventId);
  }
}
