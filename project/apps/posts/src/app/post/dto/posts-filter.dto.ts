import {IsArray, IsEnum, IsMongoId} from 'class-validator';
import {Type} from '@project/shared/shared-types';
import {SortFieldsEnum} from '@project/shared/shared-types';
import {Transform} from 'class-transformer';

export class PostsFilterDto {
  @IsMongoId()
  public userId?: string;
  @IsEnum(Type)
  type?: string;
  @IsEnum(SortFieldsEnum)
  sort?: string;
  @IsArray()
  @Transform((value) => value)
  tags?: string;
}
