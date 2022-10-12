import { IsNumber, IsString } from "class-validator";


export class CreateUserDto{
    @IsString()
    readonly userName: string; // 필드 이름: 타입(타입스크립트 타입)
    @IsString({each:true})
    readonly skils: string[];
    @IsNumber()
    readonly phoneNum: number;
}