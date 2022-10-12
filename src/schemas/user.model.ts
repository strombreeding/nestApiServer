import { Prop,  Schema,  SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema()
export class User{

  @Prop({ default:Date.now, type:Date })
  createdAt: Date;


  @Prop({required:true,minlength:2}) 
  userName: string; 

  @Prop()
  skils: string[];

  @Prop({required:true})
  phoneNum: number;
  
  
 
}


export const UserSchema = SchemaFactory.createForClass(User);