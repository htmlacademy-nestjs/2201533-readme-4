import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface JWTConfig {
  accessTokenSecret: string;
}

export default registerAs('jwt', (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_SECRET,
  };

  const validationSchema = Joi.object<JWTConfig>({
    accessTokenSecret: Joi.string().required(),
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
