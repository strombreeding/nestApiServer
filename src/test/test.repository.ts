import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import {   Repository } from "typeorm";
import { Test } from "./test.entity";

@CustomRepository(Test)
export class TestRepository extends Repository<Test>{
    
}