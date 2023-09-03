import { Module } from '@nestjs/common';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import {ConfigNotifyModule} from "@project/config/config-modules";
import {getMongooseOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
    EmailSubscriberModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
