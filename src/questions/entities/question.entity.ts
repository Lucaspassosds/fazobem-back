import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public type: string;

  @Column()
  public content: string;

  @OneToMany((type) => Answer, (answer) => answer.id)
  public answers: Answer[];
}
