import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Organization } from '../organization/entities/organization.entity';

@Injectable()
export class LocationService extends BaseService<Location> {
  constructor(
    @InjectRepository(Location) locationRepository: Repository<Location>,
  ) {
    super(locationRepository);
  }

  findAll(): Promise<Location[]> {
    return this.baseRepository.find({
      where: {
        isDeleted: false,
      },
      relations: {
        organizationEvents: true,
      },
    });
  }

  create(dto: CreateLocationDto) {
    const newLocation = this.baseRepository.create(dto);

    newLocation.organization = new Organization();
    newLocation.organization.id = dto.organizationId;

    return this.baseRepository.save(newLocation);
  }
}
