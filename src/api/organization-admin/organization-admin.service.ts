import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { OrganizationAdmin } from './entities/organization-admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrganizationAdminDto } from './dto/create-organization.admin.dto';
import { User } from '../user/entities/user.entity';
import { generateRandomString, hashPassword } from 'src/utils/utils';
import { Organization } from '../organization/entities/organization.entity';
import { UserRole } from 'src/constants/constants';

@Injectable()
export class OrganizationAdminService extends BaseService<OrganizationAdmin> {
  constructor(
    @InjectRepository(OrganizationAdmin)
    orgAdminRepository: Repository<OrganizationAdmin>,
    private dataSource: DataSource,
  ) {
    super(orgAdminRepository);
  }

  async invite(dto: CreateOrganizationAdminDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingEmail = await queryRunner.manager
        .getRepository(User)
        .findOne({
          where: {
            email: dto.email,
          },
        });

      if (existingEmail) {
        throw new HttpException(
          'Email is already in use. Log in.',
          HttpStatus.CONFLICT,
        );
      }

      const newUser = new User();

      newUser.email = dto.email;
      newUser.name = 'TEMP_NAME';
      newUser.role = UserRole.organizationAdmin;

      const hashedPassword = await hashPassword(generateRandomString(8));
      newUser.password = hashedPassword;

      const user = await queryRunner.manager.getRepository(User).save(newUser);

      const newAdminOrg = new OrganizationAdmin();

      newAdminOrg.user = user;
      newAdminOrg.organization = new Organization();
      newAdminOrg.organization.id = dto.organizationId;

      const orgAdmin = await queryRunner.manager
        .getRepository(OrganizationAdmin)
        .save(newAdminOrg);

      await queryRunner.commitTransaction();

      return orgAdmin;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err.status == HttpStatus.CONFLICT) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }
      throw new InternalServerErrorException(err);
    } finally {
      await queryRunner.release();
    }
  }

  getAdminCompanies(userId: string) {
    return this.baseRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        organization: true,
      },
    });
  }
}
