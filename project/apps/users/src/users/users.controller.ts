import {Controller, Get, Post, Patch, Query, Req} from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Post('register')
  register(){
    return 'register user';
  }

  @Post('login')
  login(){
    return 'login user';
  }

  @Get(':id')
  getUser(@Req() request: Request, @Query('name') name?: string){
    console.log(name ? 'noname' : name);
    return {getUser: request.url};
  }

  @Patch()
  setPassword(){
    return 'set password';
  }
}
