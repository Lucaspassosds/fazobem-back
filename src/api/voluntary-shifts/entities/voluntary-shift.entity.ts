import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from '../../common/entities/base.entity';
import { Shift } from '../../shift/entities/shift.entity';
import { Voluntary } from '../../voluntary/entities/voluntary.entity';
import {
  Entity,
  Column,
  RelationId,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['voluntary', 'shift'], { unique: true })
export class VoluntaryShift extends BaseTable {
  @ManyToOne(() => Voluntary, (voluntary) => voluntary.voluntaryShift, {
    nullable: false,
  })
  voluntary: Voluntary;

  @RelationId((voluntaryShift: VoluntaryShift) => voluntaryShift.voluntary)
  voluntaryId: string;

  @ManyToOne(() => Shift, (eventShift) => eventShift.voluntaryShift, {
    nullable: false,
  })
  shift: Shift;

  @RelationId((voluntaryShift: VoluntaryShift) => voluntaryShift.shift)
  shiftId: string;

  @Column({ default: false })
  @ApiProperty()
  isConfirmed: boolean;

  @Column({ default: false })
  @ApiProperty()
  isCheckedIn: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty()
  checkInTime: Date;

  @Column({ default: false })
  @ApiProperty()
  isBlocked: boolean;

  @CreateDateColumn()
  @ApiProperty()
  signUpTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty()
  confirmTime: Date;
}
