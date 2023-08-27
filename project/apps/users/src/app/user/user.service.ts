import {ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {UserType} from '@project/shared/shared-types';
import {UserRepository} from './user.repository';
import {USER_EXISTS, USER_NOT_FOUND, USER_PASSWORD_WRONG} from '@project/shared/shared-consts';
import {UserEntity} from './user.entity';
import {LoginUserDto} from './dto/login-user.dto';
import {CreateUserDto} from '@project/shared/shared-dto';
import {JwtService} from '@nestjs/jwt';
import {RefreshTokenService} from "../refresh-token/refresh-token.service";
import {createJWTPayload, jwtUsersConfig} from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject (jwtUsersConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtUsersConfig>,
    private jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto): Promise<UserType> {
    const {email, name, password, avatarId} = dto;

    const user = {
      email, name, avatarId,
      password: '',
    };
    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)
    return this.userRepository.create(userEntity);
  }

  public async setPassword(id: string, pass: string): Promise<UserType> {
    const userEntity = await new UserEntity({password: pass})
      .setPassword(pass)
    return this.userRepository.update( id, userEntity)
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existedUser = await this.userRepository.findByEmail(email);

    if (!existedUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existedUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  public async createUserToken(user: UserType) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}

