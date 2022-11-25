import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmExModule } from "./../configs/typeorm-ex.module";
import { Module } from "@nestjs/common";
import { TestController } from "./test.controller";
import { TestService } from "./test.service";
import { TestRepository } from "./test.repository";
import { SecondTest } from "./secondTest.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SecondTest]), TypeOrmExModule.forCustomRepository([TestRepository])],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService, TypeOrmModule.forFeature([SecondTest]), TypeOrmExModule.forCustomRepository([TestRepository])],
})
export class TestModule {}
