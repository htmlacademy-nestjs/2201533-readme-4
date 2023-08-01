import {User} from '@project/shared/shared-types'
import {SALT_ROUNDS} from './user,constants';
import {compare, genSalt, hash} from 'bcrypt';
export class UserEntity implements User {
  public id: string;
  public avatarPath: string;
  public email: string;
  public name: string;
  public password: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public fillEntity(blogUser: User) {
    this.id = blogUser.id;
    this.avatarPath = blogUser.avatarPath;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.password = blogUser.password;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatarPath: this.avatarPath,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
