export const SALT_ROUNDS = 10;

export const UserExceptionMessages = {
  USER_EXISTS: 'User with this email-address already exists',
  USER_NOT_FOUND: 'User not found',
  USER_PASSWORD_WRONG: 'User login or password is wrong'
} as const;

export const MAX_SIZE_AVATAR = 500 * 1024;

export enum userMin {
  name = 3,
  password = 6
}

export enum userMax {
  name = 50,
  password = 12
}
