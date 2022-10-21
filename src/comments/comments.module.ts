import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment.model';
import { UserSchema } from 'src/schemas/user.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
    ])
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
