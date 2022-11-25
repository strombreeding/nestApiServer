import { UpdateTestDto } from './dto/test-update.dto';
import { CreateTestDto } from './dto/test-create.dto';
import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import {   Repository } from "typeorm";
import { Test, TestStatus } from "./test.entity";
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Test)
export class TestRepository extends Repository<Test>{
    async getTests():Promise<Test[]>{
        const tests = await this.find();
        return tests
    }
    async createTest(data:CreateTestDto):Promise<Test>{
        const {title,description} = data
        const created = this.create({
            title,
            description
        })
        await this.save(created)
        return 
    }
    async updateStatus(id:number,data:UpdateTestDto):Promise<Test>{
        console.log("in Repo data : ",id,data)
        const result = await this.update({id},data)
        return 
    }
    async getTestOne(id:number){
        const test = await this.findOne({where:{id}})
        if(!test) throw new NotFoundException("해당 아이디를 찾을 수 없습니다.")
        return test
    }

}