import { Prop,  Schema,  SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { Comment } from './comment.model';

export type UserDocument = User & Document;
export type IncludeDocument = Include & Document;
@Schema()
export class Include{
  @Prop()
  name:string;
  @Prop()
  bornYear : number;
  @Prop()
  email:string
}
export const IncludeSchema = SchemaFactory.createForClass(Include)
@Schema()
export class User{
  // @Prop()
  // _id:ObjectId ;  

  @Prop()
  email: string;
  
  @Prop({required:true,minlength:2}) 
  userName: string; 
  
  @Prop()
  avatarUrl:string;
  
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Ticket"}])
  ownTickets: string[];
  
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Crew"}])
  crews:string[]
  
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Midea"}])
  likes:string[]

  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}])
  ownComments : Comment[]

  @Prop({ default:Date.now })
  createdAt:Date;
  
}


export const UserSchema = SchemaFactory.createForClass(User);