import {Expose} from "class-transformer";

export class EmailPostRdo {
  @Expose()
  public userName: string;

  @Expose()
  public type: string;

  @Expose()
  public createDate: string;
}
