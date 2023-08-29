import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { OrganizationEvent } from './entities/organization-event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOrganizationEventDto } from './dto/create-organization-event.dto';
import { Location } from '../location/entities/location.entity';

@Injectable()
export class OrganizationEventService extends BaseService<OrganizationEvent> {
  constructor(
    @InjectRepository(OrganizationEvent)
    organizationEventRepository: Repository<OrganizationEvent>,
  ) {
    super(organizationEventRepository);
  }

  async findAll(): Promise<OrganizationEvent[]> {
    return this.baseRepository.find({
      where: {
        isDeleted: false,
      },
      relations: {
        location: true,
        shifts: true,
      },
    });
  }

  findOne(id: string): Promise<OrganizationEvent> {
    return this.baseRepository.findOne({
      where: {
        id,
      },
      relations: {
        location: true,
        shifts: {
          voluntaryRole: true,
          voluntaryShift: true,
        },
      },
    });
  }

  create(dto: CreateOrganizationEventDto): Promise<OrganizationEvent> {
    const newEvent = this.baseRepository.create(dto);

    newEvent.location = new Location();
    newEvent.location.id = dto.locationId;

    const event = this.baseRepository.save(newEvent);

    return event;
  }

  async publish(eventId: string) {
    const event = await this.baseRepository.findOne({
      where: {
        id: eventId,
      },
    });

    event.isPublished = true;

    const published = this.baseRepository.save(event);

    return published;
  }
}
