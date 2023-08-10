import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { OrganizationAdmin } from 'src/api/organization-admin/entities/organization-admin.entity';
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
}
