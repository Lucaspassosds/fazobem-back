import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { OrganizationEvent } from 'src/api/organization-event/entities/organization-event.entity';
import { VoluntaryRole } from 'src/api/voluntary-role/entities/voluntary-role.entity';
import { Entity, Column, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Shift extends BaseTable {
  @Column({ type: 'time', nullable: false })
  startTime: string;

  @Column({ type: 'time', nullable: false })
  endTime: string;

  @Column({ type: 'timestamptz', nullable: true })
  startTimeStamp: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endTimeStamp: Date;

  @Column({ type: 'integer', nullable: false })
  quantityNeeded: number;

  @Column({ length: 100, nullable: false })
  staffingManagerName: string;

  @Column({ length: 15, nullable: false })
  staffingManagerPhoneNumber: string;

  @Column({ unique: false, nullable: false, length: 255 })
  staffingManagerEmail: string;

  @Column({ length: 1000, nullable: true })
  jobRequirements: string;

  @Column({ length: 1000, nullable: true, default: '' })
  otherInfo: string;

  @Column({ nullable: true })
  externalShiftGroupId: string;

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
}
