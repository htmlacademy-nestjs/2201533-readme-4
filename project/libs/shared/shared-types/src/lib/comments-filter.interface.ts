import {IsNumber, IsOptional, Max} from 'class-validator';
import {Transform} from 'class-transformer';
import {COMMENTS_RESPONSE_PAGE_LIMIT} from "@project/shared/shared-consts";


export class CommentsFilterInterface {
  @IsNumber()
  @Max(COMMENTS_RESPONSE_PAGE_LIMIT)
  @Transform((params) => parseInt(params.value, 10))
  public limit: number = COMMENTS_RESPONSE_PAGE_LIMIT;

  @IsNumber()
  @Transform((params) => parseInt(params.value, 10))
  public page = 1;
}
