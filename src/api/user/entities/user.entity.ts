import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from '../../common/entities/base.entity';
import { UserSession } from '../../../auth/entities/user-session.entity';
import { UserRole } from '../../../constants/constants';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseTable {
  @Column({ nullable: true, length: 255 })
  @ApiProperty()
  name: string;

  @Column({ unique: true, nullable: true, length: 255 })
  @ApiProperty()
  email: string;

  @Column({ nullable: true, length: 200 })
  @ApiProperty()
  password: string;

  @Column({
    length: 100,
    nullable: false,
    default: UserRole.voluntary,
    enum: UserRole,
  })
  role: UserRole;

  @OneToMany(() => UserSession, (session) => session.user)
  session: UserSession[];
}
