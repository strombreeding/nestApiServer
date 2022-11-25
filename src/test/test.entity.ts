import { BaseEntity, PrimaryGeneratedColumn,Column, Entity } from "typeorm";

export enum TestStatus {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}
@Entity()
export class Test extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column({default:TestStatus.PUBLIC})
    status :string;

}

