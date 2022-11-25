import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";
import { TestStatus } from "./test.entity";

@Entity()
@Unique(["title"])
export class SecondTest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: TestStatus.PUBLIC })
  status: string;
}
