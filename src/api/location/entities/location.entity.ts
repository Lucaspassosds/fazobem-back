import { Entity, Column, ManyToOne, RelationId, OneToMany } from 'typeorm';
import { BaseTable } from '../../common/entities/base.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrganizationEvent } from 'src/api/organization-event/entities/organization-event.entity';

@Entity()
export class Location extends BaseTable {
  @Column({ nullable: false, length: 100 })
  @ApiProperty()
  name: string;

  @Column({ nullable: false, length: 100 })
  @ApiProperty()
  addressLine1: string;

  @Column({ nullable: true, length: 100 })
  @ApiProperty()
  addressLine2: string;

  @Column({ nullable: false, length: 100 })
  @ApiProperty()
  city: string;

  @Column({ nullable: false, length: 2 })
  @ApiProperty()
  state: string;

  @Column({ nullable: false, length: 100, default: 'BR' })
  @ApiProperty()
  country: string;

  @Column({ nullable: false, length: 255 })
  @ApiProperty()
  description: string;

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;

  @RelationId((location: Location) => location.organization)
  organizationId: string;

  @OneToMany(
    () => OrganizationEvent,
    (organizationEvent) => organizationEvent.location,
    { cascade: true },
  )
  organizationEvents: OrganizationEvent[];
}
