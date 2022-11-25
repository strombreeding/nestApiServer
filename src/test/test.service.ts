import { TestRepository } from './test.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
    constructor(private testRepository: TestRepository){}
    
    getTest(){
        return "하하하"
    }
}
