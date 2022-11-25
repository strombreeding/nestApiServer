import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly password: string;
}
