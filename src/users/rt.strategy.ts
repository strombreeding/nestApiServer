import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Youth, YouthDocument } from "src/schemas/user.model";
@Injectable() // 인젝터블 데코레이터는 어디서든 사용할 수 있게 하기위해서.. export 같은거같음.
export class RtStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(
        @InjectModel(Youth.name) 
        private userService:Model<YouthDocument>
        ){
        super({
        secretOrKey: "rt-secret",
            jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
            // passReqToCallback:true
        })
    }
    
    async validate(payload:{username?:string,uniqueId:string}) {
        const {uniqueId} = payload;
        const user:Youth = await this.userService.findById(uniqueId)
        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }

}

