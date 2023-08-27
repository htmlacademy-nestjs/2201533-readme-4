import {registerAs} from "@nestjs/config";
import * as Joi from "joi";
import * as process from "process";
import {Logger} from "@nestjs/common";

export interface ApplicationsConfig {
  users: string;
  comments: string;
  likes: string;
  followers: string;
  posts: string;
  files: string;
}


export default registerAs('applications', (): ApplicationsConfig => {
  const config: ApplicationsConfig = {
    users : process.env.APP_USERS,
    comments: process.env.APP_COMMENTS,
    likes: process.env.APP_LIKES,
    followers: process.env.APP_FOLLOWERS,
    posts: process.env.APP_POSTS,
    files: process.env.APP_FILES,
  };

  const validationSchema = Joi.object<ApplicationsConfig>(
    Object.fromEntries(Object.keys(config).map((key) => [key, Joi.string().required()]))
  );

  Logger.log(validationSchema);

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Applications Config]: Environments validation failed. Please check .env file.
      Error message: Applications.${error.message}`,
    );
  }

  return config;
});
