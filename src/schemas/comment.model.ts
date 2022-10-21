import { Prop,  Schema,  SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document,Types,Schema as MongooseSchema, ObjectId } from 'mongoose';
import { User } from './user.model';

export type CommentDocument = Comment & Document;



@Schema()
export class Comment{
  
  @Prop({required:true,minlength:2}) 
  text: string; 
  
  @Prop()
  likes:number;
  
  // @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}])
  // comments: string[];
  
//   @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Post"}])
//   include:string
  @Prop( {type:mongoose.Schema.Types.ObjectId, ref:"User"})
  owner: User;

  @Prop({ default:Date.now })
  createdAt:Date;
}


export const CommentSchema = SchemaFactory.createForClass(Comment);