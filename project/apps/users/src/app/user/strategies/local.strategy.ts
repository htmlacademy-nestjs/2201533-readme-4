import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { UserType } from '@project/shared/shared-types';
import {UserService} from '../user.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<UserType> {
    return this.userService.verifyUser({email, password})
  }
}
