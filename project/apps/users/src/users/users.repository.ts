import {CRUDRepository} from '@project/util/util-types';
import {UserEntity} from './user.entity';
import {UserModel} from './schemas/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '@project/shared/shared-types';
import {Model} from 'mongoose';

export class UsersRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }
  create(item: UserEntity): Promise<User> {
    const user = new this.userModel(item);
    return user.save();
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  findById(id: string): Promise<User | null> {
    return Promise.resolve(undefined);
  }

  update(id: string, item: UserEntity): Promise<User> {
    return Promise.resolve(undefined);
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({email});
  }
}
