import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {ServeStaticModule} from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {FileModel, FileSchema} from './file.model';
import {FileRepository} from "./file.repository";

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('uploader.uploadDirectory');
        const serveRoot = configService.get<string>('uploader.serveRoot');
        return [{
          rootPath,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ])
  ],
  providers: [FileService, FileRepository],
  controllers: [FileController],
})
export class FileModule {}
