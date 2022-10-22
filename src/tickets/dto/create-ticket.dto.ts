import { IsArray, IsEmail, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateTicketDto{
    // @IsString()
    // crew : ObjectId
    @IsArray()
    date:[string,string,string,string];
    
    @IsString()
    owner: ObjectId;
    // @IsNumber()
    // year : number;
    // @IsNumber()
    // month : number;
    // @IsNumber()
    // day : number;
    // @IsNumber()
    // time : number;
}

export class findAllDto{
    @IsString()
    year: string;
    // crew : ObjectId
    @IsString()
    month:string;
    // @IsNumber()
    // year : number;
    // @IsNumber()
    // month : number;
    // @IsNumber()
    // day : number;
    // @IsNumber()
    // time : number;
}