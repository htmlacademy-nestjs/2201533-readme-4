import {Injectable} from '@nestjs/common';

@Injectable()
export class PostFilters {
  private userId: string;
  private type: string;
  private sort: string;
  private tags: string[];

  public setFilters() {}

  public getFilters() {}

}
