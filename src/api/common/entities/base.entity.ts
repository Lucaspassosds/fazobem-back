import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;

  @Column({ default: false })
  @ApiProperty({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  @ApiProperty()
  autoCreateTs: Date;

  @UpdateDateColumn()
  @ApiProperty()
  autoUpdateTs: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedTs: Date;

  @Column({ nullable: true })
  @ApiProperty()
  createdBy: string;

  @Column({ nullable: true })
  @ApiProperty()
  modifiedBy: string;

  @Column({ nullable: true })
  @ApiProperty()
  deletedBy: string;
}
