import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Voluntary } from './entities/voluntary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VoluntaryService extends BaseService<Voluntary> {
  constructor(
    @InjectRepository(Voluntary) voluntaryRepository: Repository<Voluntary>,
  ) {
    super(voluntaryRepository);
  }

  findAll(): Promise<Voluntary[]> {
    return this.baseRepository.find({
      where: {
        isDeleted: false,
      },
      relations: {
        user: true,
      },
    });
  }

  getVoluntaryProfile(id: string) {
    return this.baseRepository.findOne({
      where: { user: { id } },
      loadEagerRelations: false,
    });
  }
}
