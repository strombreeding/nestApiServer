import { IsString, MinLength } from "class-validator";

export class UpdateTestDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly password: string;
}
