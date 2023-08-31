import {FollowerEntity} from './follower-enttity';
import {Follower} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class FollowerRepository
{
  constructor(
    private readonly prisma: PrismaService
  ) {}
  public async create(item: FollowerEntity): Promise<Follower> {
    const rec = await this.prisma.followers.findFirst({
      where: {...item}
    });
    if (rec) {
      return rec;
    }
    return this.prisma.followers.create({
       data: {...item.toObject()}
    });
  }

  public async delete(item: FollowerEntity): Promise<void> {
    await this.prisma.followers.deleteMany({
      where: {...item}
    })
  }

  public async count(followed: string): Promise<number> {
    return this.prisma.followers.count({
      where: {followed}
    })
  }

}
