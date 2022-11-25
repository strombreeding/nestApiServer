import { TestStatus } from './test.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';
import { TestStatusUpdate } from './pipes/test-status.pipe';

@Controller('test')
export class TestController {
    constructor(private testService :TestService){}

    @Get("/:param")
    getTest( @Param("param",TestStatusUpdate) param:TestStatus ){
        console.log(param)
        console.log(TestStatus)
        return this.testService.getTest()
    }
}

