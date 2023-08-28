import { Module } from '@nestjs/common';
import { OrganizationEventService } from './organization-event.service';
import { OrganizationEventController } from './organization-event.controller';
import { OrganizationEvent } from './entities/organization-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEvent])],
  controllers: [OrganizationEventController],
  providers: [OrganizationEventService],
})
export class OrganizationEventModule {}
