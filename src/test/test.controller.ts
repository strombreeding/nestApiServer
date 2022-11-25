import { CreateTestDto } from "./dto/test-create.dto";
import { Test, TestStatus } from "./test.entity";
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe, Headers, UseGuards } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestStatusUpdate } from "./pipes/test-status.pipe";
import { UpdateTestDto } from "./dto/test-update.dto";
import { AuthGuard } from "./auth.guard";

@Controller("test")
export class TestController {
  constructor(private testService: TestService) {}
  @UseGuards(AuthGuard)
  @Get("/second")
  getSecond(@Headers("user") payload: any) {
    console.log("헤더바꼇나", payload);
    return this.testService.testing();
  }

  @Get("/")
  getTest(@Headers("auth") auth: string) {
    console.log(auth);
    return this.testService.getTest();
  }
  @Get("/:id")
  getOne(@Param("id") id) {
    console.log(typeof id);
    return this.testService.getOne(id);
  }
  @Post()
  createTest(@Body(ValidationPipe) data: CreateTestDto) {
    const create = this.testService.createTest(data);
    return create;
  }

  @Put("/:id")
  statusUpdate(@Param("id") id: number, @Body(TestStatusUpdate) data: UpdateTestDto) {
    console.log("data : ", id, data);
    const updated = this.testService.updateStatus(id, data);
    return;
  }
}
