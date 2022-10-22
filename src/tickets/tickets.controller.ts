import { Body, Controller, Get, Param, Post,Delete,Put, Query } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}
    @Get()
    async getAll(@Query() data:{year:string,month:string}){
      console.log(data)
      const tickets = await this.ticketsService.getAll(data)
      return tickets
    }
    @Get('/day')
    async getDay(@Query() data:{year:string,month:string,day:string}){
      const tickets = await this.ticketsService.getDayAll(data)
      return tickets
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
