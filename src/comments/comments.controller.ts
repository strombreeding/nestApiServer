import { Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete, } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comments.service';
  
  @Controller('comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  @Get()
  async getAll(){
    const users = await this.commentsService.getcomment()
    return users
  }
  @Post()
  async createUser(@Body() data:CreateCommentDto){
    const a = await this.commentsService.createComment(data)
    console.log("create",a)
    return a
  }
  @Get("/:id")
  async getOne(@Param("id") id:string){
    const comment = await this.commentsService.getOne(id)
    return comment
  }
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