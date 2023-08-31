import {BadRequestException} from '@nestjs/common';
import 'multer';
export class BigSizeFileException extends BadRequestException {
  constructor(file: Express.Multer.File, max: number) {
    super(`File: "${file.originalname}" has a size of ${file.size} bytes, the file size cannot exceed ${max} bytes`);
  }
}
