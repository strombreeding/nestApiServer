import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TestStatus } from "../test.entity";

export class TestStatusUpdate implements PipeTransform{
    readonly enumTestStatus = [
        TestStatus.PRIVATE,
        TestStatus.PUBLIC
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("value",value)
        const {title,description}=value
        let {status} = value
        status= status.toUpperCase()
        
        const toUpdate = {
            ...(title && { title }),
            ...(description && { description }),
            ...(status && { status }),
        }; 
        if(!this.enumTestStatus.includes(status)){
            throw new BadRequestException(`[PUBLIC, PRIVATE] 중 하나로 입력해야합니다.`);
        }
        return toUpdate
    }
    
}