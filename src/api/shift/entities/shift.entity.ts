import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from '../../common/entities/base.entity';
import { OrganizationEvent } from '../../organization-event/entities/organization-event.entity';
import { VoluntaryRole } from '../../voluntary-role/entities/voluntary-role.entity';
import { VoluntaryShift } from '../../voluntary-shifts/entities/voluntary-shift.entity';
import { Entity, Column, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Shift extends BaseTable {
  @Column({ type: 'time', nullable: false })
  @ApiProperty()
  startTime: string;

  @Column({ type: 'time', nullable: false })
  @ApiProperty()
  endTime: string;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiProperty()
  startTimeStamp: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @ApiProperty()
  endTimeStamp: Date;

  @Column({ type: 'integer', nullable: false })
  @ApiProperty()
  quantityNeeded: number;

  @Column({ length: 100, nullable: false })
  @ApiProperty()
  staffingManagerName: string;

  @Column({ length: 15, nullable: false })
  @ApiProperty()
  staffingManagerPhoneNumber: string;

  @Column({ unique: false, nullable: false, length: 255 })
  @ApiProperty()
  staffingManagerEmail: string;

  @Column({ length: 1000, nullable: true })
  @ApiProperty()
  jobRequirements: string;

  @Column({ length: 1000, nullable: true, default: '' })
  @ApiProperty()
  otherInfo: string;

  @ManyToOne(() => VoluntaryRole, { nullable: false })
  voluntaryRole: VoluntaryRole;

  @RelationId((shift: Shift) => shift.voluntaryRole)
  voluntaryRoleId: string;

  @ManyToOne(() => OrganizationEvent, (event) => event.shifts, {
    nullable: false,
  })
  organizationEvent: OrganizationEvent;

  @RelationId((shift: Shift) => shift.organizationEvent)
  organizationEventId: string;

  @OneToMany(() => VoluntaryShift, (voluntaryShift) => voluntaryShift.shift)
  voluntaryShift: VoluntaryShift[];
}
