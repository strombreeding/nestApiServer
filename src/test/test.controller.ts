import { CreateTestDto } from './dto/test-create.dto';
import { TestStatus } from './test.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    @Post()
    createTest(@Body() data:CreateTestDto){
            const create = this.testService.createTest(data)
            return create
    }
    

}

