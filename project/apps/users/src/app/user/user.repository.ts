import {CRUDRepository} from '@project/util/util-types';
import {UserEntity} from './user.entity';
import {UserModel} from '@project/models/mongo-schemas';
import {InjectModel} from '@nestjs/mongoose';
import {UserType} from '@project/shared/shared-types';
import {Model} from 'mongoose';
import {Logger} from '@nestjs/common';

export class UserRepository implements CRUDRepository<UserEntity, string, UserType> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }
  create(item: UserEntity): Promise<UserType> {
    const user = new this.userModel(item);
    return user.save();
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  findById(id: string): Promise<UserType | null> {
    return this.userModel.findById(id);
  }

  update(id: string, item: UserEntity): Promise<UserType> {
    return this.userModel.findByIdAndUpdate(id, item);
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({email});
  }


}
