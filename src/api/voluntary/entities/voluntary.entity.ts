import { BaseTable } from 'src/api/common/entities/base.entity';
import { User } from 'src/api/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';

@Entity()
export class Voluntary extends BaseTable {
  @OneToOne(() => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User;

  @RelationId((voluntary: Voluntary) => voluntary.user)
  userId: string;

  @Column({ nullable: true, length: 255 })
  address: string;

  @Column({ enum: ['yes', 'no'], default: 'no' })
  legalAge: string;
}