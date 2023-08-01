import {Controller, Get, Post, Patch, Query, Req, Body} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {fillObject} from '@project/util/util-core';
import {UserRdo} from './rdo/user.rdo';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto){
    return fillObject(UserRdo, await this.userService.register(createUserDto));
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto){
    const verifiedUser = await this.userService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  public async getUser(@Req() request: Request, @Query('name') name?: string){
    console.log(name ? 'noname' : name);
    return {getUser: request.url};
  }

  @Patch()
  public async setPassword(){
    return 'set password';
  }
}
