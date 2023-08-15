import { Entity, Column, ManyToOne, RelationId, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { Location } from 'src/api/location/entities/location.entity';
import { Shift } from 'src/api/shift/entities/shift.entity';

@Entity()
export class OrganizationEvent extends BaseTable {
  @Column({ length: 200, nullable: false })
  @ApiProperty()
  name: string;

  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  eventDate: Date;

  @Column({ length: 1000, nullable: true })
  @ApiProperty()
  description: string;

  @Column({ nullable: false })
  @ApiProperty()
  isPublished: boolean;

  @Column({ nullable: false })
  @ApiProperty()
  isOrientationEvent: boolean;

  @ManyToOne(() => Location, { nullable: false })
  location: Location;

  @RelationId(
    (organizationEvent: OrganizationEvent) => organizationEvent.location,
  )
  locationId: string;

  @OneToMany(() => Shift, (shift) => shift.organizationEvent)
  shifts: Shift[];
}
