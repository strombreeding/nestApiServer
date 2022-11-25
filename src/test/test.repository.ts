import { UpdateTestDto } from "./dto/test-update.dto";
import { CreateTestDto } from "./dto/test-create.dto";
import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Test, TestStatus } from "./test.entity";
import { NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@CustomRepository(Test)
export class TestRepository extends Repository<Test> {
  async getTests(): Promise<Test[]> {
    const tests = await this.find();
    return tests;
  }
  async createTest(data: CreateTestDto): Promise<Test> {
    const { title, description, password } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const created = this.create({
      title,
      description,
      password: hashedPassword,
    });
    try {
      await this.save(created);
      return;
    } catch (err) {
      throw new Error(err);
    }
    // 로그인 비번 비교는 = await bcrypt.compare(password,db.password)
  }
  async updateStatus(id: number, data: UpdateTestDto): Promise<Test> {
    console.log("in Repo data : ", id, data);
    const result = await this.update({ id }, data);
    return;
  }
  async getTestOne(id: number) {
    const test = await this.findOne({ where: { id } });
    if (!test) throw new NotFoundException("해당 아이디를 찾을 수 없습니다.");
    return test;
  }
}
