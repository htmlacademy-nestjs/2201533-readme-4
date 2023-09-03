import * as process from "process";
import {FIELD_SEPARATOR} from '../../../../config/config-modules/src/lib/config/constants';
import {camelCaseToEnvStyle} from '../../../../util/util-core/src/lib/helpers';
import {Logger} from "@nestjs/common";


export enum RabbitRoutingKeys {
  AddSubscriber = 'AddSubscriber',
  SendNewsPost = 'SendNewsPost',
  ChangeCommentsCount = 'ChangeCommentsCount',
  ChangeLikesCount = 'ChangeLikesCount',
  ChangePostsCount = 'ChangePostsCount',
  ChangeFollowersCount = 'ChangeFollowersCount',
  DeleteCommentsByPost = 'DeleteCommentsByPost',
  DeleteLikesByPost = 'DeleteLikesByPost'
}

const keys = ['routingKey', 'exchange', 'queue'];

export const getSubscribeOption = (key: RabbitRoutingKeys) => {
  const envName = camelCaseToEnvStyle(key, '');
  try {
    const options = Object.fromEntries(process.env[envName]
      .split(FIELD_SEPARATOR).map((item, index) => [keys[index], item]));
    Logger.log(`Environment: ${envName} has been read successfully`);
    console.log(options);
    return options;
  } catch (error){
    Logger.error(`
      Failed to read environment : "${envName}". Please check .env file.
      Some rabbit messages will not be delivered.
      Expected: "${envName}=rabbitRouting${FIELD_SEPARATOR}exchange${FIELD_SEPARATOR}queue"`)
  }
}
