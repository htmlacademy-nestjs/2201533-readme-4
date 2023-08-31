import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {uploaderConfig} from '@project/config/config-uploader';
import {ConfigType} from '@nestjs/config'
import {ensureDir} from 'fs-extra'
import { writeFile } from 'node:fs/promises';
import dayjs from 'dayjs';
import {extension} from 'mime-types';
import {FileRepository} from './file.repository';
import {FileEntity} from './file.entity';
import * as crypto from 'node:crypto';
import {EXTENSIONS} from '@project/shared/shared-consts';

type WritenFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository
  ) {}
  public async writeFile(file: Express.Multer.File): Promise<WritenFile> {
    const [ year, month , day] = dayjs().format('YYYY MM DD').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}/$${day}`;
    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;

    const uuid = crypto.randomUUID();
    const fileExtension = EXTENSIONS[file.buffer[0].toString(16)];
    const hashName = `${uuid}.${fileExtension}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writenFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writenFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writenFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
