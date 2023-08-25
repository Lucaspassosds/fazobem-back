import { BaseTable } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { VoluntaryShift } from '../../voluntary-shifts/entities/voluntary-shift.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class Voluntary extends BaseTable {
  @OneToOne(() => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User;

  @RelationId((voluntary: Voluntary) => voluntary.user)
  userId: string;

  @Column({ nullable: false, length: 100 })
  birthdate: string;

  @OneToMany(() => VoluntaryShift, (shift) => shift.voluntary)
  voluntaryShift: VoluntaryShift[];
}
