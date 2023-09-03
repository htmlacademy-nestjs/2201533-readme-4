import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import {EmailSubscriberRepository} from './email-subscriber.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {EmailSubscriberModel, EmailSubscriberSchema} from './email-subscriber.model';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {MailModule} from '../mail/mail.module';
import {ConfigModule} from '@nestjs/config';
import {getRabbitMQOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    MailModule,
    ConfigModule,
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
