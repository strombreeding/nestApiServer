import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket.model';
import { findAllDto,CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
    constructor (
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>
    ) {}

    async getAll(data:findAllDto):Promise<Ticket[]>{
        console.log("여기?")
        const tickets = await this.ticketModel.find({year:data.year,month:data.month}).populate("owner")
        console.log("아님여기?")
        return tickets
    }
    async getDayAll(data:{year:string,month:string,day:string}):Promise<Ticket[]>{
        const {year,month,day}=data
        const tickets = await this.ticketModel.find({year,month,day}).populate("owner")
        console.log(tickets)
        let a = []
        for (let i = 0; i < tickets.length; i++) {
            const b= {
                day:tickets[i].day,
                owner:tickets[i].owner.username,
                date:tickets[i].time
            }
            a.push(b)
        }
        console.log(a.sort())
        return a
    }

    async getOne(id:string):Promise<Ticket>{
        const ticket = await this.ticketModel.findById({_id:id}).populate("owner");
        console.log(ticket)
        return ticket
    }
    async createTicket(data:CreateTicketDto):Promise<Ticket>{
        const id = data.owner
        const year = data.date[0]
        const month = data.date[1]
        const day = data.date[2]
        const time = data.date[3]

        const newTicket = await this.ticketModel.create({
            owner:id,
            year,
            month,
            day,
            time
        })
        newTicket.save()
        return newTicket
    }
}
