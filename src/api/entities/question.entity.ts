import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { QuestionType } from './question-type.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public content: string;

  @OneToMany(() => Answer, (answer) => answer.id, { cascade: true })
  @ApiProperty()
  public answers: Answer[];

  @ManyToOne(() => QuestionType, (question) => question.id)
  @ApiProperty()
  public type: QuestionType;
}
