import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { TicketsModule } from './tickets/tickets.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    // PassportModule.register({defaultStrategy:"jwt"}),
    // JwtModule.register({
    //   secret:"zzz",
    //   signOptions:{
    //     expiresIn:60,
    //   }
    // }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    CommentsModule,
    TicketsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}