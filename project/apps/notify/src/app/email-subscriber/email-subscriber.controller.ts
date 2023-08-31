import {Controller, Logger, UsePipes, ValidationPipe} from '@nestjs/common';
import {EmailSubscriberService} from './email-subscriber.service';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';
import {RabbitRouting} from '@project/shared/shared-types';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {MailService} from '../mail/mail.service';
import {EmailPostInterface} from "@project/shared/shared-types";

@Controller('email-subscriber')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify',
  })
  @UsePipes(ValidationPipe)
  public async create(subscriber: CreateSubscriberDto) {
    Logger.log('Create subscriber');
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify.post',
    routingKey: RabbitRouting.SendNewsPost,
    queue: 'readme.notify.post',
  })
  public async sendNewsPost(rdo: EmailPostInterface) {
    Logger.log('Send news "new post"');
    const subscribers = await this.subscriberService.getSubscribers();
    Logger.log(subscribers);
    await this.mailService.sendNewsPost(rdo, subscribers);
  }

}
