import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { Organization } from 'src/api/organization/entities/organization.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column({ nullable: false, length: 5 })
  @ApiProperty()
  zipcode: string;

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
}