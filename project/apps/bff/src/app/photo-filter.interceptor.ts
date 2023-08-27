import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable, tap} from "rxjs";
import {MAX_SIZE_PHOTO, signatures} from "@project/shared/shared-consts";
import {BigSizeFileException} from "@project/util/util-core";
import {FileWrongSystemException} from "@project/util/util-core";
import {FilesController} from "./files.controller";


@Injectable()
export class PhotoFilter implements NestInterceptor{
  constructor(
    private readonly fileController: FilesController
  ) {}
  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
      if (req.file.size > MAX_SIZE_PHOTO) {
        throw new BigSizeFileException(req.file, MAX_SIZE_PHOTO);
      }
      const efile = req.file as Express.Multer.File;
      const signature = Array.from(efile.buffer.subarray(0, 2), (byte) => byte.toString(16)).join(' ');
      if (!signatures.includes(signature)) {
        throw new FileWrongSystemException();
      }
      const image = await this.fileController.upload(req.file);
      const dto = JSON.parse(req.body.post);
      req.body = {...dto, content: {...dto.content, path: image.path, id: image.id}};
    }

    return next.handle()
    .pipe(
        map((data)=>{

          // console.log('post controller');
          if (req.headers['content-type'].startsWith('multipart/form-data')) {
            console.log(data);
          }
        })
      );
  }
}
