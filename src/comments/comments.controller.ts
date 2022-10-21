import { Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete, } from '@nestjs/common';

@Controller('comments')
export class CommentsController {}

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comments.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly commentsService: CommentsService) {}
  // @Get()
  // async getAll(){
  //   const users = await this.commentsService.getUser()
  //   return users
  // }
  // @Post()
  // async createUser(@Body() data:CreateCommentDto){
  //   const a = await this.commentsService.createUser(data)
    
  //   return console.log("create",a)
  // }
  // @Get("/:id")
  // async getOne(@Param("id") id:string){
  //   const user = await this.commentsService.getOne(id)
  //   return user
  // }
  // @Patch("/:id")
  // async updateUser(@Param("id") id:string,@Body() data:UpdateCommentDto) {
  //   const a =this.commentsService.updateUser(id,data)
  //   return  a
  // }
  // @Delete("/:id")
  // async deleteUser(@Param("id") id:string, @Body() data:any){
  //   this.commentsService.deleteUser(id)
  // }

}