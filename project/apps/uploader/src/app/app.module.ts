import { Module } from '@nestjs/common';

import { FileModule } from './file/file.module';
import {ConfigUploaderModule} from '@project/config/config-uploader';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseOptions} from "@project/util/util-core";


@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('application.db')
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
