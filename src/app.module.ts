import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}