import { Injectable } from '@nestjs/common';
import {Comment, CommentsFilterInterface} from '@project/shared/shared-types'
import {CommentRepository} from './comment.repository';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(entity: Comment): Promise<Comment> {
    const commentEntity = new CommentEntity(entity);
    return this.commentRepository.create(commentEntity);
  }

  async findById(id: number): Promise<Comment> {
    return this.commentRepository.findById(id);
  }

  async getAuthor(id: number): Promise<string> {
    return (await this.findById(id)).authorId;
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async getComments(idPost: number, filters: CommentsFilterInterface) {
    return this.commentRepository.find(idPost, filters);
  }

  async deleteByPost(idPost: number) {
    await this.commentRepository.deleteByPost(idPost);
  }

  async checkComment(id: number): Promise<boolean> {
    const comment = await this.commentRepository.findById(id);
    return comment !== null;
  }
}
