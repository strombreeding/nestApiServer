import  as, { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import {  Youth } from "./user.model";
export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
    @Prop({default:Date.now})
    createdAt:Date;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"Youth", required:true})
    owner: Youth;
    // @Prop({type:mongoose.Schema.Types.ObjectId, ref:"Crew"})
    // crew : Crew
    @Prop()
    year : number;
    @Prop()
    month : number;
    @Prop()
    day : number;
    @Prop()
    time : number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)