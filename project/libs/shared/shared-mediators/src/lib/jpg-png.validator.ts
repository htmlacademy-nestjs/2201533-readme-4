import {FileValidator, Injectable} from "@nestjs/common";
import 'multer'
import {signatures} from "@project/shared/shared-consts";
import {IFile} from "@nestjs/common/pipes/file/interfaces";

@Injectable()
export class JpgPngValidator extends FileValidator {
  buildErrorMessage(file: any): string {
    return 'File you have is not a jpeg or png';
  }

  isValid(file: Express.Multer.File | IFile): boolean | Promise<boolean> {
    const efile = file as Express.Multer.File
    const signature = Array.from(efile.buffer.subarray(0, 2), (byte) => byte.toString(16)).join(' ')
    return signatures.includes(signature);
  }

}
