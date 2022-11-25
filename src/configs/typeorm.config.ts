import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:process.env.DB_PW,
    database:"2eum-app",

    entities:[__dirname +"/../**/*.entity.{js,ts}"],
    synchronize:true
}