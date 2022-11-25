import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { TicketsModule } from './tickets/tickets.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
@Module({
  imports: [

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMConfig),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    CommentsModule,
    TicketsModule,
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}