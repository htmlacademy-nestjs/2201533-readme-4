import {Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileService} from './file.service';
import {FileInterceptor} from '@nestjs/platform-express';
import 'multer';
import {fillObject} from '@project/util/util-core';
import {UploadedFileRdo} from '@project/shared/shared-dto';
import {uploaderConfig} from '@project/config/config-uploader';
import {ConfigType} from '@nestjs/config';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('upload')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}

  path = (file: string) =>
    `http://${this.applicationConfig.host}:${this.applicationConfig.port}${this.applicationConfig.serveRoot}${file}`;

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
