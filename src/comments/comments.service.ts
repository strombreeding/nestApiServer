import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from 'src/schemas/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    // constructor(
    //     @InjectModel("comment") 
    //     private commentModel: Model<CommentDocument>
    // ) {}

    // async getcomment(): Promise<Comment[]> {
    //     try {
    //         const comments:Comment[] = await this.commentModel.find({});
    //         return comments;
    //     } catch (err) {
    //         console.log('error...');
    //     }
    // }
    // async getOne(id:string):Promise<Comment>{
    //     const comment = await this.commentModel.findById({_id:id});
    //     return comment
    // }
    // async createcomment(data:CreateCommentDto):Promise<Comment>{
    //     console.log(data)
    //     const a = await this.commentModel.create({
    //         ...data
    //     })
    //     a.save()
    //     return a
    // }
    // async updatecomment(id:string,data:UpdateCommentDto):Promise<Comment>{
    //     try{
    //        await this.commentModel.findByIdAndUpdate({_id:id},{
    //             $set:data
    //         })
    //         console.log(data)
    //         const comment = this.getOne(id)
    //         return comment
    //     }catch(err){
    //         return err
    //     }
    // }
    // async deletecomment(id:string):Promise<Comment>{
    //     try{
    //         const a = await this.getOne(id)
    //         await this.commentModel.deleteOne({_id:id})
    //         console.log(id,a)
    //         return this.getOne(id)
    //     }catch(err){
    //         return err
    //     }
    // }
}
