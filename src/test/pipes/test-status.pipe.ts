import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TestStatus } from "../test.entity";

export class TestStatusUpdate implements PipeTransform{
    readonly enumTestStatus = [
        TestStatus.PRIVATE,
        TestStatus.PUBLIC
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        if(!this.enumTestStatus.includes(value)){
            throw new BadRequestException("아 제대로 골라라");
        }
        return value
    }
    
}