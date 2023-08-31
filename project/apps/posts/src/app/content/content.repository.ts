import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@project/util/util-types';
import {ContentEntity} from './content.entity';
import {ContentType} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ContentRepository implements CRUDRepository<ContentEntity, number, ContentType> {
  constructor(private readonly prisma: PrismaService) {
  }

  public async create(item: ContentEntity, type?: string, tx?: PrismaService){
    return tx[type].create({
      data: {...item.toObject()}
    });
  }

  public async delete(id: number, type?: string, tx?: PrismaService): Promise<void> {
    await tx[type].delete({
      where: {
        id
      }
    });
  }

  public async findById(id: number, type?: string): Promise<ContentType | null> {
    return await this.prisma[type].findFirstOrThrow({
      where: {id}
    });
  }

  update(id: number, item: ContentEntity, type?: string, tx?: PrismaService): Promise<ContentType> {
    const prisma = tx ? tx : this.prisma;
    return prisma[type].update(
      {
        where: {id},
        data: {...item.toUpdateEntity()}
      }
    )
  }

}
