import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { OrganizationAdminService } from 'src/api/organization-admin/organization-admin.service';
import { VoluntaryService } from 'src/api/voluntary/voluntary.service';
import { UserSession } from './entities/user-session.entity';
@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
    private readonly organizationAdminService: OrganizationAdminService,
    private jwtService: JwtService,
    private readonly voluntaryService: VoluntaryService,
  ) {}

  getUserSessionById(sessionId: string) {
    return this.userSessionRepository.findOne({
      where: { id: sessionId },
      relations: {
        user: true,
      },
    });
  }
}
