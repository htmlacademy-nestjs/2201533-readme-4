import {Controller, UsePipes, ValidationPipe} from '@nestjs/common';
import {EmailSubscriberService} from './email-subscriber.service';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {MailService} from '../mail/mail.service';
import {EmailPostInterface} from '@project/shared/shared-types';
import {getSubscribeOption, RabbitRoutingKeys} from '@project/shared/modules-options';

@Controller('email-subscriber')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.AddSubscriber))
  @UsePipes(ValidationPipe)
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.SendNewsPost))
  public async sendNewsPost(rdo: EmailPostInterface) {
    console.log('send news post');
    const subscribers = await this.subscriberService.getSubscribers();
    await this.mailService.sendNewsPost(rdo, subscribers);
  }
}
