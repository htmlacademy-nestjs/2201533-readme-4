import {Inject, Injectable, Logger} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {rabbitConfig} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import {EmailPostRdo} from '../post/rdo/email-post.rdo';
import {RabbitRouting} from '@project/shared/shared-types';


@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPost(rdo: EmailPostRdo) {
    Logger.log('send mail');
    return this.rabbitClient.publish<EmailPostRdo>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewsPost,
      {...rdo}
    )
  }
}
