import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoURI } from '../../../../util/util-core/src/lib/helpers';

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    imports: [],
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoURI(
          config.get<string>(`${optionSpace}.user`),
          config.get<string>(`${optionSpace}.password`),
          config.get<string>(`${optionSpace}.host`),
          config.get<string>(`${optionSpace}.port`),
          config.get<string>(`${optionSpace}.name`),
          config.get<string>(`${optionSpace}.authBase`)
        )
      }
    },
    inject: [ConfigService]
  }
}
