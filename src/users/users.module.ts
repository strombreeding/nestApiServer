import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Jwt, JwtSchema } from 'src/schemas/jwt.model';
import { Include, IncludeSchema, Youth, YouthSchema } from '../schemas/user.model';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    JwtModule.register({
      secret:"zz",
    }),
    MongooseModule.forFeature([
      { name: Youth.name, schema: YouthSchema },
      {name:Jwt.name,schema:JwtSchema},
      {name:Include.name,schema:IncludeSchema}
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
