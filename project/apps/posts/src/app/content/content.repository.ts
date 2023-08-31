import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@project/util/util-types';
import {ContentEntity} from './content.entity';
import {ContentType} from '@project/shared/shared-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ContentRepository implements CRUDRepository<ContentEntity, number, ContentType> {
  constructor(private readonly prisma: PrismaService) {
  }

  public async create(item: ContentEntity, type?: string, transaction?: PrismaService){
    return transaction[type].create({
      data: {...item.toObject()}
    });
  }

  public async delete(id: number, type?: string, transaction?: PrismaService): Promise<void> {
    await transaction[type].delete({
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

  update(id: number, item: ContentEntity, type?: string, transaction?: PrismaService): Promise<ContentType> {
    return transaction[type].update(
      {
        where: {id},
        data: {...item.toUpdateEntity()}
      }
    )
  }

}
