import { Module } from '@nestjs/common';

import { FileModule } from './file/file.module';
import {ConfigUploaderModule} from '@project/config/config-modules';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('mongo')
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
