import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Jwt, JwtSchema } from 'src/schemas/jwt.model';
import { Include, IncludeSchema, Youth, YouthSchema } from '../schemas/user.model';
import { AtStrategy } from './at.strategy';
import { RtStrategy } from './rt.strategy';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy:'jwt'}),
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
  providers: [UserService,AtStrategy,RtStrategy],
  exports:[AtStrategy,PassportModule,RtStrategy]
})
export class UsersModule {}
