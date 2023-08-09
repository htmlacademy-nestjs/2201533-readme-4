import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PostQueryPipe implements PipeTransform {
  transform(value: any, {metatype}: ArgumentMetadata) {
    return {
      where: {...value, metadata: metatype}
    };
  }
}
