import { TypeOrmExModule } from './../configs/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestRepository } from './test.repository';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([TestRepository])
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
