import { Error, Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Youth, YouthDocument, Include, IncludeDocument } from '../schemas/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Jwt, JwtDocument } from 'src/schemas/jwt.model';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        private readonly jwtService:JwtService,
        @InjectModel(Youth.name) 
        private userModel: Model<YouthDocument>,
        @InjectModel(Include.name) 
        private includeModel:Model<IncludeDocument>,
        @InjectModel(Jwt.name) 
        private jwtModel:Model<JwtDocument>,
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
            if(users[0]){
                const payload = {username:users[0].username,uniqueId:users[0]._id} ;
                const access_token = this.jwtService.sign(payload,{expiresIn:"10s"})
                const refresh_token = this.jwtService.sign(payload,{expiresIn:"30s"})
                console.log(refresh_token)
                const decode = this.jwtService.decode(access_token)
                console.log(JSON.parse(JSON.stringify(decode)))
                const id = await this.jwtModel.create({
                    username:payload.username,
                    refresh_token,
                    uniqueId:users[0]._id
                })
                console.log(id)
            }
            return users;
        } catch (err) {
            console.error(err);
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