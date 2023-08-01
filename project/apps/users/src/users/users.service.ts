import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {ConfigService} from '@nestjs/config';
import {UsersRepository} from './users.repository';
import {User} from '@project/shared/shared-types';
import {UserEntity} from './user.entity';
import {USER_EXISTS, USER_NOT_FOUND, USER_PASSWORD_WRONG} from './user,constants';
import {LoginUserDto} from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  public async register(dto:CreateUserDto): Promise<User> {
    const {email, name, password, avatarPath} = dto;

    const user = {
      email, name, avatarPath,
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

}
