import {IsArray, IsEnum, IsMongoId, IsNumber, IsOptional} from 'class-validator';
import {DEFAULT_SORT, Type} from '@project/shared/shared-types';
import {SortFieldsEnum} from '@project/shared/shared-types';
import {Transform} from 'class-transformer';
import {makeTagsArray} from './post-query.helpers';
import {POSTS_RESPONSE_LIMIT} from "@project/shared/shared-consts";

export class PostFilter {
  @IsOptional()
  @IsEnum(SortFieldsEnum)
  public sort: string = DEFAULT_SORT;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public limit: number = POSTS_RESPONSE_LIMIT;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public page = 1;
}

export class GetPostsFilter extends PostFilter {
  @IsMongoId()
  @IsOptional()
  public userId: string;

  @IsOptional()
  @IsEnum(Type)
  public type: string;

  @IsOptional()
  @IsArray()
  @Transform((params) => makeTagsArray(params.value))
  public tags: string;

}
