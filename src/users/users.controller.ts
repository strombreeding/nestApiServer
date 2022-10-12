import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
  import { UserService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UserService) {}
  @Get()
  async getAll(){
    const users = await this.usersService.getUser()
    return users
  }
  @Post()
  async createUser(@Body() data:CreateUserDto){
    const a = await this.usersService.createUser(data)
    
    return console.log("create",a)
  }
  @Get("/:id")
  async getOne(@Param("id") id:string){
    const user = await this.usersService.getOne(id)
    return user
  }
  @Patch("/:id")
  async updateUser(@Param("id") id:string,@Body() data:UpdateUserDto) {
    const a =this.usersService.updateUser(id,data)
    return  a
  }
  @Delete("/:id")
  async deleteUser(@Param("id") id:string, @Body() data:any){
    this.usersService.deleteUser(id)
  }

}