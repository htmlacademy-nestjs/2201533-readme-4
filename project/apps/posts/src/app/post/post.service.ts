import {Injectable} from '@nestjs/common';
import {PostRepository} from './post.repository';
import {TagRepository} from '../tag/tag.repository';
import {CreatePostDto, UpdatePostDto} from '@project/shared/shared-dto';
import {Counters, Post, Type} from '@project/shared/shared-types';
import {PostEntity} from './post.entity';
import {ContentRepository} from '../content/content.repository';
import {mapPostTypeToCreator} from '../content/content.entity';
import {PrismaService} from '../prisma/prisma.service';
import {GetPostsFilter, PostFilter} from './helpers/posts-filter.interface';

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
        const contentEntity = mapPostTypeToCreator[Type[type]](dto.content);
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
            mapPostTypeToCreator[Type[dto.type]](dto.content),
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
      return service.prisma.$transaction(async (tx: PrismaService) => {

        await service.contentRepository.delete(contentId, type, tx);
        return service.postRepository.delete(id, tx);
      })
    }
    return await deletePost(this);
  }

  async changeCount(id: number, field: Counters, difference: number) {
    return this.postRepository.changeCount(id, field, difference);
  }

  async checkUser(postId: number, userId: string): Promise<boolean> {
    const post = await this.postRepository.findById(postId);
    return post.userId === userId;
  }

  async getDrafts(userId: string): Promise<Post[]> {
    const posts =  await this.postRepository.getDrafts(userId);
    const promises = posts.map((post) => this.stickContent(post));
    return await Promise.all(promises);

  }

  async setPublished(id: number, published: boolean): Promise<Post> {
    const post = await this.postRepository.setPublished(id, published);
    return this.stickContent(post);
  }

  async getTape(follower: string, filters: PostFilter): Promise<Post[]> {
    const posts = await this.postRepository.getTape(follower, filters);
    const promises = posts.map((post) => this.stickContent(post));
    return await Promise.all(promises);
  }

  async existsRepost(idUser: string, idPost: number): Promise<boolean> {
    const repost = await this.postRepository.findRepost(idUser, idPost);
    return repost !== null;
  }

  async checkPost(id: number): Promise<boolean> {
    const post = await this.postRepository.findOrNull(id);
    return post !== null;
  }
}
