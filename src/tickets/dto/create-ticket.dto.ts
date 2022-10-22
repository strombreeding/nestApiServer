import { IsEmail, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateTicketDto{
    @IsString()
    owner: ObjectId;
    // crew : ObjectId
    // @IsNumber()
    // year : number;
    // @IsNumber()
    // month : number;
    // @IsNumber()
    // day : number;
    // @IsNumber()
    // time : number;
}
