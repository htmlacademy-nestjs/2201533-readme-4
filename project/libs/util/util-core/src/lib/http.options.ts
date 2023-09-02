import {ConfigService} from '@nestjs/config';

export function getHttpOptions(optionSpace: string) {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        timeout: configService.get<number>(`${optionSpace}.timeout`),
        maxRedirectsCount: configService.get<number>(`${optionSpace}.maxRedirectCount`),
      }
    },
    inject: [ConfigService],
  }
}
