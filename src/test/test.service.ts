import { Repository } from "typeorm";
import { UpdateTestDto } from "./dto/test-update.dto";
import { TestStatusUpdate } from "./pipes/test-status.pipe";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateTestDto } from "./dto/test-create.dto";
import { TestRepository } from "./test.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Test, TestStatus } from "./test.entity";
import { SecondTest } from "./secondTest.entity";

import * as jwt from "jsonwebtoken";

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestRepository)
    private testRepository: TestRepository,
    @InjectRepository(SecondTest)
    private secondTest: Repository<SecondTest>
  ) {}
  async testing() {
    // const AT = jwt.sign({ detail: "이거슨 AT 토큰임" }, "AT", {
    //   expiresIn: "30s",
    // });
    // const RT = jwt.sign({ detail: "이거슨 RT 토큰임" }, "AT");
    return "zz 통과";
  }
  async validate(token: string) {
    try {
      const payload = jwt.verify(token, "AT");
      console.log(payload);
      return payload;
    } catch (err) {
      console.log(err.message);
      if (err.message === "jwt expired") throw new UnauthorizedException("만료된토큰");
      if (err.message === "invalid token") throw new UnauthorizedException("유효하지않은토큰");
    }
  }

  async getOne(id: number): Promise<Test> {
    const test = await this.testRepository.findOne({ where: { id } });
    return test;
  }
  getTest(): Promise<Test[]> {
    const tests = this.testRepository.getTests();
    return tests;
  }
  createTest(data: CreateTestDto): Promise<Test> {
    const created = this.testRepository.createTest(data);
    return created;
  }

  updateStatus(id: number, data: UpdateTestDto): Promise<Test> {
    console.log("in Service data : ", id, data);
    if (Object.keys(data).length === 0) throw new NotFoundException("변경내역이 없습니다.");
    const update = this.testRepository.updateStatus(id, data);
    return update;
  }
}
