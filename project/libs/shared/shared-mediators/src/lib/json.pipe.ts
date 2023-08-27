import {ArgumentMetadata, Injectable, Logger, PipeTransform} from '@nestjs/common';

@Injectable()
export class JsonPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(value);
    return JSON.parse(value);
  }
}
