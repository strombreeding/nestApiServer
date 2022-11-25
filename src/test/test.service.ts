import { BadRequestException } from '@nestjs/common';
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
    
    async getTest(){
 
        return "하하하"
    }
    async createTest(data:CreateTestDto):Promise<Test>{
        const {title,description} = data
        console.log(data)
            console.log("들어오긴함")
            const created =  this.testRepository.create({ title, description,status:TestStatus.PUBLIC })
            await this.testRepository.save(created)
            return created
        
    }
}
