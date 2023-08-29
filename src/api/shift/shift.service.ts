import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Shift } from './entities/shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { OrganizationEvent } from '../organization-event/entities/organization-event.entity';
import { VoluntaryRole } from '../voluntary-role/entities/voluntary-role.entity';

@Injectable()
export class ShiftService extends BaseService<Shift> {
  constructor(
    @InjectRepository(Shift)
    shiftRepository: Repository<Shift>,
  ) {
    super(shiftRepository);
  }

  findAllExpanded() {
    return this.baseRepository.find({
      where: {
        isDeleted: false,
        organizationEvent: {
          isPublished: true,
        },
      },
      relations: {
        voluntaryRole: true,
        organizationEvent: {
          location: true,
        },
        voluntaryShift: {
          voluntary: true,
        },
      },
    });
  }

  findByVoluntary(voluntaryId: string) {
    return this.baseRepository.find({
      where: {
        isDeleted: false,
        organizationEvent: {
          isPublished: true,
        },
        voluntaryShift: {
          voluntary: {
            id: voluntaryId,
          },
        },
      },
      relations: {
        voluntaryRole: true,
        organizationEvent: {
          location: true,
        },
        voluntaryShift: {
          voluntary: true,
        },
      },
    });
  }

  create(dto: CreateShiftDto): Promise<Shift> {
    const newShift = this.baseRepository.create(dto);

    newShift.organizationEvent = new OrganizationEvent();
    newShift.organizationEvent.id = dto.organizationEventId;

    newShift.voluntaryRole = new VoluntaryRole();
    newShift.voluntaryRole.id = dto.voluntaryRoleId;

    const event = this.baseRepository.save(newShift);

    return event;
  }
}
