import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { VoluntaryRole } from './entities/voluntary-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VoluntaryRoleService extends BaseService<VoluntaryRole> {
  constructor(
    @InjectRepository(VoluntaryRole)
    voluntaryRoleRepository: Repository<VoluntaryRole>,
  ) {
    super(voluntaryRoleRepository);
  }
}
