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
  public id: number;

  @Column()
  public type: string;

  @Column()
  public content: string;

  @OneToMany(() => Answer, (answer) => answer.id, { cascade: true })
  public answers: Answer[];

  @ManyToOne(() => QuestionType, (question) => question.id)
  public question: QuestionType;
}
