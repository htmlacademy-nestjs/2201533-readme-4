export const SALT_ROUNDS = 10;

export const UserExceptionMessage = {
  UserExists: 'User with this email-address already exists',
  UserNotFound: 'User not found',
  UserPasswordWrong: 'User login or password is wrong'
} as const;

export const MAX_SIZE_AVATAR = 500 * 1024;

export const userValidationMin = {
  name: 3,
  password: 6
}

export const userValidationMax = {
  name: 50,
  password: 12
}
