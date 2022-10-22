import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Include, IncludeSchema, User, UserSchema } from '../schemas/user.model';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name:Include.name,schema:IncludeSchema}
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
