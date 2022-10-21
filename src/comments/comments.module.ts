import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schemas/comment.model';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: "user", schema: CommentSchema }])
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
