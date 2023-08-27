import {ConfigService} from '@nestjs/config';

export function getHttpOptions(optionSpace: string) {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        timeout: configService.get<number>(`${optionSpace}.timeout`),
        maxRedirects: configService.get<number>(`${optionSpace}.maxRedirect`),
      }
    },
    inject: [ConfigService],
  }
}
