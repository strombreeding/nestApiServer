import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"wlsgml1403",
    database:"2eum-app",

    entities:[__dirname +"/../**/*.entity.{js,ts}"],
    synchronize:true
}