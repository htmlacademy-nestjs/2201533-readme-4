import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import {getMailerAsyncOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('mail'))
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
