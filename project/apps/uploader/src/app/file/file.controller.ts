import {Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileService} from './file.service';
import {FileInterceptor} from '@nestjs/platform-express';
import 'multer';
import {fillObject} from '@project/util/util-core';
import {UploadedFileRdo} from '@project/shared/shared-dto';
import {ConfigType} from '@nestjs/config';
import {ApiTags} from "@nestjs/swagger";
import {appConfig, uploadConfig} from '@project/config/config-modules';

@ApiTags('upload')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploadConfig.KEY)
    private readonly uploaderConfig: ConfigType<typeof uploadConfig>,
    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
  ) {}

  path = (file: string) =>
    `http://${this.uploaderConfig.host}:${this.applicationConfig.port}${this.uploaderConfig.serveRoot}${file}`;

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.path(newFile.path)}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(':fileId')
  public async show(@Param('fileId') fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.path(existFile.path)}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }

}
