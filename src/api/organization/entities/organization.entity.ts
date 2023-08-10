import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Organization extends BaseTable {
  @Column({ nullable: false, length: 100 })
  @ApiProperty()
  name: string;
}
