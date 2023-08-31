import {ApiProperty} from "@nestjs/swagger";

export class CreateSubscriberDto {
  @ApiProperty({
    description: '',
    example: '',
  })
  public id: string;
  @ApiProperty({
    description: '',
    example: '',
  })
  public email: string;
  @ApiProperty({
    description: '',
    example: '',
  })
  public name: string;
}
