import { BaseTable } from '../../common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class VoluntaryRole extends BaseTable {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: true, length: 255 })
  description: string;
}
