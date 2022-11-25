import { IsNotEmpty, IsString } from "class-validator";

export class CreateTestDto{
    @IsString()
    @IsNotEmpty()
    readonly title:string;
    @IsString()
    @IsNotEmpty()
    readonly description:string;

}
