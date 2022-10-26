import { Error, Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Youth, YouthDocument, Include, IncludeDocument } from '../schemas/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Jwt, JwtDocument } from 'src/schemas/jwt.model';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy} from "passport-jwt"
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy){
//     constructor(
//         private userModel:Model<YouthDocument>
//     ){
//         super({
//             secretOrKey:`zz`,
//             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
//         })
//     }
//     async validate(payload){
//         const {username} = payload;
//         const user:Youth = await this.userModel.findOne({username})
//         if(!user){
//             throw new UnauthorizedException();
//         }
//         console.log(user)
//         return user
//     }
// }

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
    async fakeCreate(data:CreateUserDto) {
        console.log("들어오긴함")
        const createUser = await this.userModel.create({
            ...data
        })
        console.log("유저생성")
        // 아래 코드는 jwt 토큰생성 예제임
        // 로그인을 했다고 가정,
    }
    async getFakeUser(data:{username:string}):Promise<{ access_token: string; refresh_token: string; msg: string; }>{
        const newUser = await this.userModel.findOne({username:data.username})
        console.log("이게안되는거지?")
        if(newUser){
            const payload = {username:newUser.username,uniqueId:newUser._id} ;
            const [at,rt] = await Promise.all([
                this.jwtService.sign(
                        payload,
                        {
                            secret: 'at-secret',
                            expiresIn:60
                        }),
                this.jwtService.sign(
                    payload,
                    {
                        secret: 'rt-secret',
                        expiresIn:60*15
                    })
            ])
            const access_token = this.jwtService.sign(payload,{expiresIn:"30s"}) 
            const refresh_token = this.jwtService.sign(payload,{expiresIn:"3600s"})
            // const decode = this.jwtService.decode(access_token)
            // const verify_accessToken = await this.jwtService.verify(refresh_token)   
            // console.log(verify_accessToken)
            
            // 아래 로직은 refresh_token 을 DB에 저장하여 로그아웃, 강제종료 등에 쓰일것이다.
            const id = await this.jwtModel.create({
                username:payload.username,
                refresh_token:rt,
                uniqueId:newUser._id
            })
            return {"msg":"회원가입 성공과 로그인 완료",access_token:at,refresh_token:rt}
        }
        else{
            throw new HttpException("회원정보가 없어요",HttpStatus.NOT_FOUND)
        }
    }
    async validate( token:{access_token:string,refresh_token:string}){
        try{
            const verify_access_token = await this.jwtService.verify(token.access_token)
            // const verify_refresh_token = await this.jwtService.verify(token.refresh_token)
            return {msg : "넌 지나갈 수 있다!",verify_access_token}
        }
        catch(err){
            console.log(err)
            console.log("리프레쉬 찾자")
            const verify_refresh_token = await this.jwtModel.findOne({refresh_token:token.refresh_token})
            console.log("zz")
            if(!verify_refresh_token){
                HttpStatus.NOT_FOUND
                throw new HttpException("토큰만료",HttpStatus.NOT_FOUND)
            }
            console.log("유저찾기",verify_refresh_token)
            const user = await this.userModel.findById(verify_refresh_token.uniqueId)
            console.log("유저찾음!",user)
            const new_access_token =  this.jwtService.sign({username:user.username,uniqueId:user._id},{expiresIn:"30s"})
            console.log("뉴토큰!")
            return {msg:`너의 새 토큰이다! ${new_access_token}`}
        }
    }



    async getUser(): Promise<Youth[]> {
        try {
            const users:Youth[] = await this.userModel.find({});
            
            return users;
        } catch (err) {
            console.error(err);
            return err
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
            //             {errorMsg:"요람에 없음, 관리자 승인 필요"},
            //             HttpStatus.NOT_FOUND
            //             )
            //     }
            //     console.log(data)
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