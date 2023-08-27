import {UserType} from '@project/shared/shared-types'
import {SALT_ROUNDS} from '@project/shared/shared-consts';
import {compare, genSalt, hash} from 'bcrypt';
export class UserEntity implements UserType {
  public id: string;
  public avatarId: string;
  public email: string;
  public name: string;
  public password: string;

  constructor(user: UserType) {
    this.fillEntity(user);
  }

  public fillEntity(user: UserType) {
    this.id = user.id;
    this.avatarId = user.avatarId;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatarId: this.avatarId,
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
