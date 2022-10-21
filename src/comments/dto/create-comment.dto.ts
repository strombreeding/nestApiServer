import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateCommentDto{
    @IsString()
    readonly text: string; // 필드 이름: 타입(타입스크립트 타입)
    @IsNumber()
    readonly likes: number;
    @IsString({each:true})
    readonly comments: string[];
    // @IsString()
    // readonly include:string;
    @IsString()
    readonly owner:string;
    @IsDate()
    readonly createdAt:Date;
}
