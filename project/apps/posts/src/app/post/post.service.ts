import {Injectable} from '@nestjs/common';
import {PostRepository} from './post.repository';
import {TagRepository} from '../tag/tag.repoditory';
import {CreatePostDto} from './dto/create-post.dto';
import {Post, Type} from '@project/shared/shared-types';
import {PostEntity} from './post.entity';
import {UpdatePostDto} from './dto/update-post.dto';
import {ContentRepository} from '../content/content.repository';
import {ContentEntities} from '../content/content.entity';
import {PrismaService} from "../prisma/prisma.service";
import {PostsFilterDto} from "./dto/posts-filter.dto";

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
    private readonly contentRepository: ContentRepository,
    private readonly prisma: PrismaService
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post>{
    const tags = await this.tagRepository.findOrCreate(dto.tags);
    const type = dto.type;

    async function createPost(service: PostService) {
      return service.prisma.$transaction(async (tx: PrismaService) => {
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

  async getPost(id: number) {
    const post = await this.postRepository.findById(id);
    const content = await this.contentRepository.findById(post.contentId, post.type);
    return {...post, content: content};
  }

  async getPosts(filters: PostsFilterDto) {
    return this.postRepository.find(filters);
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

  async updatePost(id: number, dto: UpdatePostDto) {
    throw new Error('Not implemented…');
  }
}
