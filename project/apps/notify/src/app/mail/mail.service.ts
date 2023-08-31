import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {EmailPostInterface, Subscriber} from '@project/shared/shared-types';
import {EmailSubjects} from '@project/shared/shared-consts';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EmailSubjects.EMAIL_ADD_SUBSCRIBER,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNewsPost(rdo: EmailPostInterface, subscribers: Subscriber[]) {
    function getMailOptions(subscriber: Subscriber) {
      return {
        to: subscriber.email,
        subject: EmailSubjects.EMAIL_NEW_POST,
        template: './new-post',
        context: {
          user: `${subscriber.name}`,
          date: `${rdo.createDate}`,
          author: `${rdo.userName}`,
          type: `${rdo.type}`,
        }
      };
    }

    await Promise.all(subscribers.map((subscriber) =>
      this.mailerService.sendMail(getMailOptions(subscriber))
    ))
  }
}
