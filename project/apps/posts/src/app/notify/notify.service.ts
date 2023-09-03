import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {ConfigType} from '@nestjs/config';
import {EmailPostRdo} from '../post/rdo/email-post.rdo';
import {RabbitRoutingKeys} from '@project/shared/modules-options';
import {rabbitConfig} from '@project/config/config-modules';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPost(rdo: EmailPostRdo) {
    return this.rabbitClient.publish<EmailPostRdo>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.SendNewsPost].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.SendNewsPost].binding,
      {...rdo}
    )
  }
}
