import { IsNotEmpty, IsString } from "class-validator";

export class CreateTestDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string;
    @IsNotEmpty()
    @IsString()
    readonly description:string;

}
