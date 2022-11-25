import { CreateTestDto } from './dto/test-create.dto';
import { Test, TestStatus } from './test.entity';
import { Body, Controller, Get, Param, Post,Put } from '@nestjs/common';
import { TestService } from './test.service';
import { TestStatusUpdate } from './pipes/test-status.pipe';
import { UpdateTestDto } from './dto/test-update.dto';

@Controller('test')
export class TestController {
    constructor(private testService :TestService){}

    @Get("/")
    getTest(){
        return this.testService.getTest()
    }
    @Get("/:id")
    getOne(
        @Param("id") id:number
    ){
        return this.testService.getOne(id)
    }
    @Post()
    createTest(@Body() data:CreateTestDto){
        const create = this.testService.createTest(data)
        return create
    }
    
    @Put("/:id")
    statusUpdate(
        @Param("id") id:number,
        @Body(TestStatusUpdate) data:UpdateTestDto
        ){
        console.log("data : ",id,data)
        const updated = this.testService.updateStatus(id,data)
        return 
    }
}

