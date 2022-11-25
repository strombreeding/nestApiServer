import { UpdateTestDto } from './dto/test-update.dto';
import { TestStatusUpdate } from './pipes/test-status.pipe';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/test-create.dto';
import { TestRepository } from './test.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test, TestStatus } from './test.entity';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(TestRepository)
        private testRepository: TestRepository
    ){}
    
    async getOne(id:number):Promise<Test>{
        const test = await this.testRepository.findOne({where:{id}})
        return test
    }
    getTest():Promise<Test[]>{
        const tests = this.testRepository.getTests();
        return tests
    }
    createTest(data:CreateTestDto):Promise<Test>{
        const created =  this.testRepository.createTest(data)
        return created
    }

    updateStatus(id:number,data:UpdateTestDto):Promise<Test>{
        console.log("in Service data : ",id,data)
        if(Object.keys(data).length===0)throw new NotFoundException("변경내역이 없습니다.")
        const update = this.testRepository.updateStatus(id,data)
        return update
    }
}
