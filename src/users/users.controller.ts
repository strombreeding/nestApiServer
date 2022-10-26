import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Put,
    Redirect,
    UseGuards,
    Headers,
    Req,
    Res
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Include } from 'src/schemas/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UserService) {}

  @Post("/db")
  async createDB(@Body() data:CreateUserDto){
    const token = await this.usersService.fakeCreate(data)
    return token
  }    
  @Post("/db/login")
  async login(@Body() data:{username:string}) {
    const token = await this.usersService.getFakeUser(data)
    return token
  }
  @Get("/db")
  async validate(@Headers() headers:{access_token:string,refresh_token:string} ){
//tokens:{access_token:string,refresh_token:string}
    const a = await this.usersService.validate(headers)
    return a
  }
  @Get("/")
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req:{user:{}}){
    console.log(req.user)
  }
  @Get("/refresh")
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Req() req:{user:{}}){
    console.log(req.user)
  }

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
  @Put("/:id")
  async updateUser(@Param("id") id:string,@Body() data:UpdateUserDto) {
    const a =this.usersService.updateUser(id,data)
    return  a
  }
  @Delete("/:id")
  async deleteUser(@Param("id") id:string, @Body() data:any){
    this.usersService.deleteUser(id)
  }

}