import {Injectable} from '@nestjs/common';
import {PostRepository} from './post.repository';
import {TagRepository} from '../tag/tag.repoditory';
import {CreatePostDto} from '@project/shared/shared-dto';
import {Post, SortFieldsEnum, Type} from '@project/shared/shared-types';
import {PostEntity} from './post.entity';
import {UpdatePostDto} from '@project/shared/shared-dto';
import {ContentRepository} from '../content/content.repository';
import {ContentEntities} from '../content/content.entity';
import {PrismaService} from '../prisma/prisma.service';
import {PostFilter, GetPostsFilter} from './helpers/posts-filter.interface';
import {now} from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
    private readonly contentRepository: ContentRepository,
    private readonly prisma: PrismaService
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post>{
    const type = dto.type;

    async function createPost(service: PostService) {
      return service.prisma.$transaction(async (tx: PrismaService) => {
        const tags = await service.tagRepository.findOrCreate(dto.tags);
        const contentEntity = ContentEntities[Type[type]](dto.content);
        const content = await service.contentRepository.create(contentEntity, type, tx);
        const postEntity = new PostEntity({
          ...dto,
          tags,
          contentId: content.id
        });
        const post = await service.postRepository.create(postEntity, tx);
        return {...post, content: content};
      })
    }

    return await createPost(this);

  }

  async updatePost(id: number, dto: UpdatePostDto) {
    async function updatePost(service: PostService) {
      return service.prisma.$transaction(async (tx: PrismaService) => {
        const tags = dto.tags ? await service.tagRepository.findOrCreate(dto.tags, tx) : [];
        if (tags.length) {
          await service.postRepository.disconnectTags(id, tx)
        }
        const content = dto.content ?
          await service.contentRepository.update(
            dto.contentId,
            ContentEntities[Type[dto.type]](dto.content),
            dto.type,
            tx
          ) :
          await service.contentRepository.findById(dto.contentId)
        const postEntity = new PostEntity({
          ...dto,
          tags,
        });
        if (tags.length) {
          postEntity.tags = tags;
        }
        const post = await service.postRepository.update(id, postEntity, tx);
        return {...post, content: content}
      })
    }

    return await updatePost(this);
  }

  async stickContent(post: Post) {
    const content = await this.contentRepository.findById(post.contentId, post.type);
    return {...post, content: content};
  }

  async getPost(id: number) {
    const post = await this.postRepository.findById(id);
    return this.stickContent(post);
  }

  async getPosts(filters: GetPostsFilter) {
    const posts = await this.postRepository.find(filters);
    const promises = posts.map((post) => this.stickContent(post));
    return await Promise.all(promises);
  }

  async findByTitle(title: string) {
    const posts = await this.postRepository.findByTitle(title);
    const promises = posts.map((post) => this.stickContent(post));
    return await Promise.all(promises);
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findById(id);
    const type = post.type;
    const contentId = post.contentId;
    async function deletePost(service: PostService){
      return service.prisma.$transaction(async () => {

        await service.contentRepository.delete(contentId, type);
        await service.postRepository.delete(id);
      })
    }
    await deletePost(this);
  }

  async changeCount(id: number,field: SortFieldsEnum, difference: number) {
    const post = await this.postRepository.changeCount(id, field, difference);
    const content = await this.contentRepository.findById(post.contentId, post.type);
    return {...post, content: content};
  }

  async checkUser(postId: number, userId: string): Promise<boolean> {
    const post = await this.postRepository.findById(postId);
    return post.userId === userId;
  }

  async getDrafts(userId: string): Promise<Post[]> {
    return this.postRepository.getDrafts(userId);
  }

  async setPublished(id: number, published: boolean): Promise<Post> {
    return this.postRepository.setPublished(id, published);
  }

  async getTape(follower: string, filters: PostFilter): Promise<Post[]> {
    return this.postRepository.getTape(follower, filters);
  }

  async repost(idUser: string, idPost: number) {
    const repost = await this.postRepository.findRepost(idUser, idPost);
    if (repost) {
      return this.stickContent(repost);
    }
    const original = await this.postRepository.findById(idPost);

    const post = await this.postRepository.create(new PostEntity({
      ...original,
      commentCount: 0,
      createDate: now(),
      isPublished: true,
      isRepost: true,
      likeCount: 0,
      originalId: idPost,
      pubDate: now(),
      userId: idUser
    }));
    return this.stickContent(post)
  }
}
