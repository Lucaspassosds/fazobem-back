import { BaseTable } from '../../common/entities/base.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class OrganizationAdmin extends BaseTable {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @RelationId((organizationAdmin: OrganizationAdmin) => organizationAdmin.user)
  userId: string;

  @Column({ nullable: false, default: false })
  isRegistered: boolean;

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;

  @RelationId(
    (organizationAdmin: OrganizationAdmin) => organizationAdmin.organization,
  )
  organizationId: string;
}
