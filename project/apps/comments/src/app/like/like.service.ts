import { Injectable } from '@nestjs/common';
import {LikeRepository} from './like.repository';
import {LikeEntity} from './like.entity';
import {Like} from '@project/shared/shared-types';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository
  ) {}

  async create(item: Like): Promise<Like> {
    return this.likeRepository.create(new LikeEntity(item));
  }

  async delete(item: Like): Promise<void> {
    await this.likeRepository.delete(new LikeEntity(item));
  }

  async find(item: Like): Promise<Like | null> {
    return this.likeRepository.find(new LikeEntity(item));
  }

  async deleteByPost(idPost: number) {
    await this.likeRepository.deleteByPost(idPost);
  }
}
