import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from '../../common/entities/base.entity';
import { Location } from '../../location/entities/location.entity';
import { OrganizationAdmin } from '../../organization-admin/entities/organization-admin.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Organization extends BaseTable {
  @Column({ nullable: false, length: 100 })
  @ApiProperty()
  name: string;

  @OneToMany(
    () => OrganizationAdmin,
    (organizationAdmin) => organizationAdmin.organization,
  )
  organizationAdmin: OrganizationAdmin[];

  @OneToMany(() => Location, (location) => location.organization, {
    cascade: true,
  })
  location: Location[];
}
