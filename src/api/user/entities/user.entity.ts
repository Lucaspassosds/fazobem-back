import { ApiProperty } from '@nestjs/swagger';
import { BaseTable } from 'src/api/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseTable {
  @Column({ nullable: true, length: 100 })
  @ApiProperty()
  firstName: string;

  @Column({ nullable: true, length: 100 })
  @ApiProperty()
  lastName: string;

  @Column({ unique: true, nullable: true, length: 255 })
  @ApiProperty()
  email: string;

  @Column({ nullable: true, length: 200 })
  @ApiProperty()
  password: string;
}
