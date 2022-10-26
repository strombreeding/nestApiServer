import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Youth, YouthDocument } from "src/schemas/user.model";
@Injectable() // 인젝터블 데코레이터는 어디서든 사용할 수 있게 하기위해서.. export 같은거같음.
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(
        @InjectModel(Youth.name) 
        private userService:Model<YouthDocument>
        ){
        super({
        secretOrKey: "at-secret",
            jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    
    async validate(payload:{username?:string,uniqueId:string}) {
        const {uniqueId} = payload;
        console.log(payload)
        const user:Youth = await this.userService.findById(uniqueId)
        if(!user){
            console.log("zz안됌")
            throw new UnauthorizedException()
        }

        return user
    }

}

