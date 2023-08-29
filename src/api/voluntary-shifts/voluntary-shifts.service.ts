import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { VoluntaryShift } from './entities/voluntary-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateVoluntaryShiftDto } from './dto/create-voluntary-shift.dto';
import { Shift } from '../shift/entities/shift.entity';
import { Voluntary } from '../voluntary/entities/voluntary.entity';

@Injectable()
export class VoluntaryShiftsService extends BaseService<VoluntaryShift> {
  constructor(
    @InjectRepository(VoluntaryShift)
    voluntaryShiftRepository: Repository<VoluntaryShift>,
  ) {
    super(voluntaryShiftRepository);
  }

  findByShift(shiftId: string) {
    return this.baseRepository.find({
      where: {
        isDeleted: false,
        shift: {
          id: shiftId,
        },
      },
      relations: {
        voluntary: {
          user: true,
        },
      },
    });
  }

  async create(dto: CreateVoluntaryShiftDto): Promise<VoluntaryShift> {
    const newVoluntaryShift = this.baseRepository.create(dto);

    newVoluntaryShift.shift = new Shift();
    newVoluntaryShift.shift.id = dto.shiftId;

    newVoluntaryShift.voluntary = new Voluntary();
    newVoluntaryShift.voluntary.id = dto.voluntaryId;

    const voluntaryShift = this.baseRepository.save(newVoluntaryShift);

    return voluntaryShift;
  }

  async confirmVoluntaryShift(dto: CreateVoluntaryShiftDto) {
    const voluntaryShift = await this.baseRepository.findOne({
      where: {
        shift: { id: dto.shiftId },
        voluntary: { id: dto.voluntaryId },
      },
    });
    if (!voluntaryShift) throw new NotFoundException();
    voluntaryShift.isConfirmed = true;
    voluntaryShift.confirmTime = new Date();
    return this.baseRepository.save(voluntaryShift);
  }
}
