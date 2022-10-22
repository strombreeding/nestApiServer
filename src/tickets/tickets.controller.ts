import { Body, Controller, Get, Param, Post,Delete,Put } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}
    @Get()
    async getAll(){
      const users = await this.ticketsService.getAll()
      return users
    }
    @Post()
    async createUser(@Body() data:CreateTicketDto){
      const a = await this.ticketsService.createTicket(data)
      console.log("create",a)
      return a
    }
    @Get("/:id")
    async getOne(@Param("id") id:string){
      const comment = await this.ticketsService.getOne(id)
      return comment
    }
}
