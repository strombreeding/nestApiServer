import { Error, Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Youth, YouthDocument, Include, IncludeDocument } from '../schemas/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const arr = [
    {
        name:"이진희",
        bornYear:1995,
        email:"speaker1403@gmail.com"
    },
    {
        name:"이태민",
        bornYear:1995,
        email:"philomon@naver.com"
    }
]


@Injectable()
export class UserService {
    constructor(
        @InjectModel(Youth.name) 
        private userModel: Model<YouthDocument>,
        @InjectModel(Include.name) 
        private includeModel:Model<IncludeDocument>
    ) {}
    async fakeDb (
        data:{
            name:string,
            bornYear:number,
            email:string
        })
        {
            await this.includeModel.create({
                ...data
            })
    }

    async getUser(): Promise<Youth[]> {
        try {
            const users:Youth[] = await this.userModel.find({});
            console.log(users)
            return users;
        } catch (err) {
            console.log('error...');
        }
    }
    async getOne(id:string):Promise<Youth>{
        const user = await this.userModel.findById({_id:id});
        console.log(user)
        return user
    }
    async createUser(data:CreateUserDto):Promise<Youth>{
        try{
            // const includeYouth = await this.includeModel.exists({name:data.userName})
            // if(!includeYouth){ // 요람에서 찾을때 name, bornYear 조건으로 찾아야함. 카카오 승인=생년월일
            //     throw new HttpException(
            //         {errorMsg:"요람에 없음, 관리자 승인 필요"},
            //         HttpStatus.NOT_FOUND
            //         )
            // }
            // console.log(data)
            const a = await this.userModel.create({
                ...data
            })
            a.save()
            return a
        }catch(err){
            return err
        }
    }
    async updateUser(id:string,data:UpdateUserDto):Promise<Youth>{
        try{
           await this.userModel.findByIdAndUpdate({_id:id},{
                $set:data
            })
            console.log(data)
            const user = this.getOne(id)
            return user
        }catch(err){
            return err
        }
    }
    async deleteUser(id:string):Promise<Youth>{
        try{
            const a = await this.getOne(id)
            await this.userModel.deleteOne({_id:id})
            console.log(id,a)
            return this.getOne(id)
        }catch(err){
            return err
        }
    }
}