import { Module } from '@nestjs/common';
import { OrganizationEventService } from './organization-event.service';
import { OrganizationEventController } from './organization-event.controller';

@Module({
  controllers: [OrganizationEventController],
  providers: [OrganizationEventService]
})
export class OrganizationEventModule {}
