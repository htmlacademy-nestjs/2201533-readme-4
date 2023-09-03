import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/shared/modules-options';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
