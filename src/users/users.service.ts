import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>
    ) {}

    async getUser(): Promise<User[]> {
        try {
            const users:User[] = await this.userModel.find({});
            console.log(users)
            return users;
        } catch (err) {
            console.log('error...');
        }
    }
    async getOne(id:string):Promise<User>{
        const user = await this.userModel.findById({_id:id});
        console.log(user)
        return user
    }
    async createUser(data:CreateUserDto):Promise<User>{
        console.log(data)
        const a = await this.userModel.create({
            ...data
        })
        a.save()
        return a
    }
    async updateUser(id:string,data:UpdateUserDto):Promise<User>{
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
    async deleteUser(id:string):Promise<User>{
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