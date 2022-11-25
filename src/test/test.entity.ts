import { BaseEntity, PrimaryGeneratedColumn,Column, Entity } from "typeorm";

@Entity()
export class Test extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status :TestStatus;

}


export enum TestStatus {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}