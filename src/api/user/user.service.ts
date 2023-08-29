import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { BaseService } from '../../api/common/services/base.service';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from 'src/auth/entities/user-session.entity';
import { OrganizationAdmin } from '../organization-admin/entities/organization-admin.entity';
import { Voluntary } from '../voluntary/entities/voluntary.entity';
import { VoluntaryShift } from '../voluntary-shifts/entities/voluntary-shift.entity';
import { UserRole } from 'src/constants/constants';
import { merge, retry } from 'rxjs';
import { hashPassword } from 'src/utils/utils';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private userSessionRepository: Repository<UserSession>,
    @InjectRepository(OrganizationAdmin)
    private organizationAdminRepository: Repository<OrganizationAdmin>,
    @InjectRepository(Voluntary)
    private voluntaryRepository: Repository<Voluntary>,
    @InjectRepository(VoluntaryShift)
    private voluntaryShiftRepository: Repository<VoluntaryShift>,
  ) {
    super(userRepository);
  }

  userGetOneByQueryForAuth(options: FindOptionsWhere<User>): Promise<User> {
    return this.baseRepository.findOne({
      where: options,
      select: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'securityQuestion',
        'securityAnswer',
      ],
    });
  }

  userSave(user: User): Promise<User> {
    return this.baseRepository.save(user);
  }

  async update(id: string, entity: DeepPartial<User>): Promise<User> {
    const user = await this.baseRepository.findOne({
      where: {
        id,
      },
    });

    if (entity.password) {
      entity.password = await hashPassword(entity.password);
    }

    const updatedUser = this.baseRepository.merge(user, entity);
    return this.baseRepository.save(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.baseRepository.findOne({
      where: {
        id,
      },
      relations: {
        session: true,
      },
    });

    await this.userSessionRepository.remove(user.session);

    if (user.role === UserRole.organizationAdmin) {
      const organizationAdmin = await this.organizationAdminRepository.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      await this.organizationAdminRepository.remove(organizationAdmin);
    } else if (user.role === UserRole.voluntary) {
      const vountary = await this.voluntaryRepository.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          voluntaryShift: true,
        },
      });

      await this.voluntaryShiftRepository.remove(vountary.voluntaryShift);
      await this.voluntaryRepository.remove(vountary);
    } else {
      throw new HttpException(
        `Can't delete system admin.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.baseRepository.remove(user);
  }
}
