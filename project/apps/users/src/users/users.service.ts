import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {Model} from 'mongoose';
import {CreateUserDto} from "./dto/create-user.dto";
import {ConfigService} from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService
  ) {}

  public async create(dto:CreateUserDto, salt:string): Promise<User> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);
    const result = this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto): Promise<User> {
    const existedUser = await this.findByEmail(dto.email);
    if (existedUser) {
      return existedUser;
    }
    const salt = this.configService.get('SALT');

    return this.create(dto, salt);
  }

}
