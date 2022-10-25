import  as, { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import {  Youth } from "./user.model";
export type JwtDocument = Jwt & Document;

@Schema()
export class Jwt {
    @Prop()
    username: string;
    @Prop()
    uniqueId : string;
    @Prop({type:Date,expires:20,default:Date.now})
    createdAt: Date;
    @Prop()
    refresh_token:string
}

export const JwtSchema = SchemaFactory.createForClass(Jwt)