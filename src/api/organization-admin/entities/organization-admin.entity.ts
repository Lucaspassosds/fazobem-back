import { BaseTable } from 'src/api/common/entities/base.entity';
import { Organization } from 'src/api/organization/entities/organization.entity';
import { User } from 'src/api/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';

@Entity()
export class OrganizationAdmin extends BaseTable {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @RelationId((organizationAdmin: OrganizationAdmin) => organizationAdmin.user)
  userId: string;

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;

  @RelationId(
    (organizationAdmin: OrganizationAdmin) => organizationAdmin.organization,
  )
  organizationId: string;
}
