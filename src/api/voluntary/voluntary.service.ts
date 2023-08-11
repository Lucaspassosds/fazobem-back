import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Voluntary } from './entities/voluntary.entity';

@Injectable()
export class VoluntaryService extends BaseService<Voluntary> {
  getVoluntaryProfile(id: string) {
    return this.baseRepository.findOne({
      where: { user: { id } },
      loadEagerRelations: false,
    });
  }
}
