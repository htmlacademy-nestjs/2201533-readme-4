import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {ConfigType} from '@nestjs/config';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';
import {rabbitConfig} from '@project/config/config-modules';
import {RabbitRoutingKeys} from '@project/shared/modules-options';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.AddSubscriber].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.AddSubscriber].binding,
      { ...dto }
    );
  }
}
