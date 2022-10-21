import { IsEmail, IsNumber, IsString } from "class-validator";


export class CreateUserDto{
    @IsEmail()
    readonly email:string;
    @IsString()
    readonly userName: string; // 필드 이름: 타입(타입스크립트 타입)
    @IsString()
    readonly avatarUrl: string; // 필드 이름: 타입(타입스크립트 타입)
    @IsString({each:true})
    readonly ownComments: string[];
    @IsString({each:true})
    readonly crews: string[];
    @IsString({each:true})
    readonly likes: string[];
    @IsString({each:true})
    readonly ownTickets: string[];

}
