import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface JwtUsersConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

export default registerAs('jwt', (): JwtUsersConfig => {
  const config: JwtUsersConfig = {
    accessTokenSecret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.JWT_EXPIRES_IN,
    refreshTokenSecret: process.env.JW_RT_SECRET,
    refreshTokenExpiresIn: process.env.JW_RT_EXPIRES_IN,
  };

  const validationSchema = Joi.object<JwtUsersConfig>({
    accessTokenSecret: Joi.string().required(),
    accessTokenExpiresIn: Joi.string().required(),
    refreshTokenSecret: Joi.string().required(),
    refreshTokenExpiresIn: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[JWT Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
