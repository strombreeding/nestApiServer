// /src/user/schema/user.schema.ts

import { Prop,  Schema,  SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

// MongoDB의 가장 작은 단위가 Document, 모듈에서 사용할 타입을 export 시켜줌
export type UserDocument = User & Document;

// 아래와 같이 timestamp 설정도 가능하다.
// createdAt과 updatedAt둘 중에 하나만 사용하고 싶다면 아래와 같이 작성도 가능하다.
@Schema()
export class User{

  @Prop({ default:Date.now, type:Date })
  createdAt: Date;


  @Prop({required:true,minlength:2}) // MongoDB에 들어갈 설정들을 적어준다.
  userName: string; // 필드 이름: 타입(타입스크립트 타입)

  @Prop()
  skils: string[];

  @Prop({required:true})
  phoneNum: number;
  
  
 
}
// export interface Aser extends mongoose.Document{
//   userName:string;
//   phoneNum: string;
//   skils: string[]
// }

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const UserSchema = SchemaFactory.createForClass(User);