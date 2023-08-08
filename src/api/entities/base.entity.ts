import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseTable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  autoCreateTs: Date;

  @UpdateDateColumn()
  autoUpdateTs: Date;

  @DeleteDateColumn()
  deletedTs: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  modifiedBy: string;

  @Column({ nullable: true })
  deletedBy: string;
}
