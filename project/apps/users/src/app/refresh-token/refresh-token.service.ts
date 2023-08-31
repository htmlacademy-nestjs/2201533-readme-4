import {Inject, Injectable} from '@nestjs/common';
import {RefreshTokenRepository} from './refresh-token.repository';
import {jwtUsersConfig, parseTime} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {RefreshTokenPayload} from '@project/shared/shared-types';
import {RefreshTokenEntity} from './refresh-token.entity';
import dayjs from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject (jwtUsersConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtUsersConfig>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.id,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();
    return this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
