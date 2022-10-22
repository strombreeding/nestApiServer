import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket.model';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
    constructor (
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>
    ) {}

    async getAll():Promise<Ticket[]>{
        const tickets = await this.ticketModel.find({}).populate("owner")
        console.log(tickets)
        return tickets
    }

    async getOne(id:string):Promise<Ticket>{
        const ticket = await this.ticketModel.findById({_id:id}).populate("owner");
        console.log(ticket)
        return ticket
    }
    async createTicket(data:CreateTicketDto):Promise<Ticket>{
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const time = date.getHours()

        const ticket = await this.ticketModel.create({
            ...data,
            year,
            month,
            day,
            time
        })
        ticket.save()
        return ticket
    }
}
