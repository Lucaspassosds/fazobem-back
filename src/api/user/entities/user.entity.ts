import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from '../../common/entities/base.entity';
import { UserSession } from '../../../auth/entities/user-session.entity';
import { UserRole } from '../../../constants/constants';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseTable {
  @Column({ nullable: false, length: 255 })
  @ApiProperty()
  name: string;

  @Column({ unique: true, nullable: false, length: 255 })
  @ApiProperty()
  email: string;

  @Column({ nullable: false, length: 200 })
  @ApiProperty()
  password: string;

  @Column({ nullable: true, length: 200 })
  @ApiProperty({ required: true })
  securityQuestion: string;

  @Column({ nullable: true, length: 200 })
  @ApiProperty({ required: true })
  securityAnswer: string;

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
