import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import {EmailSubscriberRepository} from './email-subscriber.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {EmailSubscriberModel, EmailSubscriberSchema} from './email-subscriber.model';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/util/util-core';
import {MailModule} from '../mail/mail.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
    ConfigModule,
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
