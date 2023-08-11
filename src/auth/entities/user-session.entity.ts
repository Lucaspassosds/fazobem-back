import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { User } from 'src/api/user/entities/user.entity';

@Entity()
export class UserSession extends BaseTable {
  @ManyToOne(() => User, (user) => user.session, { nullable: false })
  user: User;

  @RelationId((userSession: UserSession) => userSession.user)
  userId: string;

  @Column({ nullable: true })
  fcmToken: string;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  deviceInfo: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true, type: 'timestamp' })
  accessTokenExpiry: Date;

  @Column({ nullable: true, type: 'timestamp' })
  refreshTokenExpiry: Date;

  @CreateDateColumn()
  registeredAt: Date;
}
