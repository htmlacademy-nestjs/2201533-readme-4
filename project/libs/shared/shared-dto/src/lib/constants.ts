import {HttpStatus} from "@nestjs/common";
import {PostRdo} from "../index";

export const authHeader = (token: string) => ({
  headers: {
    'Authorization': token
  }
});

export const created = (entity: string) => ({
  status: HttpStatus.CREATED,
  description: `The new ${entity} has been successfully created.`
});

export const apiAuthHeader = {
  name: 'Authorization',
  description: 'Authorization JWT-token',
}

export const unauthorized = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Access token is wrong.',
}

export const apiRefreshHeader = {
  name: 'Authorization',
  description: 'Refresh JWT-token',
}

export const wrongRefresh = {
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
