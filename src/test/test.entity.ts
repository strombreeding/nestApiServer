import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

export enum TestStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}
@Entity()
@Unique(["title"])
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TestStatus.PUBLIC })
  status: string;

  @Column()
  password: string;
}
