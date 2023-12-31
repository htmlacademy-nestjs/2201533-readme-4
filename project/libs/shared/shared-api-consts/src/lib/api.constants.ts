import {HttpStatus} from '@nestjs/common';
import {PostRdo} from '@project/shared/shared-dto';

export const created = (entity: string) => ({
  status: HttpStatus.CREATED,
  description: `The new ${entity} has been successfully created.`
});

export const unauthorized = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Access token is wrong.',
}

export const notAuthor = {
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden to change the publications of another users',
}

export const existsRepost = {
  status: HttpStatus.FORBIDDEN,
  description: 'You have already reposted this post',
}


export const wrongRefreshToken = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Refresh token is wrong.',
}

export const wrongLoginPass = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Password or Login is wrong.',
}

export const pubSuccessful = {
  type: PostRdo,
  status: HttpStatus.OK,
  description: 'Publications have been successfully received.'
}

