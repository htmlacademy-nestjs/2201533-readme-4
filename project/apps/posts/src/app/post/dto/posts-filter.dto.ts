import {IsArray, IsEnum, IsMongoId, IsOptional} from 'class-validator';
import {Type} from '@project/shared/shared-types';
import {SortFieldsEnum} from '@project/shared/shared-types';
import {Transform} from 'class-transformer';
import {makeTagsArray} from '../helpers/post-query.helpers';

export class PostsFilterDto {
  @IsMongoId()
  @IsOptional()
  public userId: string;
  @IsOptional()
  @IsEnum(Type)
  public type: string;
  @IsOptional()
  @IsEnum(SortFieldsEnum)
  @Transform((params) => console.log(params))
  public sort: string;
  @IsOptional()
  @IsArray()
  @Transform((params) => makeTagsArray(params.value))
  public tags: string;
}
