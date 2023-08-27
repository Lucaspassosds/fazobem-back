import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { BaseService } from '../../api/common/services/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
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
}
