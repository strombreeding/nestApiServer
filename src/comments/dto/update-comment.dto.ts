import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateCommentDto } from "./create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto){}