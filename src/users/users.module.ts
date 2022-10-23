import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Include, IncludeSchema, Youth, YouthSchema } from '../schemas/user.model';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Youth.name, schema: YouthSchema },
      {name:Include.name,schema:IncludeSchema}
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
