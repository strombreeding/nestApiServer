import { IsString } from "class-validator";


export class UpdateTestDto {
    @IsString()
    readonly status:string;

    @IsString()
    readonly title:string;

    @IsString()
    readonly description:string;
}